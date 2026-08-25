"use client";

import { motion } from "framer-motion";
import { Plus, Sparkle } from "lucide-react";

import { FOOTER_LINKS } from "@/src/constants/landing.constants";
import SectionHeader from "./SectionHeader";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex w-full flex-col items-start md:items-start gap-4 py-6 px-4 sm:px-4 md:w-55.75 md:px-8 md:py-8 md:text-end border-t md:border-t-0 md:border-l border-(--border-color)">
      <p className="text-xs text-(--tertiary-color) tracking-tight lowercase">
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-(--secondary-color) tracking-tight hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <section className="relative min-h-screen md:min-h-[110vh] overflow-hidden flex flex-col items-center justify-between bg-linear-to-b from-(--primary-color) from-0% via-[#DAE3ED] via-74% to-[#B7CAE0] to-100% pt-12 md:pt-[8vh] ">
      {/* Hero Content */}
      <main className="relative z-10 w-full md:max-w-345 text-center flex flex-col items-center px-4 sm:px-5">
        <SectionHeader
          tag="ready to start?"
          headline="Start creating better content today"
          description="Turn ideas into polished content in seconds. Generate, refine, and publish faster with AI-powered workflows designed for modern teams."
          large={true}
          button_1="Get Started"
          button_2="Contact Us"
        />
      </main>

      <footer className="relative w-full border-t-2 md:border-2 border-(--border-color) mt-12 md:mt-0">
        <div className="w-full md:max-w-345 mx-auto px-4 sm:px-5 border-x-0 md:border-x border-(--border-color)">
          
          {/* Top Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-(--border-color)">
            <div className="flex flex-col gap-4 py-6 px-4 sm:px-2 md:px-8 md:py-8 border-b md:border-b-0 border-(--border-color)">
              <span className="text-2xl font-bold tracking-tighter uppercase">
                Scrapcher
              </span>
              <p className="text-sm text-(--secondary-color) leading-relaxed tracking-tight md:max-w-90">
                Scrapcher helps teams create, refine, and publish high-quality
                content faster — without complicated workflows or endless
                revisions.
              </p>
            </div>

            <div className="flex flex-col items-start justify-center gap-2 py-6 px-4 sm:px-2 md:items-end md:px-8 md:py-8 md:text-right">
              <p className="text-xs text-(--tertiary-color) tracking-tight lowercase">
                [ contact us through e-mail ]
              </p>
              <a
                href="mailto:info@scrapcher.com"
                className="text-xl font-medium tracking-tight break-all hover:opacity-80 transition-opacity sm:text-2xl md:text-3xl md:break-normal"
              >
                info@scrapcher.com
              </a>
            </div>
          </div>

          {/* Middle Row Layout */}
          <div className="flex flex-col md:flex-row border-x border-b md:border-b-0 border-(--border-color)">
            {/* Newsletter Container */}
            <div className="flex flex-1 flex-col gap-4 py-6 px-4 sm:px-2 md:px-8 md:py-8">
              <p className="text-xs text-(--tertiary-color) tracking-tight lowercase">
                [ newsletter ]
              </p>
              <h3 className="text-2xl font-medium tracking-tight">
                Stay connected
              </h3>
              <form className="flex flex-col gap-2 xs:flex-row">
                <input
                  type="email"
                  placeholder="user@gmail.com"
                  className="w-full bg-(--primary-color) px-4 py-3.5 text-sm text-(--tertiary-color) outline-none transition-colors placeholder:text-(--tertiary-color) focus:border-(--secondary-color) xs:w-auto md:w-75 border border-(--border-color) md:border-none"
                />
                <button className="bg-(--secondary-color) w-full md:w-fit hover:opacity-90 text-white text-xs md:text-sm font-normal px-9 py-3 rounded-sm transition-all shadow-md group">
                  <div className="relative overflow-hidden">
                    <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                      Join
                    </p>
                    <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                      Join
                    </p>
                  </div>
                </button>
              </form>
            </div>

            {/* Link Columns Wrapper */}
            <div className="flex flex-col md:flex-row w-full md:w-auto">
              <FooterColumn
                title="[ resources ]"
                links={FOOTER_LINKS.resources}
              />
              <FooterColumn
                title="[ navigation ]"
                links={FOOTER_LINKS.navigation}
              />
              <FooterColumn title="[ social ]" links={FOOTER_LINKS.social} />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full py-5 md:border border-(--border-color) ">
            <p className="text-sm w-fit text-(--secondary-color) mx-auto tracking-tight text-center">
              © 2026 Scrapcher | All Rights Reserved
            </p>
          </div>

        </div>
      </footer>
    </section>
  );
}