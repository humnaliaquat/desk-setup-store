"use client";

import React from "react";
import { ShoppingCart, Heart, UserRound, Menu } from "lucide-react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="w-full h-18 flex items-center justify-between px-6 md:px-20 border-b border-gray-300">
      {/* LEFT */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <Link
          href="/user"
          className="text-2xl font-semibold text-orange-400 tracking-widest"
        >
          DESKIO
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-bold">
          {[
            { name: "HOME", href: "/user" },
            { name: "STORE", href: "/user/store" },
            { name: "COLLECTION", href: "/user/collection" },
            { name: "AI SETUP", href: "/user/ai-setup" },
            { name: "BLOG", href: "/user/blog" },
            { name: "ABOUT", href: "/user/about" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="relative text-stone-800 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-4 text-stone-800">
        {/* Desktop Icons */}
        <Link
          href="/user/cart"
          className="hidden md:flex p-2 hover:bg-stone-100 rounded-md"
        >
          <ShoppingCart className="h-5 w-5" />
        </Link>

        <Link
          href="/user/wishlist"
          className="hidden md:flex p-2 hover:bg-stone-100 rounded-md"
        >
          <Heart className="h-5 w-5" />
        </Link>

        <button className="p-2 hover:bg-stone-100 rounded-md">
          <UserRound className="h-5 w-5" />
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 hover:bg-stone-100 rounded-md">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
