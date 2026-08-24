"use client";

import SectionHeader from "@/src/components/ui/SectionHeader";
import { PLANS } from "@/src/constants/landing.constants";
import { motion, easeInOut } from "framer-motion";
import { Minus } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section className="relative w-full min-h-screen py-[12vh] md:pt-[22vh] md:pb-0">
      <main className="relative max-w-345 mx-auto text-center flex flex-col justify-center items-center px-5">

        <SectionHeader 
          tag="pricing"
          headline="Choose the plan that grows with you"
          description=" Whether you’re creating content solo or collaborating with a team,
          there’s a plan designed for your workflow."
          large={false}
          />
        <div className="mt-10 md:mt-15 flex w-full max-w-67 sm:w-auto p-1 border-2 border-(--border-color)">
          <button
            onClick={() => setBilling("monthly")}
            className={`flex-1 sm:w-32 sm:flex-none h-10.5 rounded text-[15px] transition-all ${
              billing === "monthly"
                ? "bg-(--secondary-color) text-(--primary-color)"
                : "text-(--secondary-color)"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`flex-1 sm:w-32 sm:flex-none h-10.5 rounded text-[15px] transition-all ${
              billing === "annual"
                ? "bg-(--secondary-color) text-(--primary-color)"
                : "text-(--secondary-color)"
            }`}
          >
            Annual
          </button>
        </div>

        <div className="mt-10 md:mt-16 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
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
              className={` flex sm:last:col-span-2 lg:last:col-span-1 border border-(--border-color) ${plan.featured ? "bg-(--dark-bg) p-3" : ""}`}
            >
              <div
                className={`w-full text-start p-5 sm:p-6 rounded-xl flex flex-col gap-6  ${
                  plan.featured ? "bg-(--primary-color) shadow-lg" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <img src={'image.png'}></img>
                  {plan.featured && (
                    <span className="px-2.5 py-1.5 text-xs border border-(--border-color)">
                      Popular
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-[28px] font-medium leading-[1.2] tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="italic text-xs text-(--tertiary-color)">
                    {plan.tagline}
                  </p>
                </div>

                <p className="text-4xl sm:text-[44px] font-medium tracking-tight">
                  ${plan.monthly}
                </p>

                <button
                  className={`h-12 rounded text-[15px] cursor-pointer transition-opacity hover:opacity-90 ${
                    plan.featured
                      ? "bg-(--secondary-color) text-(--primary-color)"
                      : "border border-(--border-color) text-(--secondary-color)"
                  }`}
                >
                  Get Started
                </button>

                <div className="pt-4 border-t-2 border-(--border-color) flex flex-col gap-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Minus size={18} className="text-(--tertiary-color)" />
                      <p className="text-[15px] text-(--tertiary-color)">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </section>
  );
}
