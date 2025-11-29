import React from "react";
import Image from "next/image";
import setup from "@/public/covers/setup1.jpg";
import { DM_Serif_Display } from "next/font/google";
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

export default function AISection() {
  return (
    <section className="w-full  py-16 mt-3">
      <div className="relative w-full h-[260px] md:h-[430px]  overflow-hidden group shadow-xl">
        {/* Image */}
        <Image
          src={setup}
          alt="AI Desk Setup"
          fill
          className="object-cover object-[center_98%]  transition-all duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10  transition-all duration-300" />

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h2
            className={`${dmSerif.className} text-3xl md:text-5xl font-medium drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] leading-tight lg:leading-[1.05]`}
          >
            Build Your Dream Desk Setup
          </h2>
          <p className="mt-2 text-sm md:text-base opacity-90 max-w-md">
            Let our AI customize the perfect workspace for your needs.
          </p>

          <button className="mt-5 px-6 py-2.5 bg-white hover:brightness-110 text-black rounded-full font-medium  transition drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] cursor-pointer">
            Customize With AI
          </button>
        </div>
      </div>
    </section>
  );
}
