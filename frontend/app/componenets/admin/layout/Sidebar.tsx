"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Box, ShoppingCart, Users, Settings, Plus } from "lucide-react";

export default function Sidebar() {
  const path = usePathname();
  const [openProducts, setOpenProducts] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      {/* Dashboard */}
      <Link
        href="/admin"
        className={`flex items-center gap-2 px-4 py-2 rounded mb-2 hover:bg-gray-800 ${
          path === "/admin" ? "bg-gray-700" : ""
        }`}
      >
        <Home size={18} />
        Dashboard
      </Link>

      {/* Products */}
      <button
        onClick={() => setOpenProducts(!openProducts)}
        className={`flex items-center gap-2 px-4 py-2 rounded mb-2 w-full hover:bg-gray-800 ${
          path.startsWith("/admin/products") ? "bg-gray-700" : ""
        }`}
      >
        <Box size={18} />
        Products
        <span className="ml-auto">{openProducts ? "▲" : "▼"}</span>
      </button>

      {openProducts && (
        <div className="ml-6 flex flex-col">
          <Link
            href="/admin/products"
            className={`px-4 py-1 rounded mb-1 hover:bg-gray-800 ${
              path === "/admin/products" ? "bg-gray-700" : ""
            }`}
          >
            All Products
          </Link>
          <Link
            href="/admin/products/add"
            className={`px-4 py-1 rounded mb-1 hover:bg-gray-800 ${
              path === "/admin/products/add" ? "bg-gray-700" : ""
            }`}
          >
            <Plus size={14} className="inline mr-1" />
            Add Product
          </Link>
        </div>
      )}

      {/* Orders */}
      <Link
        href="/admin/orders"
        className={`flex items-center gap-2 px-4 py-2 rounded mb-2 hover:bg-gray-800 ${
          path === "/admin/orders" ? "bg-gray-700" : ""
        }`}
      >
        <ShoppingCart size={18} />
        Orders
      </Link>

      {/* Users */}
      <Link
        href="/admin/users"
        className={`flex items-center gap-2 px-4 py-2 rounded mb-2 hover:bg-gray-800 ${
          path === "/admin/users" ? "bg-gray-700" : ""
        }`}
      >
        <Users size={18} />
        Users
      </Link>

      {/* Settings */}
      <Link
        href="/admin/settings"
        className={`flex items-center gap-2 px-4 py-2 rounded mb-2 hover:bg-gray-800 ${
          path === "/admin/settings" ? "bg-gray-700" : ""
        }`}
      >
        <Settings size={18} />
        Settings
      </Link>
    </aside>
  );
}
