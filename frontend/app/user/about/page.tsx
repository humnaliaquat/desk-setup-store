"use client";
import Link from "next/link";
import React from "react";
import MainSec from "../../componenets/about-us/MainSec";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {" "}
      {/* HEADER */}
      <header className="flex flex-col justify-center items-center h-[200px] md:h-[250px] px-4">
        <h1 className="text-4xl md:text-7xl font-bold">About Us</h1>

        <div className="flex items-center text-gray-500 mt-4 gap-2 font-medium text-sm md:text-base">
          <Link href="/" className="hover:text-gray-800 transition">
            Home
          </Link>
          <span className="opacity-60">&gt;</span>
          <p>about</p>
        </div>
      </header>
      {/* MAIN SECTION */}
      <main className="grow flex flex-col flex-1">
        <section>
          <MainSec />
        </section>
      </main>
    </div>
  );
}
