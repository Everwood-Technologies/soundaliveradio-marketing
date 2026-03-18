"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { WalletConnectorElement, XRPLAccount, XRPLNetwork } from "xrpl-connect";
import {
  disconnectWallet,
  getConnectedWalletAccount,
  getWalletConfigError,
  getWalletManager,
  hasWalletConfig,
} from "@/lib/wallet/walletManager";

export type WalletStatus = "idle" | "connecting" | "connected" | "error";

interface WalletState {
  status: WalletStatus;
  account: XRPLAccount | null;
  error: string | null;
}

interface WalletActions {
  connect: () => Promise<boolean>;
  disconnect: () => Promise<void>;
  ensureConnected: () => Promise<boolean>;
  openConnector: () => Promise<boolean>;
  clearError: () => void;
  registerConnectorElement: (element: WalletConnectorElement | null) => void;
}

type WalletContextValue = WalletState & WalletActions;

const WalletStateContext = createContext<WalletState | null>(null);
const WalletActionsContext = createContext<WalletActions | null>(null);

function toErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const initialAccount = getConnectedWalletAccount();
  const [state, setState] = useState<WalletState>({
    status: initialAccount ? "connected" : "idle",
    account: initialAccount,
    error: null,
  });

  const managerRef = useRef<import("xrpl-connect").WalletManager | null>(null);
  const connectorRef = useRef<WalletConnectorElement | null>(null);
  const pendingEnsurePromiseRef = useRef<Promise<boolean> | null>(null);
  const pendingEnsureResolveRef = useRef<((value: boolean) => void) | null>(null);

  const resolvePendingEnsure = useCallback((value: boolean) => {
    if (!pendingEnsureResolveRef.current) return;
    pendingEnsureResolveRef.current(value);
    pendingEnsureResolveRef.current = null;
    pendingEnsurePromiseRef.current = null;
  }, []);

  const createPendingEnsurePromise = useCallback(() => {
    if (!pendingEnsurePromiseRef.current) {
      pendingEnsurePromiseRef.current = new Promise<boolean>((resolve) => {
        pendingEnsureResolveRef.current = resolve;
      });
    }
    return pendingEnsurePromiseRef.current;
  }, []);

  const ensureManager = useCallback(async () => {
    if (managerRef.current) return managerRef.current;
    const manager = await getWalletManager();
    managerRef.current = manager;
    return manager;
  }, []);

  const handleConnectorClose = useCallback(() => {
    if (!managerRef.current?.connected) {
      setState((prev) => ({
        ...prev,
        status: prev.status === "connecting" ? "idle" : prev.status,
      }));
      resolvePendingEnsure(false);
    }
  }, [resolvePendingEnsure]);

  const registerConnectorElement = useCallback(
    (element: WalletConnectorElement | null) => {
      if (connectorRef.current) {
        connectorRef.current.removeEventListener("close", handleConnectorClose as EventListener);
      }

      connectorRef.current = element;
      if (!element) return;

      element.addEventListener("close", handleConnectorClose as EventListener);

      const currentElement = element;
      void ensureManager()
        .then((manager) => {
          if (connectorRef.current !== currentElement) return;
          currentElement.setWalletManager(manager);
        })
        .catch((error) => {
          setState((prev) => ({
            ...prev,
            status: "error",
            error: toErrorMessage(error, "Failed to initialize wallet connector."),
          }));
        });
    },
    [ensureManager, handleConnectorClose]
  );

  const openConnector = useCallback(async () => {
    if (!hasWalletConfig()) {
      const configError =
        getWalletConfigError() ?? "Wallet integration is not configured for this environment.";
      setState((prev) => ({
        ...prev,
        status: "error",
        error: configError,
      }));
      resolvePendingEnsure(false);
      return false;
    }

    const manager = await ensureManager();
    if (manager.connected && manager.account) {
      setState({
        status: "connected",
        account: manager.account,
        error: null,
      });
      return true;
    }

    setState((prev) => ({ ...prev, status: "connecting", error: null }));

    const connector = connectorRef.current;
    if (!connector) {
      try {
        await manager.connect("xaman");
        return true;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: toErrorMessage(error, "Failed to connect wallet."),
        }));
        resolvePendingEnsure(false);
        return false;
      }
    }

    try {
      connector.setWalletManager(manager);
      await connector.open();
      return true;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: toErrorMessage(error, "Failed to open wallet connector."),
      }));
      resolvePendingEnsure(false);
      return false;
    }
  }, [ensureManager, resolvePendingEnsure]);

  const connect = useCallback(async () => {
    const manager = await ensureManager();
    if (manager.connected && manager.account) return true;

    const opened = await openConnector();
    if (!opened) return false;

    if (manager.connected && manager.account) return true;
    return createPendingEnsurePromise();
  }, [createPendingEnsurePromise, ensureManager, openConnector]);

  const ensureConnected = useCallback(async () => {
    const manager = await ensureManager();
    if (manager.connected && manager.account) return true;
    return connect();
  }, [connect, ensureManager]);

  const disconnect = useCallback(async () => {
    resolvePendingEnsure(false);
    try {
      await disconnectWallet();
      setState({
        status: "idle",
        account: null,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: toErrorMessage(error, "Failed to disconnect wallet."),
      }));
    }
  }, [resolvePendingEnsure]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null, status: prev.account ? "connected" : "idle" }));
  }, []);

  useEffect(() => {
    let disposed = false;
    let manager: import("xrpl-connect").WalletManager | null = null;

    const setup = async () => {
      try {
        manager = await ensureManager();
        if (disposed) return;

        const handleConnect = (account: XRPLAccount) => {
          setState({
            status: "connected",
            account,
            error: null,
          });
          resolvePendingEnsure(true);
        };

        const handleDisconnect = () => {
          setState({
            status: "idle",
            account: null,
            error: null,
          });
        };

        const handleAccountChanged = (account: XRPLAccount) => {
          setState((prev) => ({
            ...prev,
            status: "connected",
            account,
            error: null,
          }));
          resolvePendingEnsure(true);
        };

        const handleNetworkChanged = (network: XRPLNetwork) => {
          setState((prev) => {
            if (!prev.account) return prev;
            return {
              ...prev,
              status: "connected",
              account: {
                ...prev.account,
                network,
              },
            };
          });
        };

        manager.on("connect", handleConnect);
        manager.on("disconnect", handleDisconnect);
        manager.on("accountChanged", handleAccountChanged);
        manager.on("networkChanged", handleNetworkChanged);

        if (manager.connected && manager.account) {
          setState({
            status: "connected",
            account: manager.account,
            error: null,
          });
        }

        if (connectorRef.current) {
          connectorRef.current.setWalletManager(manager);
        }

        return () => {
          manager?.off("connect", handleConnect);
          manager?.off("disconnect", handleDisconnect);
          manager?.off("accountChanged", handleAccountChanged);
          manager?.off("networkChanged", handleNetworkChanged);
        };
      } catch (error) {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: toErrorMessage(error, "Failed to initialize wallet manager."),
        }));
        return undefined;
      }
    };

    let cleanupHandlers: (() => void) | undefined;
    void setup().then((cleanup) => {
      cleanupHandlers = cleanup;
    });

    return () => {
      disposed = true;
      cleanupHandlers?.();
      resolvePendingEnsure(false);

      if (connectorRef.current) {
        connectorRef.current.removeEventListener("close", handleConnectorClose as EventListener);
      }
    };
  }, [ensureManager, handleConnectorClose, resolvePendingEnsure]);

  const actions = useMemo<WalletActions>(
    () => ({
      connect,
      disconnect,
      ensureConnected,
      openConnector,
      clearError,
      registerConnectorElement,
    }),
    [clearError, connect, disconnect, ensureConnected, openConnector, registerConnectorElement]
  );

  return (
    <WalletActionsContext.Provider value={actions}>
      <WalletStateContext.Provider value={state}>{children}</WalletStateContext.Provider>
    </WalletActionsContext.Provider>
  );
}

export function useWalletState(): WalletState {
  const state = useContext(WalletStateContext);
  if (!state) {
    throw new Error("useWalletState must be used within a WalletProvider");
  }
  return state;
}

export function useWalletActions(): WalletActions {
  const actions = useContext(WalletActionsContext);
  if (!actions) {
    throw new Error("useWalletActions must be used within a WalletProvider");
  }
  return actions;
}

export function useWallet(): WalletContextValue {
  const walletState = useWalletState();
  const walletActions = useWalletActions();
  return useMemo(() => ({ ...walletState, ...walletActions }), [walletState, walletActions]);
}
