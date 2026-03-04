import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const genres = [
  { name: "Trap", count: 124, gradient: "from-primary/60 to-primary/20" },
  { name: "Hip-Hop", count: 89, gradient: "from-foreground/30 to-foreground/10" },
  { name: "Drill", count: 67, gradient: "from-primary/40 to-secondary" },
  { name: "Lo-Fi", count: 45, gradient: "from-secondary to-background" },
  { name: "R&B", count: 78, gradient: "from-primary/30 to-primary/5" },
  { name: "Cinematic", count: 34, gradient: "from-foreground/20 to-background" },
];

const GenreShowcase = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Explore
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Browse by Genre
          </h2>
          <p className="text-foreground-muted mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Find the perfect sound for your next project. From hard-hitting trap to smooth R&B.
          </p>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {genres.map((genre, index) => (
            <Link
              key={genre.name}
              to={`/genres?genre=${genre.name.toLowerCase()}`}
              className="group relative aspect-[2/1] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
              style={{
                animation: `fade-up 0.6s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${genre.gradient}`} />

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-3 sm:p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base sm:text-2xl font-bold text-foreground">
                    {genre.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-muted mt-0.5 sm:mt-1">
                    {genre.count} beats
                  </p>
                </div>
                <div className="flex items-center text-foreground-muted group-hover:text-primary transition-colors">
                  <span className="text-xs sm:text-sm font-medium">Explore</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Border */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-border group-hover:border-primary/30 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreShowcase;
