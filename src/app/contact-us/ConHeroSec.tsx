"use client";

import MainButton from "@/src/components/ui/Button";
import SectionHeader from "@/src/components/ui/SectionHeader";
import Image from "next/image";



export default function ConHeroSec() {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-24 pt-36 md:pt-44">
      {/* Background Cloud */}
      <img
        src="/cloud_bg.webp"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55 mask-[linear-gradient(to_bottom,transparent_0%,black_60%,transparent_78%)]"
      />

      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "101px 88px",
        }}
      />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <SectionHeader
          tag="Contact"
          headline="Let's talk about what you're building."
          large={false}
        />

        {/* Contact Workspace */}
        <div className="mt-16 w-full border border-(--border-color) bg-white/40 p-3 backdrop-blur-sm md:p-5">
          <div className="grid overflow-hidden border border-(--border-color) bg-white shadow-sm md:grid-cols-[0.9fr_1.1fr]">
            
            {/* Left */}
            <div className="flex min-h-125 flex-col justify-between border-b border-(--border-color) p-7 text-start md:border-b-0 md:border-r md:p-10">

        <div className="mt-14 border-t border-(--border-color) pt-6"/>

           
           <Image src="/AI_bot.svg" alt="ai_chatbot_Avatar" width={450} height={450} className="pl-10"/>
          
          
              <div className="mt-14 border-t border-(--border-color) pt-6"/>
            </div>

            {/* Right */}
            <div className="p-7 text-start md:p-10">
              <div className="mb-8">
                <p className="text-[11px] text-(--tertiary-color)">
                  [ SEND A MESSAGE ]
                </p>

                <h3 className="mt-3 text-xl font-medium tracking-tight">
                  Tell us how we can help.
                </h3>
              </div>

              <form className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-xs font-medium"
                  >
                    Full name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Jane Smith"
                    required
                    className="h-12 w-full rounded-md border border-(--border-color) bg-(--primary-color) px-4 text-sm outline-none transition placeholder:text-(--tertiary-color)/60 focus:border-(--secondary-color)/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                    className="h-12 w-full rounded-md border border-(--border-color) bg-(--primary-color) px-4 text-sm outline-none transition placeholder:text-(--tertiary-color)/60 focus:border-(--secondary-color)/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-xs font-medium"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    required
                    className="h-12 w-full rounded-md border border-(--border-color) bg-(--primary-color) px-4 text-sm outline-none transition placeholder:text-(--tertiary-color)/60 focus:border-(--secondary-color)/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us a little about what you need..."
                    required
                    className="w-full resize-none rounded-md border border-(--border-color) bg-(--primary-color) px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-(--tertiary-color)/60 focus:border-(--secondary-color)/30"
                  />
                </div>

                <div className="mt-2 flex justify-start">
                  <button type="submit">
                    <MainButton content="Send Message" isDark={true} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}