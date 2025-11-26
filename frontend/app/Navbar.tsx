"use client";
import React from "react";
import { ShoppingCart, Heart, UserRound, Search } from "lucide-react";

function Navbar() {
  return (
    <div className="w-full h-14  flex items-center justify-between px-20 ">
      {/* Left side - Logo and Links */}
      <div className="flex items-center space-x-14">
        <h1 className="text-2xl logo font-semibold text-orange-400  tracking-widest ">
          DESKIO
        </h1>

        <ul className="flex space-x-14 text-sm   font-bold text-black">
          <li className="cursor-pointer ">HOME</li>
          <li className="cursor-pointer ">PRODUCTS</li>
          <li className="cursor-pointer">ABOUT</li>
          <li className="cursor-pointer ">CONTACT</li>
        </ul>
      </div>

      {/* Right side - Search and Icons */}
      <div className="flex items-center space-x-4 text-black ">
        {/* Search Bar */}
        <div className="">
          <Search className="  h-5 w-5 " />
        </div>

        {/* Cart */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <ShoppingCart className="h-5 w-5" />
        </button>

        {/* Wishlist */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Heart className="h-5 w-5" />
        </button>

        {/* User */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <UserRound className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
