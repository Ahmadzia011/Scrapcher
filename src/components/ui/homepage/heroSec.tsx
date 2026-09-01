"use client";

import SectionHeader from "@/src/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen justify-center overflow-hidden px-5 pt-50">
      <img
        src="/cloud_bg.webp"
        className="pointer-events-none absolute h-screen w-full object-cover opacity-55 mask-[linear-gradient(to_bottom,transparent_0%,black_60%,transparent_70%)]"
        alt=""
      />

      {/* Background Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[1.36]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.4) 1px, transparent 1px)
          `,
          backgroundSize: "101px 88px",
        }}
      />

      {/* Grid Plus Crosshairs */}
      <div className="pointer-events-none absolute top-28 left-[20%] text-(--tertiary-color) opacity-70">
        <Plus className="h-4 w-4 stroke-[1.5]" />
      </div>

      <div className="pointer-events-none absolute top-28 right-[20%] text-(--tertiary-color) opacity-70">
        <Plus className="h-4 w-4 stroke-[1.5]" />
      </div>

      {/* Hero Content */}
      <main className="relative z-10 flex max-w-6xl flex-col items-center text-center">
        <SectionHeader
          tag="AI Website Assistant"
          headline="Turn your website into an AI assistant."
          description="Scrape your website, test your AI assistant, and embed it on your website in minutes. No complex setup. Just one simple workflow."
          button_1="Get Started"
          button_2="View Demo"
          large={true}
        />

        <div className="relative mt-22 rounded-lg border border-(--primary-color) bg-(--primary-color)/50 px-25 justify-items-center perspective-[1000px]">
          <img
            src="/herosection_1.png"
            alt="Scrapcher dashboard"
            className="absolute -top-10 rounded-2xl border-7 border-(--primary-color)/50"
          />

          <motion.img
            src="/herosection_2.avif"
            alt="Scrapcher assistant preview"
            initial={{ rotateX: "30deg" }}
            animate={{ rotateX: "0deg" }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="min-w-full pt-8"
          />
        </div>
      </main>
    </section>
  );
}