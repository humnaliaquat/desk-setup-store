"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="relative flex justify-center items-center bg-orange-400 text-white font-medium px-4 py-2 sm:py-2.5"
        >
          <h1 className="text-xs sm:text-sm text-center leading-relaxed">
            ENJOY FREE STANDARD DELIVERY ON ORDERS OVER{" "}
            <span className="font-semibold">2000 RUPEES.</span>{" "}
            <Link
              href="/user/store"
              className="underline underline-offset-2 ml-1"
            >
              SHOP NOW
            </Link>
          </h1>

          <button
            className="absolute right-4 top-2.5 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
