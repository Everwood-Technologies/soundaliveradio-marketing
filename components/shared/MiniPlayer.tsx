"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePlayerActions, usePlayerState } from "@/context/PlayerContext";
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

function toPlayableSrc(streamUrl: string): string {
  return streamUrl;
}

/**
 * Minimal persistent audio player (bottom bar).
 * Reads stream session state from PlayerContext.
 * Auto-plays when a new stream is set.
 * Uses hls.js when the stream is HLS or when the browser reports "source not supported".
 */
export function MiniPlayer({ className }: { className?: string } = {}) {
  const { streamUrl, streamUrls, channelName, currentTitle, volume, muted } =
    usePlayerState();
  const {
    nextStream,
    setVolume,
    toggleMute,
  } = usePlayerActions();
  const [playing, setPlaying] = useState(false);
  const [playError, setPlayError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const failedUrlRef = useRef<string | null>(null);

  const handleFatalPlaybackError = useCallback(
    (failedUrl: string, fallbackMessage?: string) => {
      if (failedUrlRef.current === failedUrl) return;
      failedUrlRef.current = failedUrl;
      setPlaying(false);

      if (streamUrls.length > 1) {
        setPlayError("Stream issue detected. Switching to backup...");
        nextStream();
      } else {
        setPlayError(
          fallbackMessage ?? "Playback failed. This stream may not be supported."
        );
      }
    },
    [nextStream, streamUrls.length]
  );

  const tryHlsPlayback = useCallback(
    (sourceUrl: string, originStreamUrl: string) => {
      const el = audioRef.current;
      if (!el || typeof window === "undefined") return;

      if (!Hls.isSupported()) {
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

      hls.loadSource(sourceUrl);
      hls.attachMedia(el);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        el.play().catch(() => setPlaying(false));
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          handleFatalPlaybackError(originStreamUrl, "Stream failed to load");
        }
      });
    },
    [handleFatalPlaybackError]
  );

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
    el.muted = muted;
  }, [volume, muted]);

  useEffect(() => {
    if (!streamUrl || !audioRef.current) return;
    const el = audioRef.current;

    failedUrlRef.current = null;
    hlsRef.current?.destroy();
    hlsRef.current = null;

    const playableSrc = toPlayableSrc(streamUrl);
    const isHls = isHlsUrl(streamUrl);
    const nativeHls = canPlayHlsNatively();

    if (isHls && !nativeHls && Hls.isSupported()) {
      tryHlsPlayback(playableSrc, streamUrl);
      return () => {
        hlsRef.current?.destroy();
        hlsRef.current = null;
      };
    }

    el.removeAttribute("src");
    el.load();
    el.src = playableSrc;

    const play = () => {
      el.play().catch(() => setPlaying(false));
    };
    if (el.readyState >= 2) play();
    else el.addEventListener("canplay", play, { once: true });

    const handleError = () => {
      const err = el.error;
      if (isHls && err?.code === MEDIA_ERR_SRC_NOT_SUPPORTED && Hls.isSupported()) {
        tryHlsPlayback(playableSrc, streamUrl);
      } else {
        handleFatalPlaybackError(streamUrl);
      }
    };
    el.addEventListener("error", handleError);

    return () => {
      el.removeEventListener("canplay", play);
      el.removeEventListener("error", handleError);
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [streamUrl, tryHlsPlayback, handleFatalPlaybackError]);

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
            <p className="text-xs text-muted">
              {currentTitle || "Stream not configured"}
            </p>
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
        onPlay={() => {
          setPlaying(true);
          setPlayError(null);
        }}
        onPause={() => setPlaying(false)}
      />
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <span className="text-primary text-lg">S</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-headline truncate">{channelName}</p>
          <p className="text-xs text-muted">
            {playError ??
              (currentTitle ||
                (playing ? "Live" : "Paused"))}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={toggleMute}
          className="w-9 h-9 rounded-full bg-white/10 text-foreground flex items-center justify-center hover:bg-white/15 transition-colors"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted || volume === 0 ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1-3.29-2.5-4.03v8.05A4.49 4.49 0 0 0 16.5 12zM19 12c0 2.53-1.17 4.78-3 6.24v-2.06A6.96 6.96 0 0 0 17 12c0-1.67-.58-3.21-1.55-4.41V5.53A8.98 8.98 0 0 1 19 12zM4.27 3 3 4.27l4.73 4.73H4v6h4l5 5v-7.73L18.73 21 20 19.73 4.27 3z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1-3.29-2.5-4.03v8.05A4.49 4.49 0 0 0 16.5 12zM14 3.23v2.06a6.96 6.96 0 0 1 0 13.42v2.06a8.99 8.99 0 0 0 0-17.54z" />
            </svg>
          )}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => {
            const next = Number(e.target.value);
            setVolume(next);
            if (muted && next > 0) {
              toggleMute();
            }
          }}
          className="w-20 accent-primary"
          aria-label="Volume"
        />
        <button
          type="button"
          onClick={() => {
            const el = audioRef.current;
            if (!el) return;
            if (playing) el.pause();
            else el.play().catch(() => setPlaying(false));
          }}
          className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center hover:bg-primary/90 transition-colors"
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
    </div>
  );
}
