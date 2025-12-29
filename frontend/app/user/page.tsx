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
      <div className="w-full h-[500px] relative overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent z-1" />

        {/* Background Image */}
        <Image
          src={setup}
          alt="Desk Setup"
          fill
          className="object-cover object-[center_72%] opacity-95"
        />

        {/* Hero Text */}
        <div className="absolute top-0 w-full h-full flex flex-col items-start justify-center text-left text-white px-10 md:px-20 z-20">
          <motion.h1
            className={`${dmSerif.className} text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] leading-tight lg:leading-[1.05]`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Build Your <br /> Perfect Desk Setup
          </motion.h1>

          <motion.p
            className="text-sm md:text-base font-thin mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            From keyboards to lighting, find the essentials that complete <br />
            your setup. Make your desk look clean, cozy, and functional.
          </motion.p>

          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              href={"/user/ai-setup"}
              className="text-white bg-transparent border border-white font-semibold py-2.5 px-6 rounded-full"
            >
              Try AI Setup Builder
            </Link>

            <Link
              href={"/user/store"}
              className="text-black bg-white hover:brightness-110 transition font-semibold py-3 px-6 rounded-full shadow-lg flex justify-center items-center gap-2"
            >
              Shop Now
              <span
                className="inline-block"
                style={{
                  animation: "slideX 1s ease-in-out infinite",
                }}
              >
                <MoveRight className="w-5 h-5" />
              </span>
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
              `}</style>
            </Link>
          </motion.div>
        </div>
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
