"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Eye, SlidersHorizontal, ShoppingCart, Heart } from "lucide-react";

import keyboard from "@/public/products/lights/Voncerus.jpg";

export default function FeaturedProducts() {
  const [view, setView] = useState("best");

  const data = [
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { pic: keyboard, name: "Keyboard", price: "16000 Rs" },
  ];

  return (
    <div className="px-20 mt-14 py-4">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-8 mb-15 relative">
        <button
          className={`text-2xl font-semibold relative text-gray-500 transition-colors ${
            view === "best" ? "text-orange-500" : ""
          }`}
          onClick={() => setView("best")}
        >
          BEST SELLERS
          {/* Animated underline */}
          <span
            className={`absolute left-0 -bottom-1 h-0.5 bg-orange-500 transition-all duration-300 ${
              view === "best" ? "w-full" : "w-0"
            }`}
          ></span>
        </button>

        <button
          className={`text-2xl font-semibold relative text-gray-500 transition-colors ${
            view === "new" ? "text-orange-500" : ""
          }`}
          onClick={() => setView("new")}
        >
          NEW ARRIVALS
          {/* Animated underline */}
          <span
            className={`absolute left-0 -bottom-1 h-0.5 bg-orange-500 transition-all duration-300 ${
              view === "new" ? "w-full" : "w-0"
            }`}
          ></span>
        </button>
      </div>

      {view === "best" && (
        <div className="grid grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden hover:shadow-2xl rounded transition p-1.5 cursor-pointer pb-5"
            >
              {/* IMAGE WRAPPER */}
              <div className="w-full h-80 relative overflow-hidden p-4 group rounded">
                <Image
                  src={item.pic}
                  alt={item.name}
                  fill
                  className="object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="absolute flex flex-col right-2 top-2 gap-2">
                    <button className="p-3 bg-white rounded-full hover:bg-gray-100">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-white rounded-full hover:bg-gray-100">
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute bottom-3 w-full flex justify-center">
                    <button className="px-10 py-3 bg-white text-black rounded flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* TEXT (OUTSIDE IMAGE BOX) */}
              <div className="flex justify-center items-center flex-col">
                <h1 className="mt-5 font-semibold text-lg">{item.name}</h1>
                <p className="text-gray-600">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {view === "new" && (
        <div className="grid grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden hover:shadow-2xl rounded transition p-1.5 cursor-pointer pb-5"
            >
              {/* IMAGE WRAPPER */}
              <div className="w-full h-80 relative overflow-hidden p-4 group rounded">
                <Image
                  src={item.pic}
                  alt={item.name}
                  fill
                  className="object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="absolute flex flex-col right-2 top-2 gap-2">
                    <button className="p-3 bg-white rounded-full hover:bg-gray-100">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-white rounded-full hover:bg-gray-100">
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-white rounded-full hover:bg-gray-100">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute bottom-3 w-full flex justify-center">
                    <button className="px-10 py-3 bg-white text-black rounded flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* TEXT (OUTSIDE IMAGE BOX) */}
              <div className="flex justify-center items-center flex-col">
                <h1 className="mt-5 font-semibold text-lg">{item.name}</h1>
                <p className="text-gray-600">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
