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
  Layers,
} from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

type Variant = {
  name: string; // e.g. "Black / M", "White / 40"
  price?: number;
  stock: number;
};

type Product = {
  name: string;
  description: string;
  tags: string[];
  category: string;
  price: number; // base price
  images: File[];
  stock: number;
  variants: Variant[];
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
    stock: 0,
    variants: [],
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newTag, setNewTag] = useState("");
  const [newVariant, setNewVariant] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10),
    }));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10),
    }));
  };

  const removeImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Tags
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      const trimmed = newTag.trim().toLowerCase();
      if (!product.tags.includes(trimmed)) {
        setProduct((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
      }
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Variants
  const addVariant = () => {
    if (!newVariant.name || !newVariant.stock) return;
    const variant: Variant = {
      name: newVariant.name.trim(),
      price: newVariant.price ? parseFloat(newVariant.price) : undefined,
      stock: parseInt(newVariant.stock),
    };
    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, variant],
    }));
    setNewVariant({ name: "", price: "", stock: "" });
  };

  const removeVariant = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  // Form changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleVariantChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVariant((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async () => {
    if (
      !product.name ||
      !product.category ||
      product.price <= 0 ||
      !product.description
    ) {
      setMessage({ type: "error", text: "Please fill all required fields." });
      return;
    }
    if (product.images.length === 0) {
      setMessage({ type: "error", text: "At least one image is required." });
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
      formData.append("stock", product.stock.toString());

      formData.append("dateAdded", format(selectedDate, "yyyy-MM-dd"));
      product.tags.forEach((tag) => formData.append("tags[]", tag));
      product.images.forEach((img) => formData.append("images", img));

      // Send variants as JSON string (or adjust backend to handle multiple fields)
      formData.append("variants", JSON.stringify(product.variants));

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ type: "success", text: "Product added successfully!" });
      // Reset form
      setProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        images: [],
        tags: [],
        variants: [],
        stock: 0,
      });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to add product",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-2">
          Create a new product listing for your store.
        </p>
      </div>

      {message && (
        <div
          className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          <Info size={20} />
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <Images className="text-blue-600" />
            Product Images
          </h2>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition"
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
              <UploadCloud className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium">
                Drag & drop or click to upload
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Max 10 images • JPG, PNG, WebP
              </p>
            </label>
          </div>

          {product.images.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Uploaded ({product.images.length}/10)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {product.images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-xl border"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Product Information</h2>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="e.g. Keychron K2 Mechanical Keyboard"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select category</option>
                <option>Keyboards</option>
                <option>Mouse</option>
                <option>Desk Mats</option>
                <option>Lamps</option>
                <option>Accessories</option>
              </select>
            </div>

            {/* Base Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={product.price || ""}
                  onChange={handleChange}
                  placeholder="99.99"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Inventory Quantity (for no variants) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Inventory
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. 50"
              />
            </div>

            {/* Variants */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Layers size={18} />
                Product Variants
              </label>

              {product.variants.length > 0 && (
                <div className="space-y-3 mb-4">
                  {product.variants.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-xl"
                    >
                      <div>
                        <p className="font-medium">{v.name}</p>
                        <p className="text-sm text-gray-600">
                          {v.price ? `$${v.price}` : "Same as base"} • Stock:{" "}
                          {v.stock}
                        </p>
                      </div>
                      <button onClick={() => removeVariant(i)}>
                        <Trash2
                          size={18}
                          className="text-red-500 hover:text-red-700"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new variant */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  name="name"
                  value={newVariant.name}
                  onChange={handleVariantChange}
                  placeholder="e.g. Black / M"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  placeholder="Stock"
                  className="w-28 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={addVariant}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe features, materials, compatibility..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-2">
                {product.description.length}/1000 characters
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Tag size={18} />
                Tags (optional)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={addTag}
                placeholder="Type tag and press Enter"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setProduct({
                  name: "",
                  description: "",
                  price: 0,
                  category: "",
                  images: [],
                  stock: 0,
                  tags: [],
                  variants: [],
                });
                setMessage(null);
              }}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
            >
              Clear Form
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 bg-black text-white rounded-xl font-medium flex items-center gap-2 shadow-md hover:bg-gray-800 transition disabled:opacity-50"
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
