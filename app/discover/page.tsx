import { DiscoverHero } from "@/components/discover/DiscoverHero";
import { DiscoverContent } from "@/components/discover/DiscoverContent";
import { SubmitMusicCTA } from "@/components/discover/SubmitMusicCTA";

export default function DiscoverPage() {
  return (
    <>
      <DiscoverHero />
      <DiscoverContent />
      <SubmitMusicCTA />
    </>
  );
}
