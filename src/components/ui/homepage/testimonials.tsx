"use client";

import SectionHeader from "@/src/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/src/constants/landing.constants";
import { motion, easeInOut } from "framer-motion";
import { Quote, Star } from "lucide-react";
import React from "react";

export default function Testimonials() {
  return (
    <section className="relative w-full min-h-screen pt-24 md:pt-[22vh]">
      <main className="relative max-w-345 mx-auto flex flex-col items-center px-5">

        <SectionHeader
          tag="testimonials"
          headline="Trusted by growing businesses."
          description="From SaaS products to agencies managing client sites, teams use Scrapcher
                        to turn their website into an AI assistant their visitors can actually
                        talk to."
          large={false}
        />

        <div className="mt-10 md:mt-16 w-full grid grid-cols-1 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => 
          {const isPrimary = i == 1
          return (
            <motion.div
              key={i}
              viewport={{
                once: true,
              }}
              initial={{
                translateY: 30 * (i + 1),
                opacity: 0,
              }}
              whileInView={{
                translateY: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: easeInOut,
              }}
              className={`flex border border-(--border-color) ${
                isPrimary ? "bg-(--dark-bg) p-3" : ""
              }`}
            >
              <div
                className={`w-full text-start p-5 md:p-6 rounded-xl flex flex-col justify-between gap-9 ${
                  isPrimary ? "bg-(--primary-color) shadow-lg" : ""
                }`}
              >
                {/* TOP ROW: QUOTE ICON & RATING */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    {/* Quote Mark Icon */}
                    <Quote
                      className="text-[#C3C4C4] fill-current"
                      size={24}
                    />

                    {/* Rating */}
                    <div className="flex items-center space-x-1.5 px-2.5 py-1 text-base text-[#C3C4C4] font-mono rounded">
                      <span className="font-medium text-(--tertiary-color)">
                        {testimonial.rating}
                      </span>
                      <Star
                        size={12}
                        className="fill-current text-(--secondary-color)"
                      />
                    </div>
                  </div>

                  {/* QUOTE TEXT */}
                  <p className="text-[15px] md:text-base text-(--secondary-color) font-normal leading-relaxed tracking-tight">
                    {testimonial.quote}
                  </p>
                </div>

                {/* AUTHOR INFO */}
                <div className=" flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={`Illustrated robot avatar for ${testimonial.author}`}
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 shrink-0 object-cover rounded border border-(--border-color)"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[15px] font-medium text-(--secondary-color) leading-snug">
                      {testimonial.author}
                    </span>
                    <span className="italic text-xs text-(--tertiary-color)">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </main>
    </section>
  );
}
