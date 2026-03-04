import HeroSection from "@/components/home/HeroSection";
import FeaturedBeats from "@/components/home/FeaturedBeats";
import GenreShowcase from "@/components/home/GenreShowcase";
import PageLayout from "@/components/layout/PageLayout";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <FeaturedBeats />
      <GenreShowcase />
    </PageLayout>
  );
};

export default Index;
