"use client";
import React, { useState } from "react";
import {
  ImagePlus,
  X,
  Boxes,
  FolderPlus,
  LayoutGrid,
  ShoppingBagIcon,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import Link from "next/link";

const MOCK_PRODUCTS = [
  { id: 1, name: "Mechanical Keyboard" },
  { id: 2, name: "Desk Lamp" },
  { id: 3, name: "Monitor Stand" },
  { id: 4, name: "Wireless Mouse" },
];

export default function AddCollection() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const filteredProducts = MOCK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-11 py-6 w-full flex flex-col">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <Link href={"/admin/products/collection"} className="cursor-pointer">
            <Layers className="w-5 h-5 text-orange-400" />
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            Collection Name
          </h1>
        </div>
      </div>

      {/* GRID */}
      <form className="flex-1 grid grid-cols-1 lg:grid-cols-10 gap-8 w-full">
        {/* LEFT SIDE (70%) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            {/* Collection Name */}
            <div>
              <label className="block text-sm text-stone-800 font-medium mb-1">
                Collection Name
              </label>
              <input
                type="text"
                placeholder="e.g. Minimal Workspace"
                className="w-full rounded-lg border border-stone-400 px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-stone-800 font-medium mb-1">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe this collection..."
                className="w-full rounded-lg border border-stone-400 px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Add Products */}
            <div>
              <label className="block text-sm text-stone-800 font-medium mb-2">
                Add Products
              </label>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-3 rounded-lg border-stone-400  border px-4 py-2 text-sm"
              />

              <div className="max-h-56 overflow-y-auto border  border-stone-400 rounded-lg divide-y divide-stone-400">
                {filteredProducts.map((product) => (
                  <label
                    key={product.id}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-stone-50"
                  >
                    <input
                      type="checkbox"
                      className="accent-orange-400 cursor-pointer"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProduct(product.id)}
                    />
                    <span className="text-sm">{product.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Selected Products */}
            {selectedProducts.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Selected Products</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProducts.map((id) => {
                    const product = MOCK_PRODUCTS.find((p) => p.id === id);
                    return (
                      <span
                        key={id}
                        className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-xs"
                      >
                        {product?.name}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => toggleProduct(id)}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE (30%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Cover Image */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <label className="block text-sm font-medium mb-3">
              Cover Image
            </label>
            <div className="flex items-center justify-center border-2 border-dashed border-stone-400 rounded-xl p-6 cursor-pointer hover:border-orange-400 transition">
              <div className="flex flex-col items-center gap-2 text-stone-500">
                <ImagePlus className="w-6 h-6" />
                <p className="text-xs text-center">Upload cover image</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <label className="block text-sm font-medium mb-2 text-stone-800">
              Status
            </label>
            <select className="w-full rounded-lg border border-stone-400 px-4 py-2.5 text-sm focus:border-orange-400 focus:border-2 cursor-pointer">
              <option>Active</option>
              <option>Draft</option>
            </select>
          </div>
        </div>
      </form>
      {/* Actions */}
      <div className="mt-13 flex gap-3 justify-end">
        <button
          type="button"
          className="px-6 py-2.5 rounded-lg border border-stone-300 hover:bg-stone-100 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-orange-400 text-white font-semibold hover:brightness-110 cursor-pointer"
        >
          Create Collection
        </button>
      </div>
    </div>
  );
}
