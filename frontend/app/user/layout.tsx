"use client";
import "@/app/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/app/componenets/userLayout/Navbar";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { X } from "lucide-react";
import Footer from "@/app/componenets/userLayout/Footer";
import { useEffect, useState } from "react";
import LoadingScreen from "../componenets/homePageItems/LoadingScreen";
import Link from "next/link";
import TopBanner from "../componenets/ui/TopBanner";

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
      <div className="relative">
        <TopBanner />

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
