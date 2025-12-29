"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Truck, RotateCcw, Headphones, ShieldCheck } from "lucide-react";

import keyboard from "../../../public/products/keyboard/AulaBlue.jpg";
import mice from "@/public/products/Mice/vssoplor.jpg";
import mat from "@/public/products/mat/reniteco.jpg";
import light from "@/public/products/lights/Voncerus.jpg";

export default function CategoriesSection() {
  const items = [
    {
      title: "Free Shipping",
      description: "Free shipping on your first order",
      icon: Truck,
    },
    {
      title: "15 Days Returns",
      description: "Hassle-free moneyback guarantee",
      icon: RotateCcw,
    },
    {
      title: "Online Support",
      description: "24/7 customer support available",
      icon: Headphones,
    },
    {
      title: "Secure Payment",
      description: "100% protected and encrypted",
      icon: ShieldCheck,
    },
  ];

  const collection = [
    { title: "Keyboards", items: "04 ITEMS", image: keyboard },
    { title: "Mice", items: "06 ITEMS", image: mice },
    { title: "Desk Mats", items: "05 ITEMS", image: mat },
    { title: "Lights", items: "03 ITEMS", image: light },
  ];

  // Stagger container for smooth sequential reveal
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 5,
      },
    },
  };

  const collectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.19,
      },
    },
  };

  const collectionItemVariants: Variants = {
    hidden: { x: -3, y: 0, opacity: 0, scale: 0.94 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "tween",
        stiffness: 50,
        damping: 22,
        mass: 5,
      },
    },
  };

  return (
    <div className="w-full px-6 lg:px-20 py-14 space-y-16 mt-5">
      {/* FEATURES */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition"
          >
            <div className="p-3 rounded-xl mt-2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <item.icon className="w-7 h-7 text-gray-700 dark:text-gray-300" />
            </div>

            <div>
              <h1 className="font-semibold text-lg">{item.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* COLLECTION GRID */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={collectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {collection.map((col, index) => (
          <motion.div
            key={index}
            variants={collectionItemVariants}
            className="relative h-54 overflow-hidden group cursor-pointer hover:-translate-y-2 rounded transition-all duration-300"
          >
            {/* IMAGE */}
            <Image
              src={col.image}
              alt={col.title}
              fill
              className="object-cover object-top group-hover:scale-105 transition duration-300"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>

            {/* TOP RIGHT TAG */}
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold px-3 py-1 border border-black text-white rounded-lg backdrop-blur-lg">
                {col.items}
              </span>
            </div>

            {/* BOTTOM CENTER TITLE */}
            <div className="absolute bottom-4 w-full flex justify-center">
              <span className="text-black text-xm font-medium px-6 py-1.5 bg-white rounded-full backdrop-blur-sm">
                {col.title}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
