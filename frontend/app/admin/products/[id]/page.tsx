"use client";

import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
import {
  Images,
  UploadCloud,
  X,
  Tag,
  Plus,
  Trash2,
  Info,
  Loader2,
  Layers,
  ToggleLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
type Variant = {
  name: string;
  price?: number;
  stock: number;
};
type ImageType = {
  url: string;
  public_id: string;
};
type Product = {
  name: string;
  description: string;
  tags: string[];
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft";
  images: File[];
  imageUrls: ImageType[];
  variants: Variant[];
};

export default function ViewAndEditProduct() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    status: "Active",
    images: [],
    imageUrls: [],
    tags: [],
    variants: [],
  });

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        const p = data.product; // <-- grab the product object
        setProduct({
          name: p.name ?? "",
          description: p.description ?? "",
          price: p.price ?? 0,
          category: p.category ?? "",
          stock: p.stock ?? 0,
          status: p.status ?? "Active",
          images: [],
          imageUrls: p.images || [],
          tags: p.tags || [],
          variants: p.variants || [],
        });
      } catch (err: any) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to load product",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  // Image handlers
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 12),
    }));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 12),
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
    if (!newVariant.name.trim() || !newVariant.stock) return;

    const variant: Variant = {
      name: newVariant.name.trim(),
      price: newVariant.price ? parseFloat(newVariant.price) : undefined,
      stock: parseInt(newVariant.stock, 10),
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

  // General input handler
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock"
          ? value
            ? parseFloat(value)
            : 0
          : value,
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

    if (product.images.length === 0 && product.imageUrls.length === 0) {
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
      formData.append("status", product.status);
      formData.append("existingImages", JSON.stringify(product.imageUrls));
      formData.append("variants", JSON.stringify(product.variants));
      product.tags.forEach((tag) => formData.append("tags[]", tag));
      product.images.forEach((img) => formData.append("images", img));

      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ type: "success", text: "Product updated successfully!" });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update product",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 px-12 max-w-7xl mx-auto">
      {isLoading && <Loader2 className="animate-spin text-orange-400" />}
      {/* Breadcrumb */}
      <div className="mb-6 flex gap-2 items-center">
        <Link href={"/admin/products"} className="cursor-pointer">
          <Layers className="w-5 h-5 text-orange-400" />
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
        <h1 className="text-xl font-semibold text-stone-800">
          {product.name || "Loading..."}
        </h1>
      </div>

      {message && (
        <div
          className={`mb-8 p-4 rounded-lg flex items-center gap-3 ${
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
        <div className="bg-white border border-stone-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <Images className="text-orange-400" />
            Product Images
          </h2>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-stone-400 rounded-lg p-12 text-center hover:border-orange-500 transition cursor-pointer"
          >
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              id="imageUpload"
              onChange={handleImageChange}
            />
            <label htmlFor="imageUpload" className="cursor-pointer block">
              <UploadCloud className="w-16 h-16 mx-auto text-stone-400 mb-4" />
              <p className="text-lg font-medium">
                Drag & drop or click to upload
              </p>
              <p className="text-sm text-stone-500 mt-2">
                Max 10 images • JPG, PNG, WebP
              </p>
            </label>
          </div>

          {(product.imageUrls.length > 0 || product.images.length > 0) && (
            <div className="mt-6">
              <p className="text-sm font-medium text-stone-700 mb-3">
                Uploaded ({product.images.length + product.imageUrls.length}/12)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Existing images from API */}
                {product.imageUrls.map((img, i) => (
                  <div key={`url-${i}`} className="relative group">
                    <img
                      src={img.url}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      onClick={() =>
                        setProduct((prev) => ({
                          ...prev,
                          imageUrls: prev.imageUrls.filter(
                            (_, idx) => idx !== i
                          ),
                        }))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}

                {/* Newly uploaded images */}
                {product.images.map((img, i) => (
                  <div key={`file-${i}`} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
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

        {/* Product Form */}
        <div className="bg-white border border-stone-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Product Information</h2>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={product.name ?? ""}
                onChange={handleChange}
                placeholder="e.g. Keychron K2 Mechanical Keyboard"
                className="w-full px-4 py-3 border border-stone-400 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={product.category ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-400 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
              >
                <option value="">Select category</option>
                <option>Keyboards</option>
                <option>Mouse</option>
                <option>Desk Mats</option>
                <option>Lamps</option>
                <option>Accessories</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className=" text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                <ToggleLeft size={18} />
                Status
              </label>
              <select
                name="status"
                value={product.status ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-400 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Base Price */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Base Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">
                  $
                </span>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={product.price || 0}
                  onChange={handleChange}
                  placeholder="99.99"
                  className="w-full pl-10 pr-4 py-3 border border-stone-400 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            {/* Total Stock (if no variants) */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Total Inventory (without variants)
              </label>
              <input
                name="stock"
                type="number"
                min="0"
                value={product.stock || 0}
                onChange={handleChange}
                placeholder="e.g. 100"
                className="w-full px-4 py-3 border border-stone-400 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            {/* Variants */}
            <div>
              <label className=" text-sm font-medium text-stone-700 mb-3 flex items-center gap-2">
                <Layers size={18} />
                Product Variants (optional)
              </label>

              {product.variants?.length > 0 && (
                <div className="space-y-3 mb-4">
                  {product.variants.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-stone-50 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{v.name}</p>
                        <p className="text-sm text-stone-600">
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

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  name="name"
                  value={newVariant.name ?? ""}
                  onChange={handleVariantChange}
                  placeholder="Variant name (e.g. Black / M)"
                  className="flex-1 px-4 py-3 border border-stone-400 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />

                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={newVariant.stock ?? 0}
                  onChange={handleVariantChange}
                  placeholder="Stock"
                  className="w-28 px-4 py-3 border border-stone-400 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <button
                  type="button"
                  onClick={addVariant}
                  className="px-4 py-3 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition cursor-pointer"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={product.description ?? ""}
                onChange={handleChange}
                rows={5}
                placeholder="Describe features, materials, compatibility..."
                className="w-full px-4 py-3 border border-stone-400 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                maxLength={1000}
              />
              <p className="text-xs text-stone-500 mt-2">
                {product.description?.length}/1000 characters
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Tag size={18} />
                  Tags (optional)
                </div>
                <p className="text-xs text-stone-500 flex items-center gap-1">
                  <Info size={14} />
                  Add <span className="font-semibold">"featured"</span> for
                  featured section or{" "}
                  <span className="font-semibold">"bestseller"</span> for best
                  sellers section.
                </p>
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-1"
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
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10 pt-6 border-t border-stone-200">
            <button
              type="button"
              onClick={() => {
                setProduct({
                  name: "",
                  description: "",
                  price: 0,
                  category: "",
                  stock: 0,
                  status: "Active",
                  images: [],
                  imageUrls: [],
                  tags: [],
                  variants: [],
                });
                setNewVariant({ name: "", price: "", stock: "" });
                setNewTag("");
                setMessage(null);
              }}
              className="px-6 py-3 border border-stone-300 rounded-lg text-stone-700 cursor-pointer hover:bg-gray-50 transition"
            >
              Clear Form
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 bg-orange-400 text-white rounded-lg font-medium flex items-center gap-2 shadow-md hover:bg-orange-500 cursor-pointer transition disabled:opacity-50"
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
