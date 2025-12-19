"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Box,
  ShoppingCart,
  Users,
  Settings,
  Plus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const path = usePathname();
  const [openProducts, setOpenProducts] = useState(false);

  // auto-open products if user is on products route
  useEffect(() => {
    if (path.startsWith("/admin/products")) {
      setOpenProducts(true);
    }
  }, [path]);

  const active = "bg-gray-100 text-black border-l-4 border-orange-400";

  const base =
    "flex items-center gap-3 px-4 py-2 rounded-md mb-1 font-medium transition hover:bg-gray-100";

  return (
    <aside className="fixed left-0 top-0 w-64 bg-white text-gray-500 min-h-screen p-4 flex flex-col ">
      {/* LOGO */}
      <div className="flex items-center gap-3 font-bold text-lg text-black mb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400 text-sm text-white">
          D
        </div>
        DESKIO
      </div>

      {/* DASHBOARD */}
      <Link
        href="/admin"
        className={`${base} ${
          path === "/admin" ? active : "border-l-4 border-transparent"
        }`}
      >
        <Home size={18} />
        Dashboard
      </Link>

      {/* PRODUCTS */}
      <button
        onClick={() => setOpenProducts(!openProducts)}
        className={`${base} w-full cursor-pointer ${
          path.startsWith("/admin/products")
            ? active
            : "border-l-4 border-transparent"
        }`}
      >
        <Box size={18} />
        Products
        <span className="ml-auto cursor-pointer">
          {openProducts ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      <div
        className={`ml-6 overflow-hidden transition-all duration-300 ${
          openProducts ? "max-h-40" : "max-h-0"
        }`}
      >
        <Link
          href="/admin/products"
          className={`block px-4 py-1.5 rounded-md text-sm hover:bg-gray-100 ${
            path === "/admin/products" ? "text-black font-semibold" : ""
          }`}
        >
          All Products
        </Link>

        <Link
          href="/admin/products/add"
          className={`flex items-center gap-1 px-4 py-1.5 rounded-md text-sm hover:bg-gray-100 ${
            path === "/admin/products/add" ? "text-black font-semibold" : ""
          }`}
        >
          <Plus size={14} />
          Add Product
        </Link>
      </div>

      {/* ORDERS */}
      <Link
        href="/admin/orders"
        className={`${base} ${
          path === "/admin/orders" ? active : "border-l-4 border-transparent"
        }`}
      >
        <ShoppingCart size={18} />
        Orders
      </Link>

      {/* USERS */}
      <Link
        href="/admin/users"
        className={`${base} ${
          path === "/admin/users" ? active : "border-l-4 border-transparent"
        }`}
      >
        <Users size={18} />
        Users
      </Link>

      {/* SETTINGS */}
      <Link
        href="/admin/settings"
        className={`${base} ${
          path === "/admin/settings" ? active : "border-l-4 border-transparent"
        }`}
      >
        <Settings size={18} />
        Settings
      </Link>
    </aside>
  );
}
