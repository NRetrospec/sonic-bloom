import { Play, Pause, Heart, ShoppingCart, Tag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WaveformAnimation from "@/components/ui/WaveformAnimation";
import { cn } from "@/lib/utils";
import { Beat } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { Link } from "react-router-dom";
import { useState } from "react";

interface BeatCardProps {
  beat: Beat;
  onPlay?: (beat: Beat) => void;
  isCurrentlyPlaying?: boolean;
}

const BeatCard = ({ beat, onPlay, isCurrentlyPlaying = false }: BeatCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const liked = isFavorite(beat.id);
  const inCart = isInCart(beat.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) return;
    addToCart(beat);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1500);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(beat);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPlay?.(beat);
  };

  return (
    <div
      className="beat-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Art */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        <Link to={`/beats/${beat.id}`}>
          {beat.coverUrl ? (
            <img src={beat.coverUrl} alt={beat.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-secondary to-background-glass" />
          )}
        </Link>

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
            onClick={handlePlay}
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
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-3 right-3 bg-background/50 backdrop-blur-sm hover:bg-background/70",
            liked && "text-primary"
          )}
        >
          <Heart className={cn("w-4 h-4", liked && "fill-current")} />
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
            <Link to={`/beats/${beat.id}`} className="hover:text-primary transition-colors">
              <h3 className="font-semibold text-foreground truncate">{beat.title}</h3>
            </Link>
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
            className={cn("flex-1", inCart && "bg-secondary text-foreground hover:bg-secondary")}
            onClick={handleAddToCart}
            disabled={inCart}
          >
            {inCart || addedFlash ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                {addedFlash ? "Added!" : "In Cart"}
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          <Link to={`/beats/${beat.id}`}>
            <Button variant="outline" size="sm">
              <Tag className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BeatCard;
