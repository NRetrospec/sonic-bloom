import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface FilterState {
  search: string;
  genre: string;
  bpm: [number, number];
  mood: string;
  priceRange: [number, number];
  licenseType: string;
}

interface FiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

const genres = [
  "All Genres",
  "Trap",
  "Hip-Hop",
  "Drill",
  "Lo-Fi",
  "R&B",
  "Cinematic",
  "Pop",
  "Afrobeats",
];

const moods = [
  "All Moods",
  "Dark",
  "Energetic",
  "Chill",
  "Emotional",
  "Aggressive",
  "Melodic",
  "Uplifting",
];

const licenseTypes = ["All Licenses", "Basic", "Premium", "Unlimited", "Exclusive"];

const BeatFilters = ({ onFilterChange }: FiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [mood, setMood] = useState("All Moods");
  const [bpm, setBpm] = useState<[number, number]>([60, 180]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [licenseType, setLicenseType] = useState("All Licenses");

  // Notify parent whenever any filter changes
  useEffect(() => {
    onFilterChange?.({ search, genre, bpm, mood, priceRange, licenseType });
  }, [search, genre, bpm, mood, priceRange, licenseType]);

  const activeFiltersCount = [
    genre !== "All Genres",
    mood !== "All Moods",
    licenseType !== "All Licenses",
    bpm[0] !== 60 || bpm[1] !== 180,
    priceRange[0] !== 0 || priceRange[1] !== 500,
    search !== "",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setGenre("All Genres");
    setMood("All Moods");
    setLicenseType("All Licenses");
    setBpm([60, 180]);
    setPriceRange([0, 500]);
    setSearch("");
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-subtle" />
          <Input
            placeholder="Search beats, producers, genres..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 bg-secondary/50 border-border-subtle focus:border-primary"
          />
        </div>
        <Button
          variant={isExpanded ? "default" : "outline"}
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-12 px-6"
        >
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="genre" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-foreground-muted">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="glass-panel p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Filters</h3>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Clear all
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Genre */}
            <div className="space-y-2">
              <label className="text-sm text-foreground-muted">Genre</label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger className="h-11 bg-secondary/50 border-border-subtle">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mood */}
            <div className="space-y-2">
              <label className="text-sm text-foreground-muted">Mood</label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger className="h-11 bg-secondary/50 border-border-subtle">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {moods.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* License Type */}
            <div className="space-y-2">
              <label className="text-sm text-foreground-muted">License</label>
              <Select value={licenseType} onValueChange={setLicenseType}>
                <SelectTrigger className="h-11 bg-secondary/50 border-border-subtle">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {licenseTypes.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* BPM Range */}
            <div className="space-y-2">
              <label className="text-sm text-foreground-muted">
                BPM: {bpm[0]} – {bpm[1]}
              </label>
              <div className="pt-2">
                <Slider
                  value={bpm}
                  onValueChange={(value) => setBpm(value as [number, number])}
                  min={60}
                  max={180}
                  step={5}
                />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm text-foreground-muted">
              Price: ${priceRange[0]} – ${priceRange[1]}
            </label>
            <div className="max-w-xs">
              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                min={0}
                max={500}
                step={5}
              />
            </div>
          </div>

          {/* Quick Genre Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {genres.slice(1).map((g) => (
              <Badge
                key={g}
                variant={genre === g ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-colors",
                  genre === g && "bg-primary"
                )}
                onClick={() => setGenre(genre === g ? "All Genres" : g)}
              >
                {g}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BeatFilters;
