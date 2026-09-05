"use client";

import { RESULTS_STATS } from "@/src/constants/landing.constants";
import { easeInOut, motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  Boxes,
  Braces,
  Database,
  FileCode2,
  Globe,
  Layout,
  MessageSquare,
  Puzzle,
  ShoppingBag,
  Terminal,
  Zap,
} from "lucide-react";
import SectionHeader from "@/src/components/ui/SectionHeader";
import MainButton from "@/src/components/ui/Button";

const PLATFORMS = [
  { icon: Globe, label: "Any Website" },
  { icon: Boxes, label: "WordPress" },
  { icon: ShoppingBag, label: "Shopify" },
  { icon: Layout, label: "Webflow" },
  { icon: Braces, label: "React" },
  { icon: Terminal, label: "Next.js" },
  { icon: FileCode2, label: "HTML" },
  { icon: Database, label: "CMS" },
  { icon: Puzzle, label: "Custom Stack" },
];


export default function Results() {
  return (
    <section className="relative w-full min-h-screen pt-24 md:pt-[22vh]">
      <main className="relative max-w-345 mx-auto flex flex-col items-center px-5">
   
        <SectionHeader 
          tag="results"  
          headline="See the impact instantly"
          description="Fewer support tickets, faster answers, and an assistant that stays accurate to your website."
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
                    Answers, not guesswork
                  </h3>
                  <p className="text-sm text-(--secondary-color)">
                    Your assistant answers using real content from your site,
                    accurate, current, and consistent every time.
                  </p>
                  <p className="italic text-xs text-(--tertiary-color)">
                    No manual training. No prompt engineering.
                  </p>
                </div>
                <a href=""><MainButton content="Get Started" isDark={true}/></a>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="bg-(--primary-color) flex flex-col">
            <div className="flex flex-wrap items-center gap-4 p-5 md:p-6 border-b border-(--border-color)">
             
             <img src="/image.webp" alt="" width={40} height={36} loading="lazy" />

              <div className="min-w-0 flex-1 basis-40">
                <h3 className="text-lg md:text-xl font-medium truncate">Ready to deploy</h3>
                <p className="italic text-xs text-(--tertiary-color)">
                  Preview responses, then embed your assistant anywhere with
                  one script.
                </p>
              </div>

              <div className="flex items-center gap-1 bg-(--primary-color) border-2 border-(--border-color) rounded px-2 py-1 shrink-0">
                <Globe size={16} className="p-1 box-content shrink-0" />
                <Database size={16} className="p-1 box-content shrink-0" />
                <MessageSquare size={16} className="p-1 box-content shrink-0" />
                <Zap size={16} className="p-1 box-content shrink-0" />
              </div>
            </div>

            <div className="min-w-0 grid grid-cols-1 md:grid-cols-2">
              {RESULTS_STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`min-w-0 p-5 md:p-6 border-b border-(--border-color) flex flex-col justify-between gap-6 md:gap-10 ${
                    i === 0 ? "md:border-r" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-light uppercase tracking-tight">
                      {stat.label}
                    </p>
                    <p className="text-4xl md:text-[46px] font-medium tracking-tight">
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

            <div className="min-w-0 p-5 md:p-6 flex flex-col gap-5">
              <div>
                <h3 className="text-lg md:text-xl font-medium">
                  Works with any website
                </h3>
                <p className="italic text-xs text-(--tertiary-color)">
                  WordPress, Shopify, Webflow, or custom-built, plug in anywhere.
                </p>
              </div>

              <Marquee gradient gradientColor="var(--primary-color)" speed={20}>
                {PLATFORMS.map((platform, i) => {
                  const Icon = platform.icon;
                  return (
                    <div
                      key={i}
                      className="mx-1.5 md:mx-2 w-14 h-14 md:w-16 md:h-16 shrink-0 flex items-center justify-center rounded bg-white border border-(--border-color)"
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
