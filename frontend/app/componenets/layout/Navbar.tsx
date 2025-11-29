"use client";
import React from "react";
import { ShoppingCart, Heart, UserRound, Search } from "lucide-react";

function Navbar() {
  return (
    <div className="w-full h-17 flex items-center justify-between px-6 md:px-20">
      {/* Left side - Logo and Links */}
      <div className="flex items-center space-x-10 md:space-x-14">
        <h1 className="text-2xl font-semibold text-orange-400 tracking-widest">
          DESKIO
        </h1>

        <ul className="hidden md:flex space-x-10 md:space-x-14 text-sm font-bold">
          <li className="cursor-pointer hover:text-gray-600 nav-link">HOME</li>
          <li className="cursor-pointer hover:text-gray-600 nav-link">
            PRODUCTS
          </li>
          <li className="cursor-pointer hover:text-gray-600 nav-link">ABOUT</li>
          <li className="cursor-pointer hover:text-gray-600 nav-link">
            CONTACT
          </li>
        </ul>
      </div>

      {/* Right side - Search & Icons */}
      <div className="flex items-center space-x-4 text-black">
        <Search className="h-5 w-5 cursor-pointer" />

        <button className="p-2 hover:bg-gray-100 rounded-md">
          <ShoppingCart className="h-5 w-5" />
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Heart className="h-5 w-5" />
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-md">
          <UserRound className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
