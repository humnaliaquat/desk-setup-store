"use client";
import "@/app/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/app/componenets/userLayout/Navbar";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

import Footer from "@/app/componenets/userLayout/Footer";
import { useEffect, useState } from "react";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  useEffect(() => {
    animate(count, 100, {
      duration: 2,
      ease: "easeOut",
      onComplete: () => {
        setLoading(false);
      },
    });
  }, []);
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-start px-10">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "120vw" }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="text-2xl font-bold"
        >
          <motion.span>{rounded}</motion.span>%
        </motion.div>
      </div>
    );
  }
  return (
    <div className={jakarta.className}>
      <div>
        {/* Optional top banner */}
        <div className="flex justify-center text-white font-medium py-2.5 items-center bg-orange-400 text-xs">
          <h1 className="text-sm">
            ENJOY FREE STANDARD DELIVERY ON ORDERS OVER 2000 RUPEES.{" "}
            <span className="underline">SHOP NOW</span>
          </h1>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        {children}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
