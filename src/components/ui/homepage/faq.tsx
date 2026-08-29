"use client";

import SectionHeader from "@/src/components/ui/SectionHeader";
import { FAQS } from "@/src/constants/landing.constants";
import { AnimatePresence, motion, easeInOut } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="relative w-full min-h-screen pt-24 md:pt-[22vh]">
      <main className="relative max-w-345 mx-auto text-center flex flex-col justify-center items-center px-5">
  

          <SectionHeader
            tag="faq"
            headline="Frequently asked questions."
            description="Everything you need to know about turning your website into an AI assistant."
            large={false}
          />

        <div className="mt-10 md:mt-16 w-full grid grid-cols-1 md:grid-cols-2  items-start">

          {/* Left Column (Even Indexes) */}
          <div className="flex flex-col ">
            {FAQS.filter((_, i) => i % 2 === 0).map((faq, idx) => {
              const realIndex = idx * 2;
              const isOpen = openIndex === realIndex;
              return (
                <div
                  key={faq.question}
                  className="w-full border border-(--border-color) rounded-lg p-1.5 md:p-2.5"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : realIndex)}
                    className={`w-full flex flex-col text-left transition-all rounded-xl cursor-pointer ${
                      isOpen
                        ? "bg-(--primary-color) p-4 md:p-6 shadow-lg"
                        : "px-4 py-3 md:px-6"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base md:text-xl font-medium tracking-tight">
                        {faq.question}
                      </h3>
                      <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 shrink-0 rounded border border-(--border-color)">
                        {isOpen ? (
                          <motion.div animate={{ rotate: "720deg" }}>
                            <Minus
                              size={20}
                              className="bg-white box-content p-2 rounded-xl"
                            />
                          </motion.div>
                        ) : (
                          <motion.div animate={{ rotate: "360deg" }}>
                            <Plus
                              size={20}
                              className="bg-white box-content p-2 rounded-xl"
                            />
                          </motion.div>
                        )}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easeInOut }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-sm text-(--secondary-color) font-normal leading-relaxed tracking-tight">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column (Odd Indexes) */}
          <div className="flex flex-col">
            {FAQS.filter((_, i) => i % 2 !== 0).map((faq, idx) => {
              const realIndex = idx * 2 + 1;
              const isOpen = openIndex === realIndex;
              return (
                <div
                  key={faq.question}
                  className="w-full border border-(--border-color) rounded-lg p-1.5 md:p-2.5"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : realIndex)}
                    className={`w-full flex flex-col text-left transition-all rounded-xl cursor-pointer ${
                      isOpen
                        ? "bg-(--primary-color) p-4 md:p-6 shadow-lg"
                        : "px-4 py-3 md:px-6"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base md:text-xl font-medium tracking-tight">
                        {faq.question}
                      </h3>
                      <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 shrink-0 rounded border border-(--border-color)">
                        {isOpen ? (
                          <motion.div animate={{ rotate: "720deg" }}>
                            <Minus
                              size={20}
                              className="bg-(--primary-color) box-content p-2 rounded-xl"
                            />
                          </motion.div>
                        ) : (
                          <motion.div animate={{ rotate: "360deg" }}>
                            <Plus
                              size={20}
                              className="bg-(--primary-color) box-content p-2 rounded-xl"
                            />
                          </motion.div>
                        )}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easeInOut }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-sm text-(--secondary-color) font-normal leading-relaxed tracking-tight">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </section>
  );
}
