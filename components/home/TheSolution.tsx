"use client";

import { motion } from "framer-motion";
import { THE_SOLUTION } from "@/lib/constants";
import { Section } from "@/components/ui/Section";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function TheSolution() {
  return (
    <Section>
      <h2 className="text-3xl font-bold text-headline mb-4">
        {THE_SOLUTION.title}
      </h2>
      <p className="text-muted max-w-3xl mb-10">
        {THE_SOLUTION.intro}
      </p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {THE_SOLUTION.points.map(({ title, description }) => (
          <motion.div
            key={title}
            variants={item}
            className="p-6 rounded-2xl border border-primary/20 bg-primary/5 hover:border-primary/30 transition-colors"
          >
            <h3 className="text-lg font-semibold text-headline mb-2">
              {title}
            </h3>
            <p className="text-muted text-sm">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
