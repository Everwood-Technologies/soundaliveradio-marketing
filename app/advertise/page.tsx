import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { AdvertiseInquiryForm } from "@/components/advertise/AdvertiseInquiryForm";

export const metadata: Metadata = {
  title: "Advertise With Us",
  description:
    "Submit an advertising inquiry to promote your company on Sound Alive Radio.",
};

export default function AdvertisePage() {
  return (
    <Section className="border-b border-white/5 bg-surface/50">
      <div className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          Advertising Inquiries
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-headline sm:text-5xl">
          Advertise on Sound Alive Radio
        </h1>
        <p className="text-base text-muted">
          Reach our global listener community with sponsored placements and campaign partnerships.
          Share your campaign details below and we will contact you with next steps.
        </p>
      </div>

      <AdvertiseInquiryForm />
    </Section>
  );
}
