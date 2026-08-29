"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MainButton from "../Button";
import { signOut, signIn } from "next-auth/react";
import Image from "next/image";

interface NavbarProps {
  userName?: string;
  userEmail?: string;
}

export default function Navbar({ userName, userEmail }: NavbarProps) {
  console.log(userEmail);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute z-50 w-full h-25 border-b border-(--border-color)">
      {/* <span className="md:hidden flex w-full text-xs justify-center">{userEmail}</span> */}
      <div className="w-full max-w-345 h-full mx-auto px-4 md:px-8 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="text-xl font-semibold cursor-pointer z-10 flex items-center">
          <Image src="/AI_bot.svg" alt="bot_avatar" height={50} width={50}/>
          <Link href="/">Scrapcher</Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:space-x-15 text-(--secondary-color)">
          <Link
            href="/"
            className="text-[15px] hover:opacity-80 transition-opacity"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-[15px] hover:opacity-80 transition-opacity"
          >
            Dashboard
          </Link>
          {/* <Link
            href="/dashboard"
            className="text-[15px] hover:opacity-80 transition-opacity"
          >
            Chatbots
          </Link> */}
          <Link
            href="/contact-us"
            className="text-[15px] hover:opacity-80 transition-opacity"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile: Centered 2-Bar Animated Icon */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden z-10 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <motion.span
            animate={{
              rotate: mobileMenuOpen ? 45 : 0,
              y: mobileMenuOpen ? 4 : 0,
            }}
            transition={{ duration: 0.15 }}
            className="w-6 h-0.6 bg-(--secondary-color) rounded-full block"
          />
          <motion.span
            animate={{
              rotate: mobileMenuOpen ? -45 : 0,
              y: mobileMenuOpen ? -4 : 0,
            }}
            transition={{ duration: 0.15 }}
            className="w-6 h-0.6 bg-(--secondary-color) rounded-full block"
          />
        </button>

        {
          <a
            className="hidden md:flex"
            onClick={() => {
              if (userEmail) {
                signOut();
              } else {
                signIn();
              }
            }}
          >
            <MainButton
              content={userEmail ? "Logout" : "Login"}
              isDark={true}
            />
          </a>
        }
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden w-full bg-(--primary-color) border-b border-(--border-color) px-16 py-5 flex flex-col gap-4 text-center shadow-xl overflow-hidden"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-(--secondary-color) py-1"
            >
              Home
            </Link>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-(--secondary-color) py-1"
            >
              Dashboard
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-(--secondary-color) py-1"
            >
              Contact Us
            </Link>

            {/* Mobile User Info & Logout inside Drawer */}
            {userEmail || userName ? (
              <a onClick={() => signOut()}>
                <MainButton content="Logout" isDark={true} />
              </a>
            ) : (
              <Link href={"login"}>
                <MainButton content="Login" isDark={true} />
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
