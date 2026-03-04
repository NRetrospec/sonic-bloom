import { ArrowRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import WaveformAnimation from "@/components/ui/WaveformAnimation";
import { mockBeats } from "@/lib/mockData";
import { usePlayer } from "@/context/PlayerContext";

const featuredBeats = mockBeats.slice(0, 4);

const FeaturedBeats = () => {
  const { playBeat, isCurrentBeat, isPlaying } = usePlayer();

  return (
    <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 bg-background-elevated relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Featured
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Hot This Week
            </h2>
          </div>
          <Link to="/beats">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredBeats.map((beat, index) => {
            const playing = isPlaying && isCurrentBeat(beat.id);
            return (
              <div
                key={beat.id}
                className="group relative rounded-2xl overflow-hidden bg-card hover:bg-card-hover transition-all duration-500"
                style={{
                  animation: `fade-up 0.6s ease-out ${index * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                {/* Cover */}
                <Link to={`/beats/${beat.id}`} className="block">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={beat.coverUrl}
                      alt={beat.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/40 backdrop-blur-sm">
                      <Button
                        variant="icon"
                        size="icon"
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground"
                        onClick={(e) => {
                          e.preventDefault();
                          playBeat(beat, featuredBeats);
                        }}
                      >
                        {playing ? (
                          <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-1" />
                        )}
                      </Button>
                    </div>

                    {/* Genre Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/50 backdrop-blur-sm text-xs font-semibold text-foreground">
                      {beat.genre}
                    </span>
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/beats/${beat.id}`}>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {beat.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-foreground-muted">{beat.producer}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-foreground">${beat.price}</div>
                      <div className="text-xs text-foreground-subtle">{beat.bpm} BPM</div>
                    </div>
                  </div>

                  {/* Mini Waveform */}
                  <div className="mt-4">
                    <WaveformAnimation
                      isPlaying={playing}
                      barCount={16}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBeats;
