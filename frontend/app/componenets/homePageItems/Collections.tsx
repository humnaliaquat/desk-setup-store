"use client";
import React from "react";
import Image from "next/image";
import setup from "@/public/covers/setup5.jpg";
import setup1 from "@/public/covers/setup4.jpg";
import { motion } from "motion/react";

export default function Collections() {
  const items = [
    {
      img: setup1,
      title: "Studio Setups",
      tag: "SAVE UP TO 50% OFF ON ALL ITEMS",
    },
    {
      img: setup,
      title: "Desk Accessories",
      tag: "SAVE UP TO 50% OFF ON ALL ITEMS",
    },
  ];

  return (
    <section className="w-full mt-24 px-6 md:px-20 mb-16">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-semibold mb-2"
        >
          DESIGN{" "}
          <span className="text-orange-400 font-extrabold"> inspires</span>
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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: i * 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative h-[360px] md:h-[420px] w-full overflow-hidden rounded shadow-md group"
          >
            {/* Image */}
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              transition={{ duration: 0.4 }}
            />

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 0.9 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
                className="text-xs md:text-sm tracking-widest"
              >
                {item.tag}
              </motion.p>

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.4, duration: 0.9 }}
                className="text-3xl md:text-4xl font-semibold mt-3"
              >
                {item.title}
              </motion.h2>

              <motion.button
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="mt-5 text-sm md:text-base underline underline-offset-4 hover:opacity-80 transition"
              >
                Explore Collection
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
