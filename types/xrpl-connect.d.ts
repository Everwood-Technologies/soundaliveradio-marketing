declare module "xrpl-connect" {
  export interface XRPLNetwork {
    id: string;
    name: string;
    wss?: string;
    rpc?: string;
    walletConnectId?: string;
  }

  export interface XRPLAccount {
    address: string;
    publicKey?: string;
    network: XRPLNetwork;
  }

  export interface WalletAdapter {
    id: string;
    name: string;
    icon?: string;
    isAvailable(): Promise<boolean>;
    connect(options?: Record<string, unknown>): Promise<XRPLAccount>;
    disconnect(): Promise<void>;
    on?(event: string, listener: (...args: unknown[]) => void): void;
  }

  export interface WalletManagerOptions {
    adapters: WalletAdapter[];
    network?: string | XRPLNetwork;
    autoConnect?: boolean;
    logger?: {
      level?: "debug" | "info" | "warn" | "error" | "none";
      prefix?: string;
    };
    storage?: unknown;
  }

  export class WalletManager {
    constructor(options: WalletManagerOptions);

    connect(walletId: string, options?: Record<string, unknown>): Promise<XRPLAccount>;
    disconnect(): Promise<void>;
    reconnect(): Promise<XRPLAccount | null>;

    on(event: "connect", listener: (account: XRPLAccount) => void): this;
    on(event: "disconnect", listener: () => void): this;
    on(event: "accountChanged", listener: (account: XRPLAccount) => void): this;
    on(event: "networkChanged", listener: (network: XRPLNetwork) => void): this;
    on(event: string, listener: (...args: unknown[]) => void): this;

    off(event: "connect", listener: (account: XRPLAccount) => void): this;
    off(event: "disconnect", listener: () => void): this;
    off(event: "accountChanged", listener: (account: XRPLAccount) => void): this;
    off(event: "networkChanged", listener: (network: XRPLNetwork) => void): this;
    off(event: string, listener: (...args: unknown[]) => void): this;

    get connected(): boolean;
    get account(): XRPLAccount | null;
    get wallet(): WalletAdapter | null;
    get wallets(): WalletAdapter[];
  }

  export interface XamanAdapterOptions {
    apiKey?: string;
    onQRCode?: (qrCode: string) => void;
    onDeepLink?: (deepLink: string) => void;
  }

  export class XamanAdapter implements WalletAdapter {
    constructor(options?: XamanAdapterOptions);

    id: string;
    name: string;
    icon?: string;

    isAvailable(): Promise<boolean>;
    connect(options?: Record<string, unknown>): Promise<XRPLAccount>;
    disconnect(): Promise<void>;
    getAccount(): Promise<XRPLAccount | null>;
    getNetwork(): Promise<XRPLNetwork>;
  }

  export interface WalletConnectorElement extends HTMLElement {
    setWalletManager(walletManager: WalletManager): void;
    open(): Promise<void>;
    close(): void;
    toggle(): void;
  }
}
