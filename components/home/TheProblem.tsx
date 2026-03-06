"use client";

import { motion } from "framer-motion";
import { THE_PROBLEM } from "@/lib/constants";
import { Section } from "@/components/ui/Section";

export function TheProblem() {
  return (
    <Section className="bg-surface/50">
      <h2 className="text-3xl font-bold text-headline mb-4">
        {THE_PROBLEM.title}
      </h2>
      <p className="text-muted max-w-3xl mb-10">
        {THE_PROBLEM.intro}
      </p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        {THE_PROBLEM.points.map(({ title, description }) => (
          <div
            key={title}
            className="p-6 rounded-2xl border border-border bg-surface hover:border-white/15 transition-colors"
          >
            <h3 className="text-lg font-semibold text-headline mb-2">
              {title}
            </h3>
            <p className="text-muted text-sm">{description}</p>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
