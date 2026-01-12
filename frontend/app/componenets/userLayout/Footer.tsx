"use client";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white overflow-hidden pt-16 pb-0  px-20 mb-0">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-10 ">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-semibold tracking-widest text-orange-400">
            DESKIO
          </h1>
          <p className="text-stone-400 mt-4 text-sm leading-relaxed max-w-xs">
            Luxury workspace essentials designed to elevate your everyday flow.
          </p>

          <div className="mt-6 text-stone-400 text-sm space-y-1">
            <p>deskio@gmail.com</p>
            <p>Lahore, Pakistan</p>
          </div>
        </div>

        {/* Extra Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 tracking-wide">
            Extra Links
          </h2>
          <ul className="space-y-2 flex flex-col text-stone-400 text-sm">
            <Link href={"/user"} className="hover:text-white cursor-pointer">
              Home
            </Link>
            <Link
              href={"/user/about"}
              className="hover:text-white cursor-pointer"
            >
              About
            </Link>
            <Link
              href={"/user/store"}
              className="hover:text-white cursor-pointer"
            >
              Products
            </Link>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 tracking-wide">
            Useful Links
          </h2>
          <ul className="space-y-2 flex flex-col text-stone-400 text-sm">
            <Link
              href={"/user/blog"}
              className="hover:text-white cursor-pointer"
            >
              Blog
            </Link>
            <Link
              href={"/user/about"}
              className="hover:text-white cursor-pointer"
            >
              About
            </Link>
            <Link
              href={"/user/store"}
              className="hover:text-white cursor-pointer"
            >
              Products
            </Link>
            <Link
              href={"/user/collection"}
              className="hover:text-white cursor-pointer"
            >
              Collection
            </Link>
            <Link
              href={"/user/ai-setup"}
              className="hover:text-white cursor-pointer"
            >
              Products
            </Link>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold mb-4 tracking-wide">
            Follow Us
          </h2>
          <ul className="space-y-2 text-stone-400 text-sm">
            <li className="hover:text-white cursor-pointer">Instagram</li>
            <li className="hover:text-white cursor-pointer">Facebook</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM LOGO */}
      <div className="flex justify-center opacity-10 select-none mb-0">
        <h1 className="text-[12rem] font-bold tracking-[2rem] leading-none text-stone-200">
          DESKIO
        </h1>
      </div>

      {/* COPYRIGHT */}
    </footer>
  );
}
