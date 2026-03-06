"use client";

import { motion } from "framer-motion";
import { WHY_SOUND_ALIVE } from "@/lib/constants";
import { Section } from "@/components/ui/Section";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function WhySoundAlive() {
  return (
    <Section className="bg-surface/30">
      <h2 className="text-3xl font-bold text-headline mb-2">
        Why Sound Alive Radio
      </h2>
      <p className="text-muted mb-12 max-w-2xl">
        The first fully decentralized radio network. No gatekeepers. No middlemen.
      </p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {WHY_SOUND_ALIVE.map(({ title, description }) => (
          <motion.div
            key={title}
            variants={item}
            className="p-6 rounded-2xl border border-border bg-surface hover:border-white/15 transition-colors"
          >
            <h3 className="text-lg font-semibold text-headline mb-2">
              {title}
            </h3>
            <p className="text-muted">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
