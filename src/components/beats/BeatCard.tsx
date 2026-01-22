import { useState } from "react";
import { Play, Pause, Heart, ShoppingCart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WaveformAnimation from "@/components/ui/WaveformAnimation";
import { cn } from "@/lib/utils";

interface Beat {
  id: string;
  title: string;
  producer: string;
  genre: string;
  bpm: number;
  price: number;
  mood: string;
  coverUrl?: string;
  isExclusive?: boolean;
}

interface BeatCardProps {
  beat: Beat;
  onPlay?: (beat: Beat) => void;
  onAddToCart?: (beat: Beat) => void;
  isCurrentlyPlaying?: boolean;
}

const BeatCard = ({ beat, onPlay, onAddToCart, isCurrentlyPlaying = false }: BeatCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="beat-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Art */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        {beat.coverUrl ? (
          <img src={beat.coverUrl} alt={beat.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-secondary to-background-glass" />
        )}
        
        {/* Overlay on Hover */}
        <div
          className={cn(
            "absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button
            variant="icon"
            size="icon"
            onClick={() => onPlay?.(beat)}
            className="w-16 h-16 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full shadow-lg"
          >
            {isCurrentlyPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
          </Button>
        </div>

        {/* Exclusive Badge */}
        {beat.isExclusive && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
            Exclusive
          </Badge>
        )}

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsLiked(!isLiked)}
          className={cn(
            "absolute top-3 right-3 bg-background/50 backdrop-blur-sm hover:bg-background/70",
            isLiked && "text-primary"
          )}
        >
          <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
        </Button>
      </div>

      {/* Waveform */}
      <div className="mb-4">
        <WaveformAnimation isPlaying={isCurrentlyPlaying} barCount={20} height={32} />
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{beat.title}</h3>
            <p className="text-sm text-foreground-muted truncate">{beat.producer}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="font-display font-bold text-foreground">${beat.price}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {beat.genre}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {beat.bpm} BPM
          </Badge>
          <Badge variant="outline" className="text-xs">
            {beat.mood}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => onAddToCart?.(beat)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" size="sm">
            <Tag className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BeatCard;
