"use client";

import React from "react";
import Image from "next/image";

import keyboard from "@/public/covers/setup1.jpg";
import mice from "@/public/covers/setup2.jpg";
import mat from "@/public/covers/setup3.jpg";
import light from "@/public/covers/setup4.jpg";

export default function CollectionPage() {
  const collections = [
    { title: "Productivity", items: "08 ITEMS", image: keyboard },
    { title: "Dark Mode", items: "06 ITEMS", image: mice },
    { title: "Creator Desk", items: "10 ITEMS", image: mat },
    { title: "Minimal Work", items: "05 ITEMS", image: light },
    { title: "Gaming Setup", items: "09 ITEMS", image: keyboard },
    { title: "Cozy Workspace", items: "07 ITEMS", image: mice },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="flex flex-col justify-center items-center h-[200px] md:h-[250px] px-4">
        <h1 className="text-4xl md:text-7xl font-bold">Collections</h1>
        <div className="flex items-center text-gray-600 mt-4 gap-2 font-medium text-sm md:text-base">
          <p>Home</p>
          <span>&gt;</span>
          <p>Collections</p>
        </div>
      </div>

      {/* COLLECTION GRID */}
      <div
        className="w-full px-4 md:px-10 lg:px-20 mb-16 grid 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {collections.map((col, index) => (
          <div
            key={index}
            className="relative rounded overflow-hidden cursor-pointer 
            group h-[280px] sm:h-80 lg:h-[300px] transition-all duration-300 
            hover:-translate-y-2"
          >
            {/* IMAGE */}
            <Image
              src={col.image}
              alt={col.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition duration-500"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300"></div>

            {/* TOP RIGHT BADGE */}
            <div className="absolute top-3 right-3">
              <span
                className="text-[10px] md:text-xs font-semibold px-3 py-1 
              border border-white/40 text-white rounded-lg backdrop-blur-md"
              >
                {col.items}
              </span>
            </div>

            {/* TITLE */}
            <div className="absolute bottom-4 w-full flex justify-center">
              <span
                className="text-black text-sm md:text-base font-semibold px-6 py-2 
                bg-white/80 rounded-full backdrop-blur-md shadow-sm"
              >
                {col.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
