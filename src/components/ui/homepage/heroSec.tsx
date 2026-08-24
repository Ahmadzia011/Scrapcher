"use client";

import SectionHeader from "@/src/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Marquee from 'react-fast-marquee'

export default function HeroSection() {
  return (

      <section className="relative min-h-screen overflow-hidden flex justify-center px-5 pt-50">
        <img
          className="pointer-events-none absolute h-screen w-full object-cover opacity-55   mask-[linear-gradient(to_bottom,transparent_0%,black_60%,transparent_70%)]"
          src={"/cloud_bg.png"}
        ></img>
        
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[1.36]"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
            backgroundSize: "101px 88px",
          }}
        />

        {/* Grid Plus Crosshairs */}
        <div className="absolute top-28 left-[20%] text-(--tertiary-color) opacity-70 pointer-events-none">
          <Plus className="w-4 h-4 stroke-[1.5]" />
        </div>
        <div className="absolute top-28 right-[20%] text-(--tertiary-color) opacity-70 pointer-events-none">
          <Plus className="w-4 h-4 stroke-[1.5]" />
        </div>


        {/* Hero Content */}
        <main className="relative z-10 max-w-6xl text-center flex flex-col items-center">

          <SectionHeader 
            tag="AI writing tool"
            headline="Write better content Faster. With AI"
            description="Scrapcher helps teams, founders, and marketers generate high-quality content in seconds — without overthinking every word"
            button_1="Get Started"
            button_2="Try Demo"
            large={true}
          />

          <div className="relative mt-22 border border-(--primary-color) bg-(--primary-color)/50 rounded-lg justify-items-center px-25 perspective-[1000px]">
            <img
              src={"herosection_1.png"}
              className="absolute -top-10 rounded-2xl border-7 border-(--primary-color)/50">
            </img>

            <motion.img 
              initial={{rotateX : "30deg"}}
              animate={{rotateX:"0deg"}}
              transition={{ duration: 0.5, delay: 0.2 }}
              src={"herosection_2.avif"} 
              className="min-w-full pt-8">
            </motion.img>
          </div>
      
        </main>
      </section>
    
  );
}
