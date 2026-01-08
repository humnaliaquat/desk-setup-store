"use client";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { DM_Serif_Display } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";

import setup from "../../public/covers/setup.jpg";
import CategoriesSection from "@/app/componenets/homePageItems/CategoriesSection";
import FeaturedProducts from "@/app/componenets/homePageItems/FeaturedProducts";
import Collections from "@/app/componenets/homePageItems/Collections";
import AISection from "@/app/componenets/homePageItems/AISection";
import CollectionSec from "@/app/componenets/homePageItems/CollectionSec";
import BestSeller from "@/app/componenets/homePageItems/BestSeller";
import BlogSec from "@/app/componenets/homePageItems/BlogSec";
import Divider from "@/app/componenets/homePageItems/Divider";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <div className="w-full h-[420px] sm:h-[480px] md:h-[560px] lg:h-[580px] relative overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent z-10" />

        {/* Background Image */}
        <Image
          src={setup}
          alt="Desk Setup"
          fill
          priority
          className="object-cover object-[center_72%]"
        />

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="w-full px-5 sm:px-8 md:px-20 text-white">
            <motion.h1
              className={`${dmSerif.className} text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Build Your <br className="hidden sm:block" />
              Perfect Desk Setup
            </motion.h1>

            <motion.p
              className="text-xs sm:text-sm md:text-base max-w-xl font-light mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              From keyboards to lighting, find the essentials that complete your
              setup. Make your desk look clean, cozy, and functional.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/user/ai-setup"
                className="text-white border border-white/80 hover:bg-white hover:text-black transition font-semibold py-2.5 px-6 rounded-full text-center"
              >
                Try AI Setup Builder
              </Link>

              <Link
                href="/user/store"
                className="text-black bg-white hover:brightness-110 transition font-semibold py-3 px-6 rounded-full shadow-lg flex justify-center items-center gap-2"
              >
                Shop Now
                <span className="inline-block animate-slideX">
                  <MoveRight className="w-5 h-5" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideX {
            0%,
            100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(4px);
            }
          }
          .animate-slideX {
            animation: slideX 1s ease-in-out infinite;
          }
        `}</style>
      </div>

      {/* Page Sections */}
      <CategoriesSection />
      <BestSeller />
      <CollectionSec />
      <AISection />
      <FeaturedProducts />
      <Divider />
      <BlogSec
        title="The Deskio"
        highlight="Blog"
        subtitle="Stories, guides, and insights to elevate your workspace experience."
      />
    </main>
  );
}
