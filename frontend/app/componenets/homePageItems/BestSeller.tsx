"use client";
import Image from "next/image";
import React, { useState } from "react";
import keyboard from "@/public/products/lights/Voncerus.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingCart, SlidersHorizontal } from "lucide-react";

export default function BestSeller() {
  const data = [
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
  ];
  const [showOverlay, setShowOverlay] = useState<number | null>(null);

  // Spring settings for smoothness
  const spring = { type: "spring", stiffness: 70, damping: 20, mass: 1 };

  return (
    <div className="px-7 md:px-20 mt-14 py-4">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.h1
          className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-2"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ type: "spring", stiffness: 70, damping: 20, mass: 1 }}
        >
          Best Seller <span className="text-orange-400">Products</span>
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-md md:max-w-lg text-sm md:text-base"
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ type: "spring", stiffness: 70, damping: 20, mass: 1 }}
        >
          Build your dream workspace with curated setups and accessories.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 3,
              delay: index * 0.16,
            }}
            className="overflow-hidden hover:shadow-2xl rounded transition p-1.5 cursor-pointer pb-5"
          >
            {/* IMAGE WRAPPER */}
            <motion.div
              className="w-full h-64 sm:h-72 md:h-80 relative overflow-hidden p-4 group rounded"
              onHoverStart={() => setShowOverlay(index)}
              onHoverEnd={() => setShowOverlay(null)}
            >
              <Image
                src={item.pic}
                alt={item.name}
                fill
                className="object-cover rounded"
              />

              {/* Hover Overlay */}
              <AnimatePresence>
                {showOverlay === index && (
                  <motion.div
                    className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-between p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-end gap-2">
                      <motion.button
                        className="p-2 sm:p-3 bg-white rounded-full hover:bg-gray-100"
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        exit={{ y: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 70,
                          damping: 20,
                          mass: 1,
                        }}
                      >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                      <motion.button
                        className="p-2 sm:p-3 bg-white rounded-full hover:bg-gray-100"
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        exit={{ y: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 70,
                          damping: 20,
                          mass: 1,
                        }}
                      >
                        <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                    </div>

                    <div className="flex justify-center">
                      <motion.button
                        className="px-6 sm:px-10 py-2 sm:py-3 bg-white text-black rounded flex items-center gap-2"
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        exit={{ y: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 70,
                          damping: 20,
                          mass: 1,
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* TEXT (OUTSIDE IMAGE BOX) */}
            <div className="flex justify-center items-center flex-col mt-3">
              <h1 className="font-semibold text-lg sm:text-xl">{item.name}</h1>
              <p className="text-gray-600">{item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
