import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import BeatCard from "@/components/beats/BeatCard";
import { useFavorites } from "@/context/FavoritesContext";
import { usePlayer } from "@/context/PlayerContext";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { playBeat, isCurrentBeat, isPlaying } = usePlayer();

  return (
    <PageLayout>
      {/* Header */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Favorites</h1>
            <p className="text-foreground-muted text-sm mt-0.5">
              {favorites.length} saved {favorites.length === 1 ? "beat" : "beats"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-6 sm:py-8">
        {favorites.length === 0 ? (
          <div className="glass-panel p-12 sm:p-16 text-center max-w-lg mx-auto">
            <Heart className="w-16 h-16 mx-auto text-foreground-subtle mb-4" />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              No favorites yet
            </h2>
            <p className="text-foreground-muted mb-6">
              Heart beats you love to save them here for later
            </p>
            <Link to="/beats">
              <Button variant="hero">
                Browse Beats
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {favorites.map((beat) => (
              <BeatCard
                key={beat.id}
                beat={beat}
                onPlay={(b) => playBeat(b, favorites)}
                isCurrentlyPlaying={isPlaying && isCurrentBeat(beat.id)}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default FavoritesPage;
