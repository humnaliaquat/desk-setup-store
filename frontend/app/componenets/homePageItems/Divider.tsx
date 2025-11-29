"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Divider() {
  const items = [
    "Get 20% off for your first order",
    "100% secure protected payment",
    "Free shipping for orders over 2000 Rupees",
    "Pay with multiple credit cards",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2); // half because we duplicate items
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white border-y border-gray-300 mt-10 mb-16">
      <motion.div
        ref={containerRef}
        className="flex"
        animate={{ x: [-0, -width] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...items, ...items].map((text, index) => (
          <div
            key={index}
            className="shrink-0 border-l px-6 py-8 text-xl font-semibold first:border-l-0 border-gray-300"
          >
            {text}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
