"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface SetChannelPayload {
  id?: string;
  name: string;
  channelBaseUrl?: string;
  streamUrl?: string;
  streamUrls?: string[];
  nowPlaying?: string;
}

interface PlayerState {
  channelId: string | null;
  streamUrl: string | null;
  streamUrls: string[];
  activeStreamIndex: number;
  channelName: string;
  channelBaseUrl: string | null;
  currentTitle: string;
  volume: number;
  muted: boolean;
}

interface PlayerActions {
  setChannel: (
    payloadOrStream: SetChannelPayload | string | null,
    channelName?: string
  ) => void;
  nextStream: () => void;
  setCurrentTitle: (title: string) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

type PlayerContextValue = PlayerState & PlayerActions;

const PlayerStateContext = createContext<PlayerState | null>(null);
const PlayerActionsContext = createContext<PlayerActions | null>(null);

function dedupeUrls(urls: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const url of urls) {
    const trimmed = url.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    result.push(trimmed);
  }
  return result;
}

function parseCurrentTitlePayload(payload: unknown): string {
  if (typeof payload === "string") return payload.trim();
  if (
    typeof payload === "object" &&
    payload !== null &&
    "title" in payload &&
    typeof (payload as { title: unknown }).title === "string"
  ) {
    return ((payload as { title: string }).title || "").trim();
  }
  return "";
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    channelId: null,
    streamUrl: null,
    streamUrls: [],
    activeStreamIndex: 0,
    channelName: "Sound Alive Radio",
    channelBaseUrl: null,
    currentTitle: "",
    volume: 1,
    muted: false,
  });

  const setChannel = useCallback(
    (payloadOrStream: SetChannelPayload | string | null, channelName?: string) => {
      setState((prev) => ({
        ...prev,
        ...(typeof payloadOrStream === "string" || payloadOrStream == null
          ? (() => {
              const primary = payloadOrStream ?? null;
              const streamUrls = primary ? [primary] : [];
              return {
                channelId: primary ? prev.channelId : null,
                streamUrl: primary,
                streamUrls,
                activeStreamIndex: 0,
                channelName: channelName ?? prev.channelName,
                channelBaseUrl: primary ? prev.channelBaseUrl : null,
                currentTitle: primary ? prev.currentTitle : "",
              };
            })()
          : (() => {
              const streamUrls = dedupeUrls([
                payloadOrStream.streamUrl ?? "",
                ...(payloadOrStream.streamUrls ?? []),
              ]);
              const primaryStream = streamUrls[0] ?? null;
              return {
                channelId: payloadOrStream.id ?? null,
                streamUrl: primaryStream,
                streamUrls,
                activeStreamIndex: 0,
                channelName: payloadOrStream.name || prev.channelName,
                channelBaseUrl: payloadOrStream.channelBaseUrl ?? null,
                currentTitle: payloadOrStream.nowPlaying ?? "",
              };
            })()),
      }));
    },
    []
  );

  const nextStream = useCallback(() => {
    setState((prev) => {
      if (prev.streamUrls.length <= 1) return prev;
      const nextIndex = (prev.activeStreamIndex + 1) % prev.streamUrls.length;
      const nextUrl = prev.streamUrls[nextIndex] ?? null;
      if (nextUrl === prev.streamUrl) return prev;
      return {
        ...prev,
        activeStreamIndex: nextIndex,
        streamUrl: nextUrl,
      };
    });
  }, []);

  const setCurrentTitle = useCallback((title: string) => {
    const trimmed = title.trim();
    setState((prev) =>
      trimmed && trimmed !== prev.currentTitle
        ? { ...prev, currentTitle: trimmed }
        : prev
    );
  }, []);

  const setVolume = useCallback((volume: number) => {
    const normalized = Math.max(0, Math.min(1, volume));
    setState((prev) => {
      if (normalized === prev.volume) return prev;
      return { ...prev, volume: normalized, muted: normalized === 0 ? true : prev.muted };
    });
  }, []);

  const toggleMute = useCallback(() => {
    setState((prev) => ({ ...prev, muted: !prev.muted }));
  }, []);

  useEffect(() => {
    if (!state.channelBaseUrl) return;

    let mounted = true;
    const fetchTitle = async () => {
      if (typeof document !== "undefined" && document.hidden) return;
      try {
        const res = await fetch(
          `/api/current-title?url=${encodeURIComponent(state.channelBaseUrl as string)}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        const title = parseCurrentTitlePayload(data);
        if (mounted && title) {
          setState((prev) =>
            prev.currentTitle === title ? prev : { ...prev, currentTitle: title }
          );
        }
      } catch {
        // no-op: keep last known title
      }
    };

    void fetchTitle();
    const interval = window.setInterval(() => {
      void fetchTitle();
    }, 15_000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, [state.channelBaseUrl]);

  const actions = useMemo<PlayerActions>(
    () => ({
      setChannel,
      nextStream,
      setCurrentTitle,
      setVolume,
      toggleMute,
    }),
    [setChannel, nextStream, setCurrentTitle, setVolume, toggleMute]
  );

  return (
    <PlayerActionsContext.Provider value={actions}>
      <PlayerStateContext.Provider value={state}>{children}</PlayerStateContext.Provider>
    </PlayerActionsContext.Provider>
  );
}

export function usePlayerState(): PlayerState {
  const state = useContext(PlayerStateContext);
  if (!state) {
    throw new Error("usePlayerState must be used within a PlayerProvider");
  }
  return state;
}

export function usePlayerActions(): PlayerActions {
  const actions = useContext(PlayerActionsContext);
  if (!actions) {
    throw new Error("usePlayerActions must be used within a PlayerProvider");
  }
  return actions;
}

export function usePlayer(): PlayerContextValue {
  const state = usePlayerState();
  const actions = usePlayerActions();
  return useMemo(() => ({ ...state, ...actions }), [state, actions]);
}
