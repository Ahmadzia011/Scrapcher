"use client";

import { RESULTS_STATS } from "@/src/constants/landing.constants";
import { easeInOut, motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  AtSign,
  Bold,
  Briefcase,
  Camera,
  Eraser,
  Gamepad2,
  Italic,
  Mail,
  Music2,
  Play,
  Share2,
  ThumbsUp,
  X,
} from "lucide-react";
import SectionHeader from "@/src/components/ui/SectionHeader";
import MainButton from "@/src/components/ui/Button";

const PLATFORMS = [
  { icon: Mail, label: "Gmail" },
  { icon: X, label: "X" },
  { icon: Camera, label: "Instagram" },
  { icon: Music2, label: "TikTok" },
  { icon: ThumbsUp, label: "Facebook" },
  { icon: Play, label: "YouTube" },
  { icon: Gamepad2, label: "Discord" },
  { icon: AtSign, label: "Threads" },
  { icon: Briefcase, label: "LinkedIn" },
];


export default function Results() {
  return (
    <section className="relative w-full min-h-screen pt-24 md:pt-[22vh]">
      <main className="relative max-w-345 mx-auto flex flex-col items-center px-5">
   
        <SectionHeader 
          tag="results"  
          headline="See the impact instantly"
          description="Create content faster, stay consistent across every channel, and achieve better results with less effort."
          large={false}
        />

        <motion.div
          viewport={{ once: true }}
          initial={{ translateY: 20, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeInOut }}
          className="w-full mt-18 grid grid-cols-1 md:grid-cols-[36%_64%] bg-(--dark-bg) border border-(--border-color) overflow-hidden"
        >
          {/* Left card */}
          <div className="p-3 border-b md:border-b-0 md:border-r border-(--border-color)">
            <div className="h-full bg-white rounded-xl p-6 border border-(--border-color) shadow-sm flex flex-col justify-between">
              <span className="font-bold text-sm uppercase tracking-tight">
                Scrapcher
              </span> 
              <div className="space-y-8 w-full">
                <div className="space-y-3 ">
                  <h3 className="text-2xl font-medium leading-tight">
                    Stay in the flow
                  </h3>
                  <p className="text-sm text-(--secondary-color)">
                    Keep momentum while writing. Generate, improve, and expand
                    ideas without breaking your creative process.
                  </p>
                  <p className="italic text-xs text-(--tertiary-color)">
                    No more switching between tools and tabs.
                  </p>
                </div>
                <a href=""><MainButton content="Start Writing" isDark={true}/></a>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="bg-(--primary-color) flex flex-col">
            <div className="flex flex-wrap items-center gap-4 p-5 sm:p-6 border-b border-(--border-color)">
             
             <img src={'image.png'} className=""/>

              <div className="min-w-0 flex-1 basis-40">
                <h3 className="text-lg sm:text-xl font-medium truncate">Ready to Publish</h3>
                <p className="italic text-xs text-(--tertiary-color)">
                  Review, edit, regenerate, and export your content wherever
                  you need it.
                </p>
              </div>

              <div className="flex items-center gap-1 bg-(--primary-color) border-2 border-(--border-color) rounded px-2 py-1 shrink-0">
                <Bold size={16} className="p-1 box-content shrink-0" />
                <Share2 size={16} className="p-1 box-content shrink-0" />
                <Italic size={16} className="p-1 box-content shrink-0" />
                <Eraser size={16} className="p-1 box-content shrink-0" />
              </div>
            </div>

            <div className="min-w-0 grid grid-cols-1 sm:grid-cols-2">
              {RESULTS_STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`min-w-0 p-5 sm:p-6 border-b border-(--border-color) flex flex-col justify-between gap-6 sm:gap-10 ${
                    i === 0 ? "sm:border-r" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-light uppercase tracking-tight">
                      {stat.label}
                    </p>
                    <p className="text-4xl sm:text-[46px] font-medium tracking-tight">
                      {stat.value}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-(--border-color)">
                    <p className="text-sm text-(--secondary-color)">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="min-w-0 p-5 sm:p-6 flex flex-col gap-5">
              <div>
                <h3 className="text-lg sm:text-xl font-medium">
                  Content that fits anywhere
                </h3>
                <p className="italic text-xs text-(--tertiary-color)">
                  From social posts to long-form content.
                </p>
              </div>

              <Marquee gradient gradientColor="var(--primary-color)" speed={20}>
                {PLATFORMS.map((platform, i) => {
                  const Icon = platform.icon;
                  return (
                    <div
                      key={i}
                      className="mx-1.5 sm:mx-2 w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center rounded bg-white border border-(--border-color)"
                    >
                      <Icon size={24} className="text-(--secondary-color)" />
                    </div>
                  );
                })}
              </Marquee>
            </div>
          </div>
        </motion.div>
      </main>
    </section>
  );
}
