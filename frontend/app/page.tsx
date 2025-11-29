"use client";
import Image from "next/image";
import { MoveRight, Circle } from "lucide-react";
import setup from "../public/covers/setup.jpg";
import { DM_Serif_Display } from "next/font/google";
import CategoriesSection from "./componenets/homePageItems/CategoriesSection";
import FeaturedProducts from "./componenets/homePageItems/FeaturedProducts";
import Collections from "./componenets/homePageItems/Collections";
import AISection from "./componenets/homePageItems/AISection";
import CollectionSec from "./componenets/homePageItems/CollectionSec";
import BestSeller from "./componenets/homePageItems/BestSeller";
import BlogSec from "./componenets/homePageItems/BlogSec";
import Divider from "./componenets/homePageItems/Divider";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className="flex flex-col ">
      <div className="w-full h-[500px] relative overflow-hidden">
        {/* Navbar */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent z-1" />
        {/* Background Image */}
        <Image
          src={setup}
          alt="Desk Setup"
          fill
          className="object-cover  object-[center_72%] opacity-95"
        />

        {/* Hero Text */}

        <div className="absolute top-0 w-full h-full flex flex-col items-start justify-center text-left text-white px-10 md:px-20 z-20">
          <h1
            className={`${dmSerif.className} text-4xl md:text-6xl font-extrabold mb-6  drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] leading-tight lg:leading-[1.05]`}
          >
            Build Your <br /> Perfect Desk Setup
          </h1>

          <p className="text-sm md:text-base font-thin mb-6">
            From keyboards to lighting, find the essentials that complete <br />
            your setup. Make your desk look clean, cozy, and functional.
          </p>

          <div className="flex gap-6">
            <button className="text-white bg-transparent border border-white font-semibold py-2.5 px-6 rounded-full">
              Try AI Setup Builder
            </button>

            <button className="text-black bg-white hover:brightness-110 transition font-semibold py-3 px-6 rounded-full shadow-lg flex justify-center items-center gap-2">
              Shop Now
              <span
                className="inline-block"
                style={{
                  animation: "slideX 1s ease-in-out infinite",
                }}
              >
                <MoveRight className="w-5 h-5" />
              </span>
              {/* Inline keyframes for icon animation */}
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
            </button>
          </div>
        </div>
      </div>
      {/* Categories section */}
      <CategoriesSection />

      <BestSeller />
      <CollectionSec />

      <AISection />
      <FeaturedProducts />
      <Divider />
      <BlogSec />
    </main>
  );
}
