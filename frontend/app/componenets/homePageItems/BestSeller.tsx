"use client";
import Image from "next/image";
import React, { useState } from "react";
import keyboard from "@/public/products/lights/Voncerus.jpg";
import { AnimatePresence, hover, motion } from "motion/react";
import { Eye, ShoppingCart, SlidersHorizontal } from "lucide-react";
export default function BestSeller() {
  const data = [
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
  ];
  const [showOverlay, setShowOverlay] = useState<number | null>(null);
  return (
    <div className="px-20 mt-14 py-4 ">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.h1
          className="text-3xl md:text-5xl font-semibold mb-2"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ type: "spring", delay: 0.15 }}
        >
          Best Seller <span className="text-orange-400">Products</span>
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-lg text-sm md:text-base"
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ type: "spring", delay: 0.15 }}
        >
          Build your dream workspace with curated setups and accessories.
        </motion.p>
      </div>
      <div className="grid grid-cols-4 gap-6 ">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1, backdropFilter: "2px" }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              type: "spring",

              delay: index * 0.12,
              ease: "easeInOut",
            }}
            className="overflow-hidden hover:shadow-2xl rounded transition p-1.5 cursor-pointer pb-5"
          >
            {/* IMAGE WRAPPER */}
            <motion.div
              className="w-full h-80 relative overflow-hidden p-4 group rounded"
              onHoverStart={() => setShowOverlay(index)}
              onHoverEnd={() => setShowOverlay(null)}
            >
              <Image
                src={item.pic}
                alt={item.name}
                fill
                className="object-cover"
              />

              {/* Hover Overlay */}
              {showOverlay === index && (
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute flex flex-col right-2 top-2 gap-2">
                    <motion.button
                      className="p-3 bg-white rounded-full hover:bg-gray-100"
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                      exit={{ y: 10 }}
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className="p-3 bg-white rounded-full hover:bg-gray-100"
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                      exit={{ y: 10 }}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="absolute bottom-3 w-full flex justify-center">
                    <motion.button
                      className="px-10 py-3 bg-white text-black rounded flex items-center gap-2"
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                      exit={{ y: 10 }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* TEXT (OUTSIDE IMAGE BOX) */}
            <div className="flex justify-center items-center flex-col">
              <h1 className="mt-5 font-semibold text-lg">{item.name}</h1>
              <p className="text-gray-600">{item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
