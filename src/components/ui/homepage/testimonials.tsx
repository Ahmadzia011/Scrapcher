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
        <p className="text-xs md:text-sm text-(--tertiary-color) tracking-tight mb-2">
          [  ]
        </p>

        <h1 className="text-4xl sm:text-4xl md:text-[48px] font-semibold tracking-tighter leading-[1.1] max-w-3xl text-center">
          
        </h1>

        <p className="mt-4 text-(--secondary-color) text-base max-w-xl font-normal tracking-tight text-center">
          
        </p>

        <SectionHeader
          tag="testimonials"
          headline="Loved by teams that create content every day"
          description="From marketers and founders to agencies and growing teams Verseo helps
                        people create better content faster, without sacrificing quality or
                        consistency."
          large={false}
        />

        <div className="mt-10 md:mt-16 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
              className={`flex sm:last:col-span-2 lg:last:col-span-1 border border-(--border-color) ${
                isPrimary ? "bg-(--dark-bg) p-3" : ""
              }`}
            >
              <div
                className={`w-full text-start p-5 sm:p-6 rounded-xl flex flex-col justify-between gap-9 ${
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
                  <p className="text-[15px] sm:text-base text-(--secondary-color) font-normal leading-relaxed tracking-tight">
                    {testimonial.quote}
                  </p>
                </div>

                {/* AUTHOR INFO */}
                <div className=" flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded border border-(--border-color)"
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
