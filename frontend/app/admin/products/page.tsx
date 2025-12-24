"use client";

import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Link from "next/link";

// Define types properly
type Variant = {
  name: string;
  price?: number;
  stock: number;
};

type Product = {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft";
  images: { url: string; public_id: string }[];
  variants: Variant[];
  createdAt: string;
};

const ITEMS_PER_PAGE = 5;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/products/get"); // Fixed double slash
        setProducts(res.data.data || res.data); // Adjust based on your API response structure
        setError(null);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate stats safely
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "Active").length;
  const draftProducts = products.filter((p) => p.status === "Draft").length;
  const lowStock = products.filter((p) => {
    // Use variants total stock if available, otherwise use main stock
    if (p.variants.length > 0) {
      return p.variants.reduce((sum, v) => sum + v.stock, 0) < 50;
    }
    return p.stock < 50;
  }).length;

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

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 text-red-800 p-4 rounded-xl">
          Error: {error}
        </div>
      </div>
    );
  }

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
            <Link
              href={"/admin/products/add"}
              className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full hover:brightness-110 transition shadow-md cursor-pointer"
            >
              <Plus size={18} />
              Add Product
            </Link>
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
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => {
                  const totalVariantStock = product.variants.reduce(
                    (sum, v) => sum + v.stock,
                    0
                  );
                  const displayStock =
                    product.variants.length > 0
                      ? totalVariantStock
                      : product.stock;

                  return (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                            {product.images[0] ? (
                              <img
                                src={product.images[0].url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300 border-2 border-dashed border-gray-400" />
                            )}
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
                        {product.variants.length}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={
                            displayStock < 50
                              ? "text-red-600 font-medium"
                              : "text-gray-700"
                          }
                        >
                          {displayStock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <button
                            aria-label="Edit"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            aria-label="Delete"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            aria-label="More"
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}

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
