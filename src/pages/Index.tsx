import HeroSection from "@/components/home/HeroSection";
import VerticalNav from "@/components/layout/VerticalNav";
import FeaturedBeats from "@/components/home/FeaturedBeats";
import GenreShowcase from "@/components/home/GenreShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <VerticalNav />
      
      <main className="ml-64">
        <HeroSection />
        <FeaturedBeats />
        <GenreShowcase />
      </main>
    </div>
  );
};

export default Index;
