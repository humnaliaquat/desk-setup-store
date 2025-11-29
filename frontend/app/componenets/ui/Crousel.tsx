import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import setup from "@/public/products/lights/Voncerus.jpg";

export default function Carousel() {
  const arr = [
    {
      title: "Desk Mat",
      subtitle: "Smooth surface, ultimate comfort",
      pic: setup,
    },
    {
      title: "Monitor Stand",
      subtitle: "Elevate your view, declutter your desk",
      pic: setup,
    },
    {
      title: "Wireless Keyboard",
      subtitle: "Type freely, stay focused",
      pic: setup,
    },
    {
      title: "LED Desk Lamp",
      subtitle: "Perfect lighting for every task",
      pic: setup,
    },
  ];

  const [x, setX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const itemWidth = 330 + 20; // card width + gap
    const totalWidth = itemWidth * arr.length; // total width of one set of cards

    const interval = setInterval(() => {
      setX((prev) => {
        const newX = prev - itemWidth;
        // keep moving left, loop seamlessly using modulo
        return -(Math.abs(newX) % totalWidth);
      });
    }, 2000); // change speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden w-full relative">
      <motion.div
        ref={containerRef}
        className="flex gap-5"
        animate={{ x }}
        transition={{ type: "tween", duration: 0.8, ease: "easeInOut" }}
      >
        {[...arr, ...arr].map((item, idx) => (
          <div
            key={idx}
            className="min-w-[330px] h-[385px] rounded-lg shadow-sm relative flex-shrink-0"
          >
            <Image
              src={item.pic}
              alt={item.title}
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            <div className="absolute bottom-2 left-4 text-white z-10">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
