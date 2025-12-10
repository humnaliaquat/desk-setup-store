"use client";

import ProductDetailsExtraDetails from "@/app/componenets/shopPage/ProductDetailsExtraDetails";
import Link from "next/link";
import { Minus, Plus, Heart, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import keyboard from "@/public/products/keyboard/AulaGreen.jpg";
import ProductCard from "@/app/componenets/shopPage/ProductCard";
interface ProductType {
  pic: any;
  name: string;
  price: string;
  id?: number;
}

export default function Page() {
  const [qty, setQty] = useState(1);

  const dec = () => setQty((q) => (q > 1 ? q - 1 : 1));
  const inc = () => setQty((q) => q + 1);
  const data: ProductType[] = [
    { id: 1, pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { id: 2, pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { id: 3, pic: keyboard, name: "Keyboard", price: "16000 Rs" },
    { id: 4, pic: keyboard, name: "Keyboard", price: "16000 Rs" },
  ];

  return (
    <div className="mt-6 mx-20 pb-14">
      {/* breadcrumbs */}
      <nav className="text-sm mb-6">
        <ul className="flex gap-2 items-center text-gray-600">
          <li>
            <a href="/">Home</a>
          </li>
          <p>&gt;</p>
          <li>
            <a href="/store">Store</a>
          </li>
          <p>&gt;</p>
          <li className="font-medium text-black">Product Name</li>
        </ul>
      </nav>

      {/* product details layout */}
      <div className="grid grid-cols-2 gap-10">
        {/* left images */}
        <div className="flex gap-4">
          {/* thumbnails */}
          <div className="w-24 flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full h-[118px] bg-gray-300 rounded-xl"
              />
            ))}
          </div>

          {/* big image */}
          <div className="flex-1 h-[520px] bg-gray-200 rounded-2xl" />
        </div>

        {/* right details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">Product Name</h1>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Sleek and minimal desk accessory that upgrades your workspace vibe,
            helps with cable management, and improves posture.
          </p>

          <p className="text-2xl font-semibold mb-4">$99.99</p>

          {/* reviews */}
          <div className="flex items-center mb-5 border-b border-gray-200 pb-5">
            <div className="flex text-2xl text-orange-400">★★★★☆</div>
            <p className="ml-2 text-gray-600 text-sm">(120 reviews)</p>
          </div>

          {/* color options */}
          <div className="flex flex-col gap-3 mb-6">
            <label className="font-semibold text-sm">Color:</label>
            <div className="flex gap-2">
              {["bg-red-500", "bg-blue-500", "bg-green-500"].map((c, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 ${c} rounded-md cursor-pointer border-2 border-gray-300 hover:border-black`}
                />
              ))}
            </div>
          </div>

          {/* quantity */}
          <div className="flex flex-col gap-3 mb-8">
            <label className="font-semibold text-sm">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={dec}
                className="px-2 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                <Minus size={18} />
              </button>
              <span className="font-medium w-4 text-center">{qty}</span>
              <button
                onClick={inc}
                className="px-2 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* add to cart + wishlist */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-gray-200 hover:bg-gray-300  transition">
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 transition">
              <Heart size={18} />
              Wishlist
            </button>
          </div>

          {/* buy now */}
          <div className="mt-4">
            <button className="w-full py-3 hover:opacity-90 bg-black text-white text-sm font-semibold rounded-lg  transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: description, reviews, etc */}
      <ProductDetailsExtraDetails />
      {/* related products section could go here */}
      <div className="mt-25">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-semibold mb-2">
            Related <span className="text-orange-400">Products</span>
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-10 ">
          {data.map((p, i) => (
            <Link key={p.id} href={`/store/${p.id}`}>
              <ProductCard {...p} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
