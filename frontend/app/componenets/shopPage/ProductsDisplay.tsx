"use client";

import React, { useState } from "react";
import keyboard from "@/public/products/keyboard/AulaGreen.jpg";
import ProductCard from "./ProductCard";

interface IconProps {
  active: boolean;
}

function IconII({ active }: IconProps) {
  return (
    <div className={`flex gap-1 ${active ? "text-black" : "text-gray-400"}`}>
      <div className="w-1 h-3.5 bg-current rounded"></div>
      <div className="w-1 h-3.5 bg-current rounded"></div>
    </div>
  );
}

function IconIII({ active }: IconProps) {
  return (
    <div className={`flex gap-1 ${active ? "" : "text-gray-400"}`}>
      <div className="w-1 h-3.5 bg-current rounded"></div>
      <div className="w-1 h-3.5 bg-current rounded"></div>
      <div className="w-1 h-3.5 bg-current rounded"></div>
    </div>
  );
}

interface ProductType {
  pic: any;
  name: string;
  price: string;
}

/* ─────────────────────────────── */

export default function ProductsDisplay() {
  const [view, setView] = useState<2 | 3>(3);
  const [sortValue, setSortValue] = useState<string>("popularity");

  const data: ProductType[] = [
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
  ];

  return (
    <section className="px-10 w-full">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        {/* Left Side */}
        <div className="flex gap-6 items-center">
          {/* VIEW TOGGLE */}
          <div className="flex gap-3">
            <button
              onClick={() => setView(2)}
              className={`p-2 rounded border border-gray-300 flex items-center justify-center transition hover:bg-gray-100 cursor-pointer ${
                view === 2 ? "bg-gray-300 text-white" : "bg-white"
              }`}
            >
              <IconII active={view === 2} />
            </button>

            <button
              onClick={() => setView(3)}
              className={`p-2 rounded border  border-gray-300 flex items-center justify-center transition hover:bg-gray-100 cursor-pointer ${
                view === 3 ? "bg-gray-300 text-black " : "bg-white "
              }`}
            >
              <IconIII active={view === 3} />
            </button>
          </div>

          {/* Showing text */}
          <h1 className="text-gray-600 text-sm">Showing 1–12 of 15 results</h1>
        </div>

        {/* Sorting */}
        <select
          className="border  border-gray-300 rounded p-2 text-sm"
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        >
          <option value="popularity">Sort by popularity</option>
          <option value="rating">Sort by rating</option>
          <option value="newness">Sort by newness</option>
          <option value="priceLowToHigh">Price: low → high</option>
          <option value="priceHighToLow">Price: high → low</option>
        </select>
      </header>

      {/* PRODUCT GRID */}
      <main>
        <div
          className={`grid gap-6 mb-10 ${
            view === 2 ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {data.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
      </main>
    </section>
  );
}
