import { ArrowRight, Play, Pause } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VerticalNav from "@/components/layout/VerticalNav";
import BeatCard from "@/components/beats/BeatCard";

const genres = [
  { name: "Trap", count: 124, description: "Hard-hitting 808s and aggressive hi-hats" },
  { name: "Hip-Hop", count: 89, description: "Classic boom bap and modern vibes" },
  { name: "Drill", count: 67, description: "Dark, sliding 808s and ominous melodies" },
  { name: "Lo-Fi", count: 45, description: "Chill, nostalgic beats for relaxation" },
  { name: "R&B", count: 78, description: "Smooth, soulful production" },
  { name: "Cinematic", count: 34, description: "Epic orchestral and atmospheric sounds" },
  { name: "Pop", count: 56, description: "Radio-ready, catchy productions" },
  { name: "Afrobeats", count: 42, description: "Vibrant African-influenced rhythms" },
];

const mockBeatsByGenre = {
  trap: [
    { id: "t1", title: "Midnight Drive", producer: "BEATVAULT", genre: "Trap", bpm: 140, price: 29.99, mood: "Dark", isExclusive: true },
    { id: "t2", title: "Gunsmoke", producer: "BEATVAULT", genre: "Trap", bpm: 150, price: 27.99, mood: "Aggressive" },
    { id: "t3", title: "Night Vision", producer: "BEATVAULT", genre: "Trap", bpm: 145, price: 24.99, mood: "Dark" },
    { id: "t4", title: "Money Talk", producer: "BEATVAULT", genre: "Trap", bpm: 138, price: 32.99, mood: "Energetic" },
  ],
};

const GenresPage = () => {
  const [searchParams] = useSearchParams();
  const selectedGenre = searchParams.get("genre");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const genreBeats = selectedGenre 
    ? mockBeatsByGenre[selectedGenre.toLowerCase() as keyof typeof mockBeatsByGenre] || mockBeatsByGenre.trap
    : null;

  return (
    <div className="min-h-screen bg-background">
      <VerticalNav />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Explore
            </span>
            <h1 className="font-display text-4xl font-bold text-foreground mt-2">
              {selectedGenre ? `${selectedGenre} Beats` : "Browse by Genre"}
            </h1>
            <p className="text-foreground-muted mt-4 max-w-2xl">
              {selectedGenre 
                ? genres.find(g => g.name.toLowerCase() === selectedGenre.toLowerCase())?.description
                : "Find the perfect sound for your next project. From hard-hitting trap to smooth R&B."}
            </p>
          </div>

          {selectedGenre ? (
            /* Beat Grid for Selected Genre */
            <div>
              <Link to="/genres">
                <Button variant="ghost" className="mb-6">
                  ← Back to all genres
                </Button>
              </Link>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {genreBeats?.map((beat) => (
                  <BeatCard
                    key={beat.id}
                    beat={beat}
                    onPlay={() => setPlayingId(playingId === beat.id ? null : beat.id)}
                    isCurrentlyPlaying={playingId === beat.id}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Genre Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {genres.map((genre, index) => (
                <Link
                  key={genre.name}
                  to={`/genres?genre=${genre.name.toLowerCase()}`}
                  className="group glass-panel p-8 transition-all duration-300 hover:border-primary/30"
                  style={{ 
                    animation: `fade-up 0.6s ease-out ${index * 0.05}s forwards`,
                    opacity: 0 
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-transparent flex items-center justify-center">
                      <span className="font-display text-xl font-bold text-primary">
                        {genre.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-foreground-subtle">
                      {genre.count} beats
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {genre.name}
                  </h3>
                  <p className="text-sm text-foreground-muted mb-4">
                    {genre.description}
                  </p>
                  
                  <div className="flex items-center text-foreground-muted group-hover:text-primary transition-colors">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GenresPage;
