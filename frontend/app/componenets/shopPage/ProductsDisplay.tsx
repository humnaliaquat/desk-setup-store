"use client";

import React, { useEffect, useState } from "react";
import keyboard from "@/public/products/keyboard/AulaGreen.jpg";
import ProductCard from "./ProductCard";
import Link from "next/link";
import axios from "axios";

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
  _id: string;
  name: string;
  price: number;
  images: { url: string }[];
}

/* ─────────────────────────────── */

export default function ProductsDisplay() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [view, setView] = useState<2 | 3>(3);
  const [sortValue, setSortValue] = useState<string>("popularity");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/get");
        if (!products) {
          console.log("nothing found");
        }
        const safeProducts = Array.isArray(res.data?.data) ? res.data.data : [];
        setProducts(safeProducts);
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

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
      </header>

      {/* PRODUCT GRID */}
      <main>
        <div
          className={`grid gap-6 mb-10 ${
            view === 2 ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {products.length > 0 ? (
            products.map((p, i) => (
              <Link key={p._id} href={`/user/store/${p._id}`}>
                <ProductCard
                  pic={p.images[0].url}
                  name={p.name}
                  price={`$ ${p.price}`}
                />
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No products found</p>
          )}
        </div>
      </main>
    </section>
  );
}
