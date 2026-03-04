import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import WaveformAnimation from "@/components/ui/WaveformAnimation";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/context/PlayerContext";
import { useFavorites } from "@/context/FavoritesContext";

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const MiniPlayer = () => {
  const {
    currentBeat, isPlaying, progress, duration,
    volume, isMuted, togglePlay, seekTo, setVolume, toggleMute,
    skipNext, skipPrev,
  } = usePlayer();

  const { toggleFavorite, isFavorite } = useFavorites();

  if (!currentBeat) return null;

  const liked = isFavorite(currentBeat.id);
  const currentTime = duration ? (progress / 100) * duration : 0;

  return (
    <div className="fixed bottom-0 left-0 lg:left-64 right-0 z-40 bg-background-elevated/95 backdrop-blur-xl border-t border-border">
      {/* Thin progress indicator — always visible, full width */}
      <div className="h-0.5 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between px-3 sm:px-6 gap-2 sm:gap-6 h-16 sm:h-20">
        {/* Track Info */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1 sm:flex-none sm:min-w-[220px]">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary overflow-hidden shrink-0">
            {currentBeat.coverUrl ? (
              <img src={currentBeat.coverUrl} alt={currentBeat.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-foreground text-sm truncate">{currentBeat.title}</div>
            <div className="text-xs text-muted-foreground truncate">{currentBeat.producer}</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(currentBeat)}
            className={cn("shrink-0 hidden sm:flex", liked && "text-primary")}
          >
            <Heart className={cn("w-5 h-5", liked && "fill-current")} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-xl">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={skipPrev}
              className="text-muted-foreground hover:text-foreground w-8 h-8 sm:w-10 sm:h-10"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              variant="icon"
              size="icon"
              onClick={togglePlay}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={skipNext}
              className="text-muted-foreground hover:text-foreground w-8 h-8 sm:w-10 sm:h-10"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Progress bar — sm+ only (thin bar at top serves mobile) */}
          <div className="hidden sm:flex w-full items-center gap-3">
            <span className="text-xs text-muted-foreground w-8 text-right shrink-0">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[progress]}
              onValueChange={(value) => seekTo(value[0])}
              max={100}
              step={0.1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8 shrink-0">
              {duration ? formatTime(duration) : currentBeat.duration}
            </span>
          </div>
        </div>

        {/* Volume & Waveform — md+ only */}
        <div className="hidden md:flex items-center gap-3 min-w-[180px] justify-end">
          <div className="w-16">
            <WaveformAnimation isPlaying={isPlaying} barCount={10} height={28} />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={isMuted ? [0] : [volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
