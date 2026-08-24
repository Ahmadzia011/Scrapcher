"use client";
import SectionHeader from "@/src/components/ui/SectionHeader";
import { FEATURES } from "@/src/constants/landing.constants";
import { easeInOut, motion } from "framer-motion";

export default function Features() {
  return (
    <section className="relative w-full min-h-screen pt-[22vh]">
      <main className=" relative max-w-345 mx-auto text-center flex flex-col justify-center items-center px-5 md:px-2">
        
        <SectionHeader
          tag="features"
          headline="Everything you need to create better content"
          description="Create, refine, and scale content - faster and without starting from scratch."
          large={false}
          />
          
          
        <div className="flex flex-col md:flex-row mt-18 text-start">
          {FEATURES.map((feature, i) => {
            return (
              <motion.div
                key={i}
                viewport={{
                  once: true,
                }}
                initial={{
                  translateY: 20 * (i + 1),
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
                className="bg-[#f6f6f6] p-2 border-2 border-b-zinc-100 md:not-last:border-r-0 border-(--border-color)"
              >
                <div className="w-full bg-white rounded-xl p-5 border border-(--border-color) space-y-3 shadow-sm">
                  <img src={feature.image} className="h-10" />

                  <h3 className="pt-10 md:pt-17 text-2xl font-medium leading-7">
                    {feature.heading}
                  </h3>
                  <p className="text-[15px] font-normal text-(--secondary-color)">
                    {feature.description}
                  </p>
                  <p className="italic text-xs text-(--tertiary-color)">
                    Fix and refine in one click.
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </section>
  );
}
