"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Eye, ShoppingCart, SlidersHorizontal } from "lucide-react";

export default function ProductCard({ pic, name, price }: any) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="overflow-hidden hover:shadow-2xl rounded transition p-1.5 cursor-pointer pb-5">
      {/* IMAGE WRAPPER */}
      <motion.div
        className="w-full h-80 relative overflow-hidden p-4 group rounded"
        onHoverStart={() => setShowOverlay(true)}
        onHoverEnd={() => setShowOverlay(false)}
      >
        <Image src={pic} alt={name} fill className="object-cover" />

        {showOverlay && (
          <motion.div
            className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* RIGHT BUTTONS */}
            <div className="absolute flex flex-col right-2 top-2 gap-2">
              <motion.button
                className="p-3 bg-white rounded-full hover:bg-gray-100"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
              >
                <Eye className="w-4 h-4" />
              </motion.button>

              <motion.button
                className="p-3 bg-white rounded-full hover:bg-gray-100"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </motion.button>
            </div>

            {/* ADD TO CART BUTTON */}
            <div className="absolute bottom-3 w-full flex justify-center">
              <motion.button
                className="px-10 py-3 bg-white text-black rounded flex items-center gap-2"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* TEXT */}
      <div className="flex justify-center items-center flex-col">
        <h1 className="mt-5 font-semibold text-lg">{name}</h1>
        <p className="text-gray-600">{price}</p>
      </div>
    </div>
  );
}
