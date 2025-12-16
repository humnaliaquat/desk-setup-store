import { Bell, ChevronDown, Moon, Search } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-64 z-50 h-16 w-[calc(100%-16rem)] bg-white ">
      <div className="flex h-16 items-center justify-between px-6">
        {/* LEFT: Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full  bg-gray-100 pl-10 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-200"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <Moon className="h-5 w-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* User */}
          <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white">
              H
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              Hamna Liaqat
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
