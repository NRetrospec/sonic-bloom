import { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { Beat } from "@/lib/mockData";

interface PlayerContextValue {
  currentBeat: Beat | null;
  queue: Beat[];
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playBeat: (beat: Beat, queue?: Beat[]) => void;
  togglePlay: () => void;
  pause: () => void;
  seekTo: (pct: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  skipNext: () => void;
  skipPrev: () => void;
  isCurrentBeat: (beatId: string) => boolean;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [queue, setQueue] = useState<Beat[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(75);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      skipNext();
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Progress ticker via rAF
  const tick = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, tick]);

  const playBeat = useCallback((beat: Beat, newQueue?: Beat[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentBeat?.id === beat.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    // New beat: since we have no real audio URLs, simulate with silence
    // In production this would be: audio.src = beat.audioUrl;
    audio.src = "";
    setCurrentBeat(beat);
    setProgress(0);
    setDuration(0);
    if (newQueue) setQueue(newQueue);
    // Simulate playing (no real audio src in mock)
    setIsPlaying(true);
    audio.play().catch(() => {
      // Expected: no real src, just simulate the playing state
    });
  }, [currentBeat, isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentBeat) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, currentBeat]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const seekTo = useCallback((pct: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = (pct / 100) * audio.duration;
      setProgress(pct);
    } else {
      setProgress(pct);
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(vol);
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  const skipNext = useCallback(() => {
    if (!currentBeat || queue.length === 0) return;
    const idx = queue.findIndex((b) => b.id === currentBeat.id);
    const next = queue[idx + 1];
    if (next) playBeat(next, queue);
  }, [currentBeat, queue, playBeat]);

  const skipPrev = useCallback(() => {
    const audio = audioRef.current;
    if (!currentBeat || queue.length === 0) return;
    // If more than 3s in, restart; else go to previous
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setProgress(0);
      return;
    }
    const idx = queue.findIndex((b) => b.id === currentBeat.id);
    const prev = queue[idx - 1];
    if (prev) playBeat(prev, queue);
  }, [currentBeat, queue, playBeat]);

  const isCurrentBeat = useCallback((beatId: string) => currentBeat?.id === beatId, [currentBeat]);

  return (
    <PlayerContext.Provider value={{
      currentBeat, queue, isPlaying, progress, duration, volume, isMuted,
      playBeat, togglePlay, pause, seekTo, setVolume, toggleMute,
      skipNext, skipPrev, isCurrentBeat,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
