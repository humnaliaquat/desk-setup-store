"use client";

import React, { useState } from "react";
import {
  Images,
  UploadCloud,
  X,
  Calendar,
  Tag,
  Plus,
  Trash2,
  Info,
} from "lucide-react";
import { format } from "date-fns";

export default function AddProduct() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tags, setTags] = useState<string[]>(["mechanical", "rgb", "wireless"]);
  const [newTag, setNewTag] = useState("");
  const [description, setDescription] = useState(
    "Premium mechanical keyboard with hot-swappable switches, RGB backlighting, and aluminum frame. Perfect for typing and gaming."
  );

  // Simulated uploaded images
  const [uploadedImages] = useState([
    { id: 1, name: "keyboard-front.jpg", size: "2.4 MB" },
    { id: 2, name: "keyboard-side.jpg", size: "1.8 MB" },
    { id: 3, name: "keyboard-top.jpg", size: "3.1 MB" },
  ]);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      const trimmed = newTag.trim().toLowerCase();
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
      }
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In real app: handle files here
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600  text-sm">
          Fill in the details to list a new product in your store.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Image Upload Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <Images className="w-6 h-6 text-blue-600" />
              Product Images
            </h2>
            <span className="text-sm font-medium text-gray-500">
              {uploadedImages.length} images
            </span>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-gray-400 hover:bg-gray-50 transition cursor-pointer group"
          >
            <UploadCloud className="w-14 h-14 text-gray-400 mx-auto mb-4 group-hover:text-gray-600 transition" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop images here or{" "}
              <span className="text-blue-600 font-semibold hover:underline">
                browse
              </span>
            </p>
            <p className="text-sm text-gray-500">
              JPG, PNG, WebP • Up to 10MB each • At least 800x800px recommended
            </p>
          </div>

          {/* Image Previews */}
          {uploadedImages.length > 0 && (
            <div className="mt-6 space-y-4">
              <p className="text-sm font-medium text-gray-700">
                Uploaded Images
              </p>
              {uploadedImages.map((img) => (
                <div
                  key={img.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center shrink-0">
                      <Images className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 truncate max-w-xs">
                        {img.name}
                      </p>
                      <p className="text-sm text-gray-500">{img.size}</p>
                    </div>
                  </div>
                  <button
                    aria-label="Remove image"
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            Product Details
          </h2>

          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Keychron K2 Mechanical Keyboard"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select a category</option>
                <option>Keyboards</option>
                <option>Mouse</option>
                <option>Desk Mats</option>
                <option>Lamps</option>
                <option>Accessories</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-500 font-medium">
                  $
                </span>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="99.99"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Date Added */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5  items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date Added
              </label>
              <input
                type="date"
                value={format(selectedDate, "yyyy-MM-dd")}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-gray-500">
                  {description.length}/1000
                </span>
              </div>
              <textarea
                id="description"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product: features, materials, compatibility, benefits..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Info size={14} />
                Use clear, benefit-focused language to help customers decide.
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3  items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags (optional)
              </label>

              <div className="flex flex-wrap gap-2 mb-4">
                {tags.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">
                    No tags added yet
                  </p>
                ) : (
                  tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:bg-blue-300 rounded-full p-1 transition"
                        aria-label={`Remove tag ${tag}`}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))
                )}
              </div>

              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={addTag}
                placeholder="Add a tag and press Enter (e.g. gaming, compact)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-gray-200">
            <button className="px-6 py-3.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button className="px-8 py-3.5 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition flex items-center gap-2 shadow-md">
              <Plus size={20} />
              Publish Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
