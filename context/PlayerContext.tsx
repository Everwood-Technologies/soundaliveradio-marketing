"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface PlayerState {
  streamUrl: string | null;
  channelName: string;
}

interface PlayerContextValue extends PlayerState {
  setChannel: (streamUrl: string | null, channelName?: string) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    streamUrl: null,
    channelName: "Sound Alive Radio",
  });

  const setChannel = useCallback(
    (streamUrl: string | null, channelName?: string) => {
      setState((prev) => ({
        streamUrl,
        channelName: channelName ?? prev.channelName,
      }));
    },
    []
  );

  return (
    <PlayerContext.Provider value={{ ...state, setChannel }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return ctx;
}
