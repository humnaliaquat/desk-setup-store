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
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    status: "Active",
    variants: 3,
    inventory: 120,
    date: "2024-11-12",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    status: "Draft",
    variants: 2,
    inventory: 80,
    date: "2024-10-05",
  },
  {
    id: 3,
    name: "Desk Mat XL",
    status: "Active",
    variants: 5,
    inventory: 40,
    date: "2024-09-21",
  },
  // Add more products to demonstrate pagination (total 12 for example)
  {
    id: 4,
    name: "RGB Gaming Mousepad",
    status: "Active",
    variants: 1,
    inventory: 65,
    date: "2024-08-15",
  },
  {
    id: 5,
    name: "Ergonomic Chair",
    status: "Draft",
    variants: 4,
    inventory: 15,
    date: "2024-07-20",
  },
  // ... imagine more items up to 12+
];

const ITEMS_PER_PAGE = 5;

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Categories</option>
            <option>Keyboards</option>
            <option>Mice</option>
            <option>Desk Mats</option>
            <option>Lamps</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Brand
          </label>
          <select
            id="brand"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Brands</option>
            <option>Logitech</option>
            <option>Keychron</option>
            <option>Razer</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <p className="text-sm text-gray-500 mt-1">
              {products.length} products
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
            </div>

            <button className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
              <ArrowUpDown size={18} />
              Sort
            </button>

            <button className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
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
                    <div className="font-medium text-gray-900">
                      {product.name}
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
                  <td className="px-6 py-4 text-gray-600">
                    {product.variants}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.inventory}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {product.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        aria-label="Edit product"
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        aria-label="Delete product"
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        aria-label="More options"
                        className="text-gray-500 hover:text-gray-700 transition"
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
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of{" "}
            {products.length} products
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
