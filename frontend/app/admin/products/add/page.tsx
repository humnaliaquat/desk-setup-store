"use client";

import React, { ChangeEvent, DragEvent, useState } from "react";
import {
  Images,
  UploadCloud,
  X,
  Calendar,
  Tag,
  Plus,
  Trash2,
  Info,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

type Product = {
  name: string;
  description: string;
  tags: string[];
  category: string;
  price: number;
  images: File[];
  dateAdded?: string;
};

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    images: [],
    tags: [],
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Handle image selection via input
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length !== files.length) {
      setMessage({ type: "error", text: "Only image files are allowed." });
    }

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles].slice(0, 10), // Limit to 10 images
    }));
  };

  // Handle drag and drop
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer.files) return;

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles].slice(0, 10),
    }));
  };

  // Remove image
  const removeImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Add tag on Enter
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      const trimmed = newTag.trim().toLowerCase();
      if (!product.tags.includes(trimmed)) {
        setProduct((prev) => ({
          ...prev,
          tags: [...prev.tags, trimmed],
        }));
      }
      setNewTag("");
    }
  };

  // Remove tag
  const removeTag = (tag: string) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "price") {
      setProduct((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit product to backend
  const handleSubmit = async () => {
    if (
      !product.name ||
      !product.category ||
      product.price <= 0 ||
      !product.description
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (product.images.length === 0) {
      setMessage({ type: "error", text: "Please upload at least one image." });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      formData.append("category", product.category);
      formData.append("dateAdded", format(selectedDate, "yyyy-MM-dd"));

      product.tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      product.images.forEach((file) => {
        formData.append("images", file); // MUST match multer key
      });

      await axios.post("http://localhost:5000/api/products", formData);

      setMessage({ type: "success", text: "Product successfully added!" });

      setProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        images: [],
        tags: [],
      });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Upload failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 text-sm">
          Fill in the details to list a new product in your store.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <Info size={20} />
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Image Upload Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <Images className="w-6 h-6 text-blue-600" />
              Product Images
            </h2>
            <span className="text-sm font-medium text-gray-500">
              {product.images.length}{" "}
              {product.images.length === 1 ? "image" : "images"}
            </span>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-gray-400 hover:bg-gray-50 transition cursor-pointer group"
          >
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              id="imageUpload"
              onChange={handleImageChange}
            />
            <label htmlFor="imageUpload" className="cursor-pointer">
              <UploadCloud className="w-16 h-16 mx-auto text-gray-400 group-hover:text-gray-600 transition" />
              <p className="text-lg font-medium text-gray-700 mt-4 mb-2">
                Drop images here or{" "}
                <span className="text-blue-600 font-semibold hover:underline">
                  browse
                </span>
              </p>
              <p className="text-sm text-gray-500">
                JPG, PNG, WebP • Up to 10MB each • Max 10 images
              </p>
            </label>
          </div>

          {/* Image Previews */}
          {product.images.length > 0 && (
            <div className="mt-6 space-y-4">
              <p className="text-sm font-medium text-gray-700">
                Uploaded Images
              </p>
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 truncate max-w-xs">
                        {img.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(img.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeImage(index)}
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
                name="name"
                id="name"
                type="text"
                value={product.name}
                onChange={handleChange}
                placeholder="e.g. Keychron K2 Mechanical Keyboard"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                name="category"
                id="category"
                value={product.category}
                onChange={handleChange}
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
                  name="price"
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={product.price || ""}
                  onChange={handleChange}
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
                  {product.description.length}/1000
                </span>
              </div>
              <textarea
                name="description"
                id="description"
                rows={6}
                value={product.description}
                onChange={handleChange}
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
                {product.tags.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">
                    No tags added yet
                  </p>
                ) : (
                  product.tags.map((tag) => (
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
            <button
              type="button"
              disabled={isLoading}
              className="px-6 py-3.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3.5 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Publishing...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Publish Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
