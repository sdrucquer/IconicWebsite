"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TestimonialCard } from "@/components/TestimonialCard";

const testimonials = [
  {
    name: "Chris Saitta",
    quote:
      "After following this team's work on social media, we reached out for help with a front garden that had been overtaken by weeds for years. During the consultation they were professional and thorough, and the finished result looked incredible."
  },
  {
    name: "Karen Michaels",
    quote:
      "All are HS and college kids who work very hard and kept me well informed the entire time. They do a great job and were very reasonable."
  },
  {
    name: "Susan Smith",
    quote:
      "Highly recommend. Very professional and communication was great. They did an awesome job creating a new flower bed and mulching all existing beds."
  }
];

export function HomeTestimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[index].name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <TestimonialCard name={testimonials[index].name} quote={testimonials[index].quote} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((testimonial, dotIndex) => (
          <button
            key={testimonial.name}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show testimonial from ${testimonial.name}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              dotIndex === index ? "bg-brand-primary" : "bg-brand-primary/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
