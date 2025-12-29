"use client";
import "@/app/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/app/componenets/userLayout/Navbar";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

import Footer from "@/app/componenets/userLayout/Footer";
import { useEffect, useState } from "react";
import LoadingScreen from "../componenets/homePageItems/LoadingScreen";

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
  // if (loading) {
  //   return <LoadingScreen />;
  // }
  return (
    <div className={jakarta.className}>
      <div>
        {/* Optional top banner */}
        <motion.div className="flex justify-center text-white font-medium py-2.5 items-center bg-orange-400 text-xs">
          <h1 className="text-sm">
            ENJOY FREE STANDARD DELIVERY ON ORDERS OVER 2000 RUPEES.{" "}
            <span className="underline">SHOP NOW</span>
          </h1>
        </motion.div>

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
