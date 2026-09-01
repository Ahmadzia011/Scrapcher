"use client";
import SectionHeader from "@/src/components/ui/SectionHeader";
import { HOW_IT_WORKS_STEPS } from "@/src/constants/landing.constants";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null)

  const {scrollYProgress} = useScroll({
    target:containerRef,
    offset: ['start start','end end']
  })
  const smoothProgress = useSpring(scrollYProgress,{
    stiffness:100,
    restDelta: 0.01
  })
  // Calculate and update the active step based on scroll position
    useMotionValueEvent(smoothProgress, "change", (latest) => {
      const stepCount = HOW_IT_WORKS_STEPS.length;
      if (stepCount === 0) return;

      const newIndex = Math.min(
        Math.floor(latest * stepCount),
        stepCount - 1
      );

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });


  const activeStep = HOW_IT_WORKS_STEPS[activeIndex] || HOW_IT_WORKS_STEPS[0];  
  return (
    <section  ref={containerRef} className="relative w-full min-h-[300vh] pt-24 md:pt-[22vh]">
      <img
        className="pointer-events-none absolute h-full w-full object-cover opacity-55 mask-[linear-gradient(to_bottom,transparent_0%,black_55%,transparent_100%)]"
        src={"/cloud_bg.webp"}
      ></img>
      <div className="relative">
        <div className="max-w-345 mx-auto text-center flex flex-col justify-center items-center px-5 md:px-8">
          <SectionHeader 
            tag="how it works"
            headline="From website to AI assistant, step by step."
            description="No complex setup or manual training - just add your URL, and Scrapcher does the rest."
            large={false}
            />

        </div>
      </div>

      <motion.div
       className="sticky top-24 md:top-40 overflow-hidden p-4 md:p-6">
        <div className="mx-auto flex w-full max-w-340 flex-col gap-4 md:flex-row md:items-start md:gap-0">

          {/* Cards Left column */}
          <div className="flex w-full flex-col gap-4 md:w-[489.59px] md:shrink-0 md:gap-0 ">
            {HOW_IT_WORKS_STEPS.map((s, i) => {
              const active = i == activeIndex;
              return (
                <div key={s.step} className="w-full shrink-0 md:p-2.5 border border-(--border-color) not-last:border-b-0 border-r-0 ">
                  <div
                    className={
                      "flex min-h-40 flex-col gap-6 rounded-xl border border-(--border-color) p-5 md:p-6 md:h-47.25 md:gap-7.5  " +
                      (active
                        ? "bg-white shadow-lg"
                        : "")
                    }
                  >
                    <span
                      className={
                        "w-fit rounded px-2.5 py-1 text-xs font-medium uppercase tracking-tight " +
                        (active
                          ? "border-(--border-color) bg-(--secondary-color) text-white"
                          : "border-(--border-color) bg-white/50 text-(--tertiary-color)")
                      }
                    >
                      {s.step}
                    </span>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl md:text-2xl font-medium tracking-tight text-(--secondary-color)">
                        {s.heading}
                      </h3>
                      <p className="text-[15px] leading-tight text-(--secondary-color)">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column */}
          <div className="flex w-full flex-col border border-(--border-color) md:w-218 md:shrink-0">
            <div className="flex h-10 shrink-0 items-center justify-center border-b border-(--border-color) px-2 md:h-[38.41px]">
              <p className="text-center text-xs italic text-[#333637]">
                {activeStep.tagline}
              </p>
            </div>

            <div className="flex h-65 shrink-0 md:h-[590.98px]">
              {/* left narrow column */}
              <div className="hidden shrink-0 flex-col  md:flex md:w-[130.55px]">
                <div className="h-23.5 shrink-0 p-2.5 border-b border border-(--border-color)">
                  <div className="h-full rounded-xl border border-(--border-color)" />
                </div>
                <div className="min-h-0 flex-1 p-2.5 )">
                  <div className="h-full rounded-xl border border-(--border-color)" />
                </div>
                <div className="h-58 shrink-0 p-2.5 ">
                  <div className="h-full rounded-xl border border-(--border-color)" />
                </div>
              </div>

              {/* middle column with preview image */}
              <div className="flex w-full shrink-0 flex-col border-(--border-color) md:w-[609.31px] md:border-r">
                <div className="hidden h-29.5 shrink-0 p-2.5 md:block">
                  <div className="h-full rounded-xl border border-(--border-color)" />
                </div>
                <div className="min-h-0 flex-1 bg-white/20 p-2.5">
                  <div className="h-full w-full overflow-hidden rounded-xl border border-(--border-color)">
                   <AnimatePresence mode="wait">
                      <motion.img
                        key={activeIndex}
                        src={
                          `/Step_${activeIndex + 1}.png`
                        }
                        alt={activeStep?.heading || "Step preview"}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="h-full w-full object-contain"
                      />
                    </AnimatePresence>
                  </div>
                </div>
                <div className="hidden h-29.5 shrink-0 p-2.5 md:block">
                  <div className="h-full rounded-xl " />
                </div>
              </div>

              {/* right narrow column */}
              <div className="hidden shrink-0 flex-col md:flex md:w-[130.55px]">
                <div className="h-23.5 shrink-0 p-2.5 border-b not-last:border border-(--border-color)">
                  <div className="h-full rounded-xl border border-(--border-color)" />
                </div>
                <div className="min-h-0 flex-1 p-2.5 border-b border border-(--border-color)">
                  <div className="h-full rounded-xl border border-(--border-color)" />
                </div>
                <div className="h-58 shrink-0 p-2.5">
                  <div className="h-full rounded-xl border border-(--border-color)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
