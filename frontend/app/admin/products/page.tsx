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
  AlertTriangle,
  ShoppingBag,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import EditProductModal from "@/app/componenets/ui/EditProductModal";
import Product from "@/app/types/Product";

const ITEMS_PER_PAGE = 5;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const previousProductsRef = React.useRef<Product[]>([]);

  //delete project by id

  const deleteProduct = async () => {
    if (!productToDelete) return;

    // save previous state (for rollback)
    previousProductsRef.current = products;

    //optimistic UI update
    setProducts((prev) => prev.filter((p) => p._id !== productToDelete));

    setShowModal(false);

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${productToDelete}`
      );

      setProductToDelete(null);
    } catch (err: any) {
      console.error("Delete failed, rolling back...", err);

      // rollback
      setProducts(previousProductsRef.current);

      setError(err.response?.data?.message || "Failed to delete product");
    }
  };
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedData: Partial<Product>) => {
    if (!editProduct) return;

    // include original images and variants so table code won't break
    const dataToSave = { ...editProduct, ...updatedData };

    // Optimistic UI
    setProducts((prev) =>
      prev.map((p) => (p._id === editProduct._id ? dataToSave : p))
    );

    setShowEditModal(false);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        updatedData
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === editProduct._id ? res.data : p))
      );
    } catch (err: any) {
      console.error("Update failed", err);
      // rollback if failed
      setProducts((prev) =>
        prev.map((p) => (p._id === editProduct._id ? editProduct : p))
      );
      setError(err.response?.data?.message || "Failed to update product");
    }
  };

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/products/get"); // Fixed double slash
        setProducts(
          (res.data.data || res.data).map((p: Product) => ({
            ...p,
            variants: p.variants || [],
            images: p.images || [],
          }))
        );

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
  const totalProducts = products?.length || 0;
  const activeProducts =
    products?.filter((p) => p.status === "Active")?.length || 0;
  const draftProducts =
    products?.filter((p) => p.status === "Draft")?.length || 0;
  const lowStock =
    products?.filter((p) => {
      const variants = p.variants || [];
      if (variants.length > 0) {
        return variants.reduce((sum, v) => sum + (v.stock || 0), 0) < 50;
      }
      return p.stock < 50;
    })?.length || 0;

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
        <div className="text-stone-600">Loading products...</div>
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
      <header className="mb-5">
        <h1 className="text-xl font-bold text-stone-900">All Products</h1>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm  transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">{stat.title}</p>
                <p className="text-3xl font-bold text-stone-900 mt-2">
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
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        {/* Table Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-stone-200">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-sm font-medium"
            />
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <Link
              href={"/admin/products/add"}
              className="flex items-center gap-2 px-6 py-2 bg-stone-500 text-gray-200 text-sm rounded-full hover:bg-stone-600 hover:text-white transition shadow-md cursor-pointer font-medium "
            >
              <Plus size={18} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded border-stone-300" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 ">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-800">
                  Variants
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-800">
                  Inventory
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-800">
                  Date Added
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-stone-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center justify-center flex items-center text-stone-500"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => {
                  const totalVariantStock = (product.variants || []).reduce(
                    (sum, v) => sum + v.stock,
                    0
                  );
                  const displayStock =
                    (product.variants?.length || 0) > 0
                      ? totalVariantStock
                      : product.stock;

                  return (
                    <tr
                      key={product._id}
                      className="hover:bg-stone-50 transition"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-stone-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-stone-200 rounded-lg overflow-hidden shrink-0">
                            {product.images?.[0]?.url ? (
                              <img src={product.images[0].url} />
                            ) : (
                              <div className="w-full h-full bg-stone-300 border-2 border-dashed border-stone-400" />
                            )}
                          </div>
                          <div className="font-medium text-stone-900">
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
                        {(product.variants || []).length}
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
                      <td className="px-6 py-4 text-sm text-stone-600">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <button
                            aria-label="Edit"
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            onClick={() => handleEditClick(product)}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            aria-label="Delete"
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            onClick={() => {
                              setProductToDelete(product._id);
                              setShowModal(true);
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="flex flex-col bg-white rounded-2xl p-6 w-[420px] gap-4 shadow-xl">
                <div className="flex justify-center">
                  <div className="bg-red-100 p-3 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>

                <h1 className="text-xl font-semibold text-center text-gray-900">
                  Are you sure?
                </h1>

                <p className="text-center text-stone-600 text-sm">
                  Are you sure you want to delete this product? This action
                  cannot be undone.
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                    disabled={loading}
                    onClick={deleteProduct}
                  >
                    Delete Product
                  </button>

                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-stone-300 py-2 rounded-lg hover:bg-stone-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-stone-200 gap-4">
          <p className="text-sm text-stone-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, totalProducts)} of{" "}
            {totalProducts} products
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-stone-300 disabled:opacity-50 hover:bg-stone-50 transition cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition ${
                  currentPage === page
                    ? "bg-stone-800 hover:bg-stone-900 text-white"
                    : "border border-stone-300 hover:bg-stone-100"
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
              className="p-2 rounded-lg border border-stone-300 disabled:opacity-50 hover:bg-stone-50 transition disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <EditProductModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        product={editProduct}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
