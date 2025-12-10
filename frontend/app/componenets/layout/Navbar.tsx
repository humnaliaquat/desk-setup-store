"use client";
import React from "react";
import { ShoppingCart, Heart, UserRound, Search } from "lucide-react";
import Link from "next/link";

function Navbar() {
  return (
    <div className="w-full h-17 flex items-center justify-between px-6 md:px-20">
      {/* Left side - Logo and Links */}
      <div className="flex items-center space-x-10 md:space-x-14">
        <h1 className="text-2xl font-semibold text-orange-400 tracking-widest">
          DESKIO
        </h1>

        <ul className="hidden md:flex space-x-10 md:space-x-14 text-sm font-bold">
          <Link
            href={"/user"}
            className="cursor-pointer hover:text-gray-600 nav-link"
          >
            HOME
          </Link>
          <Link
            href={"/user/store"}
            className="cursor-pointer hover:text-gray-600 nav-link"
          >
            STORE
          </Link>
          <Link
            href={"/user/collection"}
            className="cursor-pointer hover:text-gray-600 nav-link"
          >
            COLLECTION
          </Link>
          <Link
            href={"/user/ai-setup"}
            className="cursor-pointer hover:text-gray-600 nav-link"
          >
            AI SETUP
          </Link>
          <Link
            href={"/user/blog"}
            className="cursor-pointer hover:text-gray-600 nav-link"
          >
            BLOG
          </Link>
          <Link
            href={"/user/about"}
            className="cursor-pointer hover:text-gray-600 nav-link"
          >
            ABOUT
          </Link>
        </ul>
      </div>

      {/* Right side - Search & Icons */}
      <div className="flex items-center space-x-4 text-black">
        <Search className="h-5 w-5 cursor-pointer" />

        <Link href={"/user/cart"} className="p-2 hover:bg-gray-100 rounded-md">
          <ShoppingCart className="h-5 w-5" />
        </Link>

        <Link
          href={"/user/wishlist"}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          <Heart className="h-5 w-5" />
        </Link>

        <button className="p-2 hover:bg-gray-100 rounded-md">
          <UserRound className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
