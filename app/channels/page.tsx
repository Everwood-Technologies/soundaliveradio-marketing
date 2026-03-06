"use client";

import { useState } from "react";
import { ChannelsHero } from "@/components/channels/ChannelsHero";
import { ChannelFilters } from "@/components/channels/ChannelFilters";
import { ChannelGrid } from "@/components/channels/ChannelGrid";
import { Section } from "@/components/ui/Section";

export default function ChannelsPage() {
  const [genre, setGenre] = useState("All");

  return (
    <>
      <ChannelsHero />
      <Section>
        <ChannelFilters genre={genre} onFilter={setGenre} />
        <ChannelGrid genre={genre} />
      </Section>
    </>
  );
}
