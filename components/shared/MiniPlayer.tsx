"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/lib/utils";
import Hls from "hls.js";

const MEDIA_ERR_SRC_NOT_SUPPORTED = 4;

function isHlsUrl(url: string): boolean {
  return /\.m3u8(\?|$)/i.test(url) || url.includes("m3u8");
}

function canPlayHlsNatively(): boolean {
  if (typeof document === "undefined") return false;
  const video = document.createElement("video");
  return (
    video.canPlayType("application/vnd.apple.mpegurl") !== "" ||
    video.canPlayType("application/x-mpegURL") !== ""
  );
}

/**
 * Minimal persistent audio player (bottom bar).
 * Reads streamUrl and channelName from PlayerContext (set when user clicks Tune In).
 * Auto-plays when a new stream is set (user just clicked Tune In).
 * Uses hls.js when the stream is HLS or when the browser reports "source not supported".
 */
export function MiniPlayer({ className }: { className?: string } = {}) {
  const { streamUrl, channelName } = usePlayer();
  const [playing, setPlaying] = useState(false);
  const [playError, setPlayError] = useState<string | null>(null);
  const [useHls, setUseHls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const tryHlsPlayback = useCallback(
    (url: string) => {
      const el = audioRef.current;
      if (!el || typeof window === "undefined") return;

      if (!Hls.isSupported()) {
        setPlayError("Stream format not supported in this browser");
        return;
      }

      hlsRef.current?.destroy();
      hlsRef.current = null;
      el.removeAttribute("src");
      el.load();

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;
      setUseHls(true);
      setPlayError(null);

      hls.loadSource(url);
      hls.attachMedia(el);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        el.play().catch(() => setPlaying(false));
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setPlayError("Stream failed to load");
          setPlaying(false);
        }
      });
    },
    []
  );

  useEffect(() => {
    if (!streamUrl || !audioRef.current) return;
    const el = audioRef.current;

    hlsRef.current?.destroy();
    hlsRef.current = null;
    setUseHls(false);
    setPlayError(null);

    const isHls = isHlsUrl(streamUrl);
    const nativeHls = canPlayHlsNatively();

    if (isHls && !nativeHls && Hls.isSupported()) {
      tryHlsPlayback(streamUrl);
      return () => {
        hlsRef.current?.destroy();
        hlsRef.current = null;
      };
    }

    el.removeAttribute("src");
    el.load();
    el.src = streamUrl;

    const play = () => {
      el.play().catch(() => setPlaying(false));
    };
    if (el.readyState >= 2) play();
    else el.addEventListener("canplay", play, { once: true });

    const handleError = () => {
      const err = el.error;
      if (err?.code === MEDIA_ERR_SRC_NOT_SUPPORTED && Hls.isSupported()) {
        tryHlsPlayback(streamUrl);
      } else {
        setPlayError("Playback failed. This stream may not be supported.");
      }
    };
    el.addEventListener("error", handleError);

    return () => {
      el.removeEventListener("canplay", play);
      el.removeEventListener("error", handleError);
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [streamUrl, tryHlsPlayback]);

  if (!streamUrl) {
    return (
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-4 py-3",
          "flex items-center justify-between",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-lg">S</span>
          </div>
          <div>
            <p className="text-sm font-medium text-headline">{channelName}</p>
            <p className="text-xs text-muted">Stream not configured</p>
          </div>
        </div>
        <button
          type="button"
          disabled
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-muted cursor-not-allowed"
          aria-label="Play"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-4 py-3",
        "flex items-center justify-between",
        className
      )}
    >
      <audio
        ref={(el) => {
          audioRef.current = el;
        }}
        key={streamUrl}
        src={useHls ? undefined : streamUrl}
        onPlay={() => {
          setPlaying(true);
          setPlayError(null);
        }}
        onPause={() => setPlaying(false)}
        id="mini-player-audio"
      />
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <span className="text-primary text-lg">S</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-headline truncate">{channelName}</p>
          <p className="text-xs text-muted">
            {playError ?? (playing ? "Live" : "Paused")}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          const el = document.getElementById("mini-player-audio") as HTMLAudioElement;
          if (el) {
            if (playing) el.pause();
            else el.play().catch(() => setPlaying(false));
          }
        }}
        className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
