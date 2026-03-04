import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Beat } from "@/lib/mockData";

interface FavoritesContextValue {
  favorites: Beat[];
  addFavorite: (beat: Beat) => void;
  removeFavorite: (beatId: string) => void;
  toggleFavorite: (beat: Beat) => void;
  isFavorite: (beatId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Beat[]>(() => {
    try {
      const saved = localStorage.getItem("beatvault-favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("beatvault-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (beat: Beat) => {
    setFavorites((prev) => (prev.some((b) => b.id === beat.id) ? prev : [...prev, beat]));
  };

  const removeFavorite = (beatId: string) => {
    setFavorites((prev) => prev.filter((b) => b.id !== beatId));
  };

  const toggleFavorite = (beat: Beat) => {
    if (favorites.some((b) => b.id === beat.id)) {
      removeFavorite(beat.id);
    } else {
      addFavorite(beat);
    }
  };

  const isFavorite = (beatId: string) => favorites.some((b) => b.id === beatId);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
