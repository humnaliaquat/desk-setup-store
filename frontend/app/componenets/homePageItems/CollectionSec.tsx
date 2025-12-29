"use client";
import React from "react";
import Image from "next/image";
import setup from "@/public/covers/setup7.jpg";
import { motion } from "motion/react";

export default function CollectionSec() {
  return (
    <div className="w-full mt-24 px-6 md:px-20 mb-16">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-semibold mb-2"
        >
          Premium <span className="text-orange-400 font-extrabold">Picks</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="text-gray-600 max-w-lg text-sm md:text-base"
        >
          Build your dream workspace with curated setups and accessories.
        </motion.p>
      </div>

      <div className="flex flex-col space-y-16">
        {/* 1️⃣ Studio Setups */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src={setup}
              alt="Studio Setup"
              className="rounded-lg w-full h-[260px] object-cover shadow-md"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-3"
          >
            <h1 className="text-xl md:text-2xl font-semibold">Studio Setups</h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Full setups, bundles, inspirations — everything you need to build
              a dream studio workspace.
            </p>
            <button className="px-6 py-2 bg-black hover:brightness-110 rounded-full text-white transition">
              Explore Collection
            </button>
          </motion.div>
        </motion.div>

        {/* 2️⃣ Desk Accessories */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3 order-2 md:order-1"
          >
            <h1 className="text-xl md:text-2xl font-semibold">
              Desk Accessories
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Mats, stands, plants, trays and more — organize and elevate your
              workspace aesthetics.
            </p>
            <button className="px-6 py-2 bg-black hover:brightness-110 rounded-full text-white transition">
              Explore Collection
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 md:order-2"
          >
            <Image
              src={setup}
              alt="Desk Accessories"
              className="rounded-lg w-full h-[260px] object-cover shadow-md"
            />
          </motion.div>
        </motion.div>

        {/* 3️⃣ Mood Lighting */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src={setup}
              alt="Mood Lighting"
              className="rounded-lg w-full h-[260px] object-cover shadow-md"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-3"
          >
            <h1 className="text-xl md:text-2xl font-semibold">Mood Lighting</h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              RGBs, table lamps, ambient lights — transform your desk and room
              with the right vibe.
            </p>
            <button className="px-6 py-2 bg-black hover:brightness-110 rounded-full text-white transition">
              Explore Collection
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
