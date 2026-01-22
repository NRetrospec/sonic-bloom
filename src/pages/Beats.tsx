import { useState } from "react";
import BeatCard from "@/components/beats/BeatCard";
import BeatFilters from "@/components/beats/BeatFilters";
import MiniPlayer from "@/components/player/MiniPlayer";
import VerticalNav from "@/components/layout/VerticalNav";

// Import cover images
import cover1 from "@/assets/covers/cover-1.jpg";
import cover2 from "@/assets/covers/cover-2.jpg";
import cover3 from "@/assets/covers/cover-3.jpg";
import cover4 from "@/assets/covers/cover-4.jpg";

// Mock data for beats
const mockBeats = [
  {
    id: "1",
    title: "Midnight Drive",
    producer: "BEATVAULT",
    genre: "Trap",
    bpm: 140,
    price: 29.99,
    mood: "Dark",
    isExclusive: true,
    coverUrl: cover1,
  },
  {
    id: "2",
    title: "City Lights",
    producer: "BEATVAULT",
    genre: "Lo-Fi",
    bpm: 85,
    price: 19.99,
    mood: "Chill",
    coverUrl: cover2,
  },
  {
    id: "3",
    title: "War Ready",
    producer: "BEATVAULT",
    genre: "Drill",
    bpm: 145,
    price: 34.99,
    mood: "Aggressive",
    coverUrl: cover3,
  },
  {
    id: "4",
    title: "Purple Haze",
    producer: "BEATVAULT",
    genre: "Hip-Hop",
    bpm: 92,
    price: 24.99,
    mood: "Melodic",
    coverUrl: cover4,
  },
  {
    id: "5",
    title: "Neon Dreams",
    producer: "BEATVAULT",
    genre: "R&B",
    bpm: 110,
    price: 29.99,
    mood: "Emotional",
    isExclusive: true,
    coverUrl: cover1,
  },
  {
    id: "6",
    title: "Thunder",
    producer: "BEATVAULT",
    genre: "Cinematic",
    bpm: 120,
    price: 49.99,
    mood: "Energetic",
    isExclusive: true,
    coverUrl: cover3,
  },
  {
    id: "7",
    title: "Smooth Operator",
    producer: "BEATVAULT",
    genre: "R&B",
    bpm: 95,
    price: 22.99,
    mood: "Chill",
    coverUrl: cover2,
  },
  {
    id: "8",
    title: "Gunsmoke",
    producer: "BEATVAULT",
    genre: "Trap",
    bpm: 150,
    price: 27.99,
    mood: "Dark",
    coverUrl: cover4,
  },
];

const BeatsPage = () => {
  const [currentBeat, setCurrentBeat] = useState(mockBeats[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (beat: typeof mockBeats[0]) => {
    if (currentBeat?.id === beat.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentBeat(beat);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <VerticalNav />
      
      <main className="ml-64 pb-24">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="px-8 py-6">
            <h1 className="font-display text-3xl font-bold text-foreground mb-6">Browse Beats</h1>
            <BeatFilters />
          </div>
        </div>

        {/* Beat Grid */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockBeats.map((beat) => (
              <BeatCard
                key={beat.id}
                beat={beat}
                onPlay={handlePlay}
                isCurrentlyPlaying={isPlaying && currentBeat?.id === beat.id}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Mini Player */}
      <MiniPlayer
        currentBeat={currentBeat}
        isVisible={true}
      />
    </div>
  );
};

export default BeatsPage;
