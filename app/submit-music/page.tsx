import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SubmitMusicForm } from "@/components/submit-music/SubmitMusicForm";

export const metadata: Metadata = {
  title: "Submit Your Music",
  description:
    "Submit your music for Sound Alive Radio review. Send your artist profile, social links, and streaming links.",
};

export default function SubmitMusicPage() {
  return (
    <Section className="border-b border-white/5 bg-surface/50">
      <div className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          Artist Submission
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-headline sm:text-5xl">
          Submit Your Music
        </h1>
        <p className="text-base text-muted">
          Share your artist info and streaming links. Your submission will be sent to our A&R team
          at submissions@soundaliveradio.net.
        </p>
      </div>

      <SubmitMusicForm />
    </Section>
  );
}
