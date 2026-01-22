import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import WaveformAnimation from "@/components/ui/WaveformAnimation";
import { cn } from "@/lib/utils";

interface MiniPlayerProps {
  currentBeat?: {
    id: string;
    title: string;
    producer: string;
    coverUrl?: string;
  };
  isVisible?: boolean;
}

const MiniPlayer = ({ currentBeat, isVisible = true }: MiniPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(30);
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);

  if (!isVisible || !currentBeat) return null;

  return (
    <div className="fixed bottom-0 left-64 right-0 h-20 bg-background-elevated/95 backdrop-blur-xl border-t border-border z-40">
      <div className="h-full flex items-center justify-between px-6 gap-6">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-[240px]">
          <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden">
            {currentBeat.coverUrl ? (
              <img src={currentBeat.coverUrl} alt={currentBeat.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-foreground truncate">{currentBeat.title}</div>
            <div className="text-sm text-foreground-muted truncate">{currentBeat.producer}</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className={cn("shrink-0", isLiked && "text-primary")}
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex-1 max-w-2xl flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-foreground-muted hover:text-foreground">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              variant="icon"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground-muted hover:text-foreground">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full flex items-center gap-3">
            <span className="text-xs text-foreground-subtle w-10 text-right">1:24</span>
            <Slider
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-foreground-subtle w-10">3:45</span>
          </div>
        </div>

        {/* Volume & Waveform */}
        <div className="flex items-center gap-4 min-w-[200px] justify-end">
          <div className="w-24">
            <WaveformAnimation isPlaying={isPlaying} barCount={12} height={32} />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="text-foreground-muted hover:text-foreground"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
