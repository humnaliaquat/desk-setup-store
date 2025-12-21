"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  ArrowUpDown,
  MoreVertical,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Package,
  CheckCircle,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    status: "Active",
    variants: 3,
    inventory: 120,
    date: "2024-11-12",
    image: "/keyboard.jpg",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    status: "Draft",
    variants: 2,
    inventory: 80,
    date: "2024-10-05",
    image: "/mouse.jpg",
  },
  {
    id: 3,
    name: "Desk Mat XL",
    status: "Active",
    variants: 5,
    inventory: 40,
    date: "2024-09-21",
    image: "/desmat.jpg",
  },
  {
    id: 4,
    name: "RGB Gaming Mousepad",
    status: "Active",
    variants: 1,
    inventory: 65,
    date: "2024-08-15",
    image: "/mousepad.jpg",
  },
  {
    id: 5,
    name: "Ergonomic Chair",
    status: "Draft",
    variants: 4,
    inventory: 15,
    date: "2024-07-20",
    image: "/chair.jpg",
  },
  // Add more for testing pagination...
];

const ITEMS_PER_PAGE = 5;

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "Active").length;
  const draftProducts = products.filter((p) => p.status === "Draft").length;
  const lowStock = products.filter((p) => p.inventory < 50).length;

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "blue",
    },
    {
      title: "Active Listings",
      value: activeProducts,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Draft Products",
      value: draftProducts,
      icon: AlertCircle,
      color: "yellow",
    },
    {
      title: "Low Stock Alert",
      value: lowStock,
      icon: ShoppingBag,
      color: "red",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-600 text-sm">
          Manage your store inventory and listings
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-gray-200">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition cursor-pointer">
              <ArrowUpDown size={18} />
              Sort
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full hover:brightness-125 transition shadow-md cursor-pointer">
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Variants
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Inventory
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Date Added
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                        <div className="w-full h-full bg-gray-300 border-2 border-dashed border-gray-400" />
                        {/* Replace with real image: <img src={product.image} alt="" className="object-cover" /> */}
                      </div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {product.variants}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        product.inventory < 50
                          ? "text-red-600 font-medium"
                          : "text-gray-700"
                      }
                    >
                      {product.inventory}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        aria-label="Edit"
                        className="text-gray-500 cursor-pointer hover:text-gray-600"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        aria-label="Delete"
                        className="text-red-600 cursor-pointer hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        aria-label="More"
                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 gap-4">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, totalProducts)} of{" "}
            {totalProducts} products
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Smart pagination: show first, last, current ±1, and ellipsis */}
            {totalPages > 7 ? (
              <>
                {currentPage > 3 && <span className="px-3 py-1">...</span>}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page = i + 1;
                  if (currentPage > 3) page = currentPage - 2 + i;
                  if (page > totalPages) return null;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-black text-white"
                          : "border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                {currentPage < totalPages - 2 && (
                  <span className="px-3 py-1">...</span>
                )}
              </>
            ) : (
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
