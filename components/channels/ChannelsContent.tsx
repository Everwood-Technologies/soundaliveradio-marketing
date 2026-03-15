"use client";

import { useState } from "react";
import { ChannelFilters } from "@/components/channels/ChannelFilters";
import { ChannelGrid } from "@/components/channels/ChannelGrid";
import { Section } from "@/components/ui/Section";

export function ChannelsContent() {
  const [genre, setGenre] = useState("All");

  return (
    <Section>
      <ChannelFilters genre={genre} onFilter={setGenre} />
      <ChannelGrid genre={genre} />
    </Section>
  );
}
