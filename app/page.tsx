import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { TheProblem } from "@/components/home/TheProblem";
import { TheSolution } from "@/components/home/TheSolution";
import { ProductOverview } from "@/components/home/ProductOverview";
import { FeaturedChannels } from "@/components/home/FeaturedChannels";
import { ArtistSpotlightCarousel } from "@/components/home/ArtistSpotlightCarousel";
import { WhySoundAlive } from "@/components/home/WhySoundAlive";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <TheProblem />
      <TheSolution />
      <ProductOverview />
      <FeaturedChannels />
      <ArtistSpotlightCarousel />
      <WhySoundAlive />
    </>
  );
}
