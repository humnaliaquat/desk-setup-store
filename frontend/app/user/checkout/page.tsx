"use client";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col justify-center items-center h-[200px] md:h-[250px] px-4">
        <h1 className="text-4xl md:text-7xl font-bold">Checkout</h1>
        <div className="flex items-center text-gray-600 mt-4 gap-2 font-medium text-sm md:text-base">
          <Link href={"/"}>Home</Link>
          <span>&gt;</span>
          <p>Blog</p>
        </div>
      </div>
    </div>
  );
}
