import { useState, useMemo } from "react";
import BeatCard from "@/components/beats/BeatCard";
import BeatFilters from "@/components/beats/BeatFilters";
import PageLayout from "@/components/layout/PageLayout";
import { mockBeats } from "@/lib/mockData";
import { usePlayer } from "@/context/PlayerContext";

interface FilterState {
  search: string;
  genre: string;
  bpm: [number, number];
  mood: string;
  priceRange: [number, number];
  licenseType: string;
}

const BeatsPage = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    genre: "All Genres",
    bpm: [60, 180],
    mood: "All Moods",
    priceRange: [0, 500],
    licenseType: "All Licenses",
  });

  const { playBeat, isCurrentBeat, isPlaying } = usePlayer();

  const filteredBeats = useMemo(() => {
    return mockBeats.filter((beat) => {
      if (
        filters.search &&
        !beat.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !beat.producer.toLowerCase().includes(filters.search.toLowerCase()) &&
        !beat.genre.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.genre !== "All Genres" && beat.genre !== filters.genre) return false;
      if (filters.mood !== "All Moods" && beat.mood !== filters.mood) return false;
      if (beat.bpm < filters.bpm[0] || beat.bpm > filters.bpm[1]) return false;
      if (beat.price < filters.priceRange[0] || beat.price > filters.priceRange[1]) return false;
      return true;
    });
  }, [filters]);

  return (
    <PageLayout>
      {/* Header */}
      <div className="sticky top-14 lg:top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="px-4 sm:px-8 py-4 sm:py-6">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">
            Browse Beats
          </h1>
          <BeatFilters onFilterChange={setFilters} />
        </div>
      </div>

      {/* Beat Grid */}
      <div className="px-4 sm:px-8 py-6 sm:py-8">
        {filteredBeats.length === 0 ? (
          <div className="glass-panel p-12 sm:p-16 text-center">
            <p className="text-foreground-muted text-lg mb-2">No beats match your filters</p>
            <p className="text-foreground-subtle text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <p className="text-foreground-muted text-sm mb-6">
              {filteredBeats.length} {filteredBeats.length === 1 ? "beat" : "beats"} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredBeats.map((beat) => (
                <BeatCard
                  key={beat.id}
                  beat={beat}
                  onPlay={(b) => playBeat(b, filteredBeats)}
                  isCurrentlyPlaying={isPlaying && isCurrentBeat(beat.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default BeatsPage;
