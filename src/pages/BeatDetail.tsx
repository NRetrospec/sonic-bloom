import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Play, Pause, Heart, ShoppingCart, ArrowLeft, Check,
  Music, Clock, Zap, Tag, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import WaveformAnimation from "@/components/ui/WaveformAnimation";
import { mockBeats, licenseOptions } from "@/lib/mockData";
import { usePlayer } from "@/context/PlayerContext";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

const BeatDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const beat = mockBeats.find((b) => b.id === id);

  const { playBeat, isCurrentBeat, isPlaying } = usePlayer();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedLicense, setSelectedLicense] = useState("premium");
  const [addedToCart, setAddedToCart] = useState(false);

  if (!beat) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-display text-2xl text-foreground mb-4">Beat not found</h1>
            <Link to="/beats"><Button variant="hero">Back to Beats</Button></Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const isCurrentlyPlaying = isPlaying && isCurrentBeat(beat.id);
  const liked = isFavorite(beat.id);
  const inCart = isInCart(beat.id);

  const selectedLicenseData = licenseOptions.find((l) => l.id === selectedLicense);
  const finalPrice = selectedLicenseData
    ? beat.price * (selectedLicenseData.priceMultiplier ?? 1)
    : beat.price;

  const handleAddToCart = () => {
    addToCart(beat, selectedLicenseData?.name ?? "Premium", finalPrice);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const related = mockBeats.filter((b) => b.genre === beat.genre && b.id !== beat.id).slice(0, 4);

  return (
    <PageLayout>
      {/* Back Button */}
      <div className="px-4 sm:px-8 pt-4 sm:pt-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-foreground-muted mb-4 sm:mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="px-4 sm:px-8 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10">
          {/* Left: Cover & Controls */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Cover Art */}
            <div className="relative rounded-2xl overflow-hidden aspect-square max-w-sm mx-auto lg:max-w-none">
              {beat.coverUrl ? (
                <img src={beat.coverUrl} alt={beat.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/30 via-secondary to-background" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

              {beat.isExclusive && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0">
                  Exclusive
                </Badge>
              )}

              <button
                onClick={() => playBeat(beat, mockBeats)}
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-background/30 backdrop-blur-sm"
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  {isCurrentlyPlaying ? (
                    <Pause className="w-8 h-8 text-primary-foreground" />
                  ) : (
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  )}
                </div>
              </button>
            </div>

            {/* Waveform */}
            <div className="glass-panel p-4">
              <div className="flex items-center justify-between text-xs text-foreground-muted mb-3">
                <span>0:00</span>
                <span>{beat.duration}</span>
              </div>
              <WaveformAnimation isPlaying={isCurrentlyPlaying} barCount={40} height={48} />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Zap className="w-4 h-4" />, label: "BPM", value: beat.bpm },
                { icon: <Clock className="w-4 h-4" />, label: "Length", value: beat.duration },
                { icon: <Music className="w-4 h-4" />, label: "Plays", value: beat.plays > 999 ? `${(beat.plays / 1000).toFixed(1)}k` : beat.plays },
              ].map(({ icon, label, value }) => (
                <div key={label} className="glass-panel p-3 text-center">
                  <div className="flex items-center justify-center text-primary mb-1">{icon}</div>
                  <div className="font-display font-bold text-foreground text-sm">{value}</div>
                  <div className="text-xs text-foreground-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info & Purchase */}
          <div className="lg:col-span-3 space-y-5 sm:space-y-6">
            {/* Title & Actions */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl sm:text-4xl font-bold text-foreground">{beat.title}</h1>
                  <p className="text-foreground-muted mt-1">{beat.producer}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(beat)}
                    className={cn("w-10 h-10", liked && "text-primary")}
                  >
                    <Heart className={cn("w-5 h-5", liked && "fill-current")} />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-10 h-10 text-foreground-muted">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">{beat.genre}</Badge>
                <Badge variant="outline">{beat.mood}</Badge>
                {beat.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>

              <p className="text-foreground-muted mt-4 leading-relaxed">{beat.description}</p>
            </div>

            {/* License Selector */}
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Choose License
              </h2>
              <div className="space-y-3">
                {licenseOptions.map((license) => {
                  const price = beat.price * (license.priceMultiplier ?? 1);
                  const isSelected = selectedLicense === license.id;
                  return (
                    <button
                      key={license.id}
                      onClick={() => setSelectedLicense(license.id)}
                      className={cn(
                        "w-full glass-panel p-4 text-left transition-all duration-200",
                        isSelected
                          ? "border-primary/60 bg-primary/5"
                          : "hover:border-border hover:bg-secondary/30"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                            isSelected ? "border-primary bg-primary" : "border-border"
                          )}>
                            {isSelected && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground text-sm">{license.name}</div>
                            <div className="text-xs text-foreground-muted">{license.description}</div>
                          </div>
                        </div>
                        <div className="font-display font-bold text-foreground shrink-0">
                          ${price.toFixed(2)}
                        </div>
                      </div>
                      {isSelected && (
                        <ul className="mt-3 ml-7 grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {license.features.map((feat) => (
                            <li key={feat} className="text-xs text-foreground-muted flex items-center gap-1">
                              <Check className="w-3 h-3 text-primary shrink-0" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="hero"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={inCart}
              >
                {inCart || addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    {inCart ? "In Cart" : "Added!"}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    <span className="hidden sm:inline">Add to Cart — </span>${finalPrice.toFixed(2)}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => playBeat(beat, mockBeats)}
              >
                {isCurrentlyPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
            </div>

            {inCart && (
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="text-primary w-full">
                  View Cart →
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Related Beats */}
        {related.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">More {beat.genre} Beats</h2>
              <Link to={`/genres?genre=${beat.genre.toLowerCase()}`}>
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((b) => (
                <Link key={b.id} to={`/beats/${b.id}`} className="group">
                  <div className="rounded-xl overflow-hidden aspect-square relative mb-3">
                    {b.coverUrl ? (
                      <img src={b.coverUrl} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary" />
                    )}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors flex items-center justify-center">
                      <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">{b.title}</h3>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-foreground-muted">{b.bpm} BPM</span>
                    <span className="text-xs font-display font-bold text-foreground">${b.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default BeatDetailPage;
