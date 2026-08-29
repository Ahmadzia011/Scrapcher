"use client";

import SectionHeader from "@/src/components/ui/SectionHeader";
import { FEATURES } from "@/src/constants/landing.constants";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";


export default function Workflow() {

  const [showenIndexes, setShowenIndexes] = useState<Set<number>>(new Set());

  const toggleIndex = (index: number) => {
    setShowenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };


  return (
    <section className="relative w-full min-h-screen pt-24 md:pt-[22vh]">
      <main className=" relative max-w-357 mx-auto text-center flex flex-col justify-center items-center px-5 md:px-8">

        <SectionHeader
          tag="features"
          headline="Everything you need to launch a chatbot."
          description="From crawling your site to embedding a live assistant, Scrapcher covers the whole pipeline."
          large={false}
        />

        <div className="w-full pt-17">
          {FEATURES.map((feature, i) => {
            const isOpen = showenIndexes.has(i);
            const Icon = feature.icon;
            const id = String(i + 1).padStart(2, "0");

            return (
              <div
                key={i}
                className={`w-full bg-(--dark-bg) ${isOpen ? "px-3 py-2" : "bg-[#F9F9F9] px-3"} border border-(--border-color) not-last:border-b-0`}
              >
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex py-3 md:pb-2 space-x-3">
                        <div className="flex justify-start items-center pr-3 space-x-1 border-r border-(--secondary-color)/10">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          <span className="h-2 w-2 rounded-full bg-green-400" />
                        </div>
                        <p className="uppercase text-sm text-[#858585]">
                          {feature.heading}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  
                  onClick={() => toggleIndex(i)}
                  className={`bg-[#F9F9F9] px-9 py-8 flex flex-col space-y-5 md:space-y-0 md:flex-row items-center rounded-md ${!isOpen ? "" : "border border-(--border-color)"} cursor-pointer select-none`}
                >
                  <div
                    className={`${!isOpen ? "flex-1" : "flex-2"} flex w-full items-center justify-between md:items-start md:justify-start transition-all duration-500 ease-in-out `}
                  >
                    <div
                      className={` mt-4 px-2 h-fit text-sm py-2  rounded ${isOpen ? "text-[#F9F9F9] bg-(--secondary-color)" : "text-[#929292] bg-(--border-color)"} transition-all duration-230 ease-in-out`}
                    >
                      {id}
                    </div>

                  {/* hidden on small screens */}
                  <AnimatePresence initial={true}>
                    <span
                      key={'animated-divider'}
                      className={`invisible md:visible mt-8
                        ${
                          !isOpen ? "bg-transparent" : ""
                        } h-px bg-(--border-color) w-2/5 mt-4`}
                    ></span>
                    <div
                      key={'animated-icon'}
                      className={`relative ${
                        !isOpen ? "hidden" : "hidden md:block"
                      } border-8 border-(--border-color) rounded-2xl p-5 transition-all duration-500 ease-in-out`}
                    >
                      <span className="absolute w-1 h-1 bg-(--tertiary-color)/20 top-3 left-2"></span>
                      <span className="absolute w-1 h-1 bg-(--tertiary-color)/20 top-3 right-2"></span>
                      <span className="absolute w-1 h-1 bg-(--tertiary-color)/20 bottom-3 left-2"></span>
                      <span className="absolute w-1 h-1 bg-(--tertiary-color)/20 bottom-3 right-2"></span>
                      <div className="flex h-auto items-center justify-center p-6 border border-(--border-color) rounded-2xl">
                        <Icon size={40} className="text-(--secondary-color)" />
                      </div>
                    </div>
                    </AnimatePresence>
                    
                    {/* hidden on bigger screens */}
                    <div className="md:hidden mt-5 w-fit bg-(--dark-bg) border border-(--border-color)">
                      {isOpen ? (
                        <motion.div
                          animate={{
                            rotate: '720deg'
                          }}
                         >
                        <Minus
                          size={15}
                          className=" bg-white box-content p-2 rounded-xl"
                        />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{
                            rotate:"360deg"
                          }}
                         >
                          <Plus
                          size={15}
                          className="bg-white box-content p-2 rounded-xl"
                        />
                        </motion.div>
                      )}
                      </div>
                  </div>

                  <div className="flex-2 space-y-5 text-start">
                    <p className=" text-[28px] ">{feature.heading}</p>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-(--secondary-color) font-normal text-[15px] pt-1">
                            {feature.description}
                          </p>
                          <p className="text-(--tertiary-color) italic text-xs pt-2">
                            {feature.footer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="hidden flex-1 justify-end md:flex">
                    <div className="w-fit bg-(--dark-bg) border border-(--border-color)">
                      {isOpen ? (
                        <motion.div
                          animate={{
                            rotate: '720deg'
                          }}
                         >
                        <Minus
                          size={20}
                          className="bg-white box-content p-2 rounded-xl"
                        />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{
                            rotate:"360deg"
                          }}
                         >
                          <Plus
                          size={20}
                          className="bg-white box-content p-2 rounded-xl"
                        />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </section>
  );
}
