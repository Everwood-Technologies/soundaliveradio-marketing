"use client";

import { useEffect, useRef } from "react";
import type { WalletConnectorElement } from "xrpl-connect";
import { useWalletActions } from "@/context/WalletContext";

export function WalletConnectorHost() {
  const { registerConnectorElement } = useWalletActions();
  const connectorRef = useRef<WalletConnectorElement | null>(null);

  useEffect(() => {
    registerConnectorElement(connectorRef.current);
    return () => registerConnectorElement(null);
  }, [registerConnectorElement]);

  return (
    <xrpl-wallet-connector
      ref={(element: Element | null) => {
        connectorRef.current = element as WalletConnectorElement | null;
      }}
      wallets="xaman"
      primary-wallet="xaman"
      style={{ display: "none" }}
    />
  );
}
