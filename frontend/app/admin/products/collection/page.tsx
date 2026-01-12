"use client";
import React, { useState } from "react";
import { ImagePlus, X, Layers } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 px-6 md:px-6 py-6 w-full">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-orange-400" />
          <h1 className="text-lg md:text-xl font-bold text-gray-900">
            Collections
          </h1>
        </div>
        <button className="bg-stone-300 text-stone-800 font-bold text-sm px-4 py-2 rounded-full">
          Add Collection
        </button>
      </div>

      {/* GRID */}
      <form className="grid grid-cols-1 lg:grid-cols-10 gap-8 w-full">
        {/* LEFT SIDE (70%) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            {/* Collection Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Collection Name
              </label>
              <input
                type="text"
                placeholder="e.g. Minimal Workspace"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe this collection..."
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Add Products */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Add Products
              </label>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-3 rounded-lg border-gray-200  border px-4 py-2 text-sm"
              />

              <div className="max-h-56 overflow-y-auto border  border-gray-200 rounded-lg divide-y">
                {filteredProducts.map((product) => (
                  <label
                    key={product.id}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
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
                        className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs"
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
          <div className="bg-white rounded-2xl border p-6">
            <label className="block text-sm font-medium mb-3">
              Cover Image
            </label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-orange-400 transition">
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <ImagePlus className="w-6 h-6" />
                <p className="text-xs text-center">Upload cover image</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl border p-6">
            <label className="block text-sm font-medium mb-2">Status</label>
            <select className="w-full rounded-lg border px-4 py-2.5 text-sm">
              <option>Active</option>
              <option>Draft</option>
            </select>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl border p-6 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-orange-400 text-white font-semibold hover:brightness-110"
            >
              Create Collection
            </button>
            <button
              type="button"
              className="w-full py-2.5 rounded-full border hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
