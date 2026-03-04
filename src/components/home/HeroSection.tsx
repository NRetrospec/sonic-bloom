import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import WaveformAnimation from "@/components/ui/WaveformAnimation";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, handle silently
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Red Glow Effect */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />

      {/* Content */}
      <div className="relative h-full flex items-center px-4 sm:px-8 lg:pl-8 lg:pr-12">
        <div className="max-w-2xl space-y-6 sm:space-y-8 w-full">
          {/* Animated Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border"
            style={{ animation: "fade-up 0.6s ease-out forwards" }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs sm:text-sm text-muted-foreground">New beats dropping weekly</span>
          </div>

          {/* Heading */}
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            style={{ animation: "fade-up 0.6s ease-out 0.1s forwards", opacity: 0 }}
          >
            <span className="text-foreground">Where Sound</span>
            <br />
            <span className="text-gradient-red">Meets Vision</span>
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
            style={{ animation: "fade-up 0.6s ease-out 0.2s forwards", opacity: 0 }}
          >
            Discover premium beats crafted for artists who demand excellence.
            From hard-hitting trap to cinematic scores.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex items-center gap-3 sm:gap-4 flex-wrap"
            style={{ animation: "fade-up 0.6s ease-out 0.3s forwards", opacity: 0 }}
          >
            <Link to="/beats">
              <Button variant="hero" size="lg">
                Browse Beats
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="hero-outline" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Start Creating
            </Button>
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-6 sm:gap-10 lg:gap-12 pt-4 sm:pt-8"
            style={{ animation: "fade-up 0.6s ease-out 0.4s forwards", opacity: 0 }}
          >
            <div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">500+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Premium Beats</div>
            </div>
            <div className="w-px h-10 sm:h-12 bg-border" />
            <div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">10K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Artists</div>
            </div>
            <div className="w-px h-10 sm:h-12 bg-border" />
            <div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">24/7</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>

        {/* Floating Waveform Panel — desktop/laptop only */}
        <div
          className="hidden lg:block absolute right-12 bottom-32 glass-panel p-6 w-72 xl:w-80"
          style={{ animation: "slide-in-left 0.8s ease-out 0.5s forwards", opacity: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Now Playing</div>
              <div className="font-semibold text-foreground">Midnight Drive</div>
            </div>
            <Button variant="icon" size="icon" className="rounded-full bg-primary text-primary-foreground">
              <Play className="w-4 h-4" />
            </Button>
          </div>
          <WaveformAnimation isPlaying={true} barCount={24} />
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>1:24</span>
            <span>3:45</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
