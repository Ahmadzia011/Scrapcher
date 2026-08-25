'use client'
import { motion } from "framer-motion";
import React from "react";
import { SectionHeaderProps } from "@/src/constants/landing.constants";
import MainButton from "./Button";
import Link from "next/link";


export default function SectionHeader({
  tag,
  headline,
  description,
  button_1,
  button_2,
  large
}: SectionHeaderProps) {
  return (
    <>
      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm text-(--tertiary-color) mb-2"
      >
        [ {tag} ]
      </motion.p>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`${large ? "sm:text-5xl md:text-6xl" : "sm:text-4xl md:text-[48px]"} text-center max-w-xl text-4xl font-semibold tracking-tighter leading-[1.1] `}
      >
        {headline}
      </motion.h1>

      {/* Subtitle Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 text-(--secondary-color) sm:text-lg max-w-xl font-normal leading-relaxed  text-center"
      >
        {description}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex md:flex-row flex-col w-full items-center justify-center gap-3"
      >
        {button_1 && (
          <Link href={'/dashboard'}><MainButton content={button_1} isDark={true}/></Link>
        )}

        {button_2 && (
          <Link href={'/contact-us'}><MainButton content={button_2} isDark={false}/></Link>
        )}
      </motion.div>
    </>
  );
}
