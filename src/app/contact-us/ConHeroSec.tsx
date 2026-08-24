"use client";
import MainButton from "@/src/components/ui/Button";
import SectionHeader from "@/src/components/ui/SectionHeader";
import React from "react";

export default function ConHeroSec() {
  return (
    <section className="relative min-h-screen overflow-hidden flex justify-center px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 lg:pt-48 pb-16">
      {/* Background Cloud */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55 mask-[linear-gradient(to_bottom,transparent_0%,black_60%,transparent_70%)]"
        src={"/cloud_bg.png"}
        alt=""
      />

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

      {/* Hero Content Container */}
      <main className="relative z-10 w-full max-w-7xl text-center flex flex-col items-center">
        <SectionHeader
          tag="contact"
          headline="Contact Us"
          description="Scrapcher helps teams, founders, and marketers generate high-quality content in seconds — without overthinking every word"
          large={true}
        />

        {/* Outer Glass Card */}
        <div className="w-full relative mt-8 p-3 sm:p-6 lg:p-10 bg-(--primary-color)/50 border border-(--border-color) rounded-2xl justify-items-center perspective-[1000px]">
          {/* Inner Card Grid */}
          <div className="w-full flex flex-col lg:flex-row bg-(--primary-color) shadow-lg rounded-xl p-5 sm:p-8 gap-8 lg:gap-0">
            
            {/* Left Column */}
            <div className="flex flex-col justify-between w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-(--border-color) pb-8 lg:pb-0 lg:pr-8">
              <div className="flex-1 max-w-full">
                <p className="text-sm text-(--tertiary-color) mb-2 text-start">
                  [ get in touch ]
                </p>

                {/* Main Title */}
                <h1 className="text-xl sm:text-2xl md:text-[28px] text-start max-w-xl font-medium tracking-tighter leading-[1.1]">
                  Tell us what you’re building
                </h1>

                {/* Subtitle Description */}
                <p className="mt-3 sm:mt-4 text-(--tertiary-color) text-sm sm:text-base max-w-lg font-normal text-start">
                  Share a few details and the Verseo team will point you toward
                  the fastest way to create, refine, and publish better content.
                </p>
              </div>

              <div className="mt-8 lg:mt-0">
                <p className="text-sm text-(--tertiary-color) mb-2 text-start">
                  [ contact us through ]
                </p>
                <h3 className="text-start text-lg sm:text-2xl font-medium break-all sm:break-normal">
                  info@scrapcher.com
                </h3>
              </div>
            </div>

            {/* Right Column (Form) */}
            <div className="w-full lg:w-1/2 lg:pl-8">
              <form className="h-full flex flex-col justify-between gap-4 text-xs font-medium text-start">
                <div className="flex flex-col gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="opacity-80">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Jane Smith"
                      className="w-full border border-(--border-color) rounded-lg px-3.5 py-3 text-xs placeholder-text-(--secondary-color)/35 focus:outline-none focus:border-(--dark-bg)/30 transition-all"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="opacity-80">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="user@gmail.com"
                      className="w-full border border-(--border-color) rounded-lg px-3.5 py-3 text-xs placeholder-text-(--secondary-color)/35 focus:outline-none focus:border-(--dark-bg)/30 transition-all"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="opacity-80">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      className="w-full border border-(--border-color) rounded-lg px-3.5 py-3 text-xs placeholder-text-(--secondary-color)/35 focus:outline-none focus:border-(--dark-bg)/30 transition-all"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="opacity-80">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us a little about what you need..."
                      className="w-full border border-(--border-color) rounded-lg px-3.5 py-3 text-xs placeholder-text-(--secondary-color)/35 focus:outline-none focus:border-(--dark-bg)/30 transition-all resize-y"
                      required
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center mt-6 lg:mt-10">
                  <button type="submit">
                    <MainButton content="Submit" isDark={true} />
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