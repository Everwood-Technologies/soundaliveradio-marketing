"use client";

import type { WalletManager, XRPLAccount } from "xrpl-connect";

const XAMAN_API_KEY = process.env.NEXT_PUBLIC_XAMAN_API_KEY?.trim() ?? "";
const NETWORK_ENV = process.env.NEXT_PUBLIC_XRPL_NETWORK?.trim().toLowerCase();
const XRPL_NETWORK: "mainnet" | "testnet" | "devnet" =
  NETWORK_ENV === "testnet" || NETWORK_ENV === "devnet" ? NETWORK_ENV : "mainnet";

let walletManager: WalletManager | null = null;
let walletManagerPromise: Promise<WalletManager> | null = null;

async function createWalletManager(): Promise<WalletManager> {
  const { WalletManager, XamanAdapter } = await import("xrpl-connect");
  return new WalletManager({
    adapters: [new XamanAdapter({ apiKey: XAMAN_API_KEY || undefined })],
    autoConnect: true,
    network: XRPL_NETWORK,
    logger: { level: process.env.NODE_ENV === "development" ? "info" : "warn" },
  });
}

export async function getWalletManager(): Promise<WalletManager> {
  if (walletManager) return walletManager;

  if (!walletManagerPromise) {
    walletManagerPromise = createWalletManager()
      .then((manager) => {
        walletManager = manager;
        return manager;
      })
      .catch((error) => {
        walletManagerPromise = null;
        throw error;
      });
  }

  return walletManagerPromise;
}

export function getWalletConfigError(): string | null {
  if (!XAMAN_API_KEY) {
    return "Wallet integration is missing NEXT_PUBLIC_XAMAN_API_KEY.";
  }
  return null;
}

export function hasWalletConfig(): boolean {
  return getWalletConfigError() === null;
}

export function getConnectedWalletAccount(): XRPLAccount | null {
  return walletManager?.connected ? walletManager.account : null;
}

export async function connectWallet(): Promise<XRPLAccount> {
  const configError = getWalletConfigError();
  if (configError) {
    throw new Error(configError);
  }
  const manager = await getWalletManager();
  return manager.connect("xaman");
}

export async function disconnectWallet(): Promise<void> {
  const manager = await getWalletManager();
  if (!manager.connected) return;
  await manager.disconnect();
}
