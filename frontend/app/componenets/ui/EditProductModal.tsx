"use client";
import React, { useState, useEffect } from "react";
import Product from "@/app/types/Product";
import Modal from "./Modal";

type EditProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Partial<Product>) => void;
};

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onSave,
}: EditProductModalProps) {
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    price: 0,
    stock: 0,
    status: "Active",
    images: [],
    variants: [],
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
        status: product.status,
        images: product.images || [],
        variants: product.variants || [],
      });
    }
  }, [product]);

  const handleBasicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) || 0 : value,
    }));
  };

  // ── Images ───────────────────────────────────────────────
  const addImage = () => {
    setForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), { url: "" }],
    }));
  };

  const updateImage = (index: number, url: string) => {
    setForm((prev) => {
      const newImages = [...(prev.images || [])];
      newImages[index] = { ...newImages[index], url };
      return { ...prev, images: newImages };
    });
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  // ── Variants ─────────────────────────────────────────────
  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [
        ...(prev.variants || []),
        { name: "", stock: 0, price: undefined },
      ],
    }));
  };

  const updateVariant = (
    index: number,
    field: "name" | "stock" | "price",
    value: string | number
  ) => {
    setForm((prev) => {
      const newVariants = [...(prev.variants || [])];
      newVariants[index] = {
        ...newVariants[index],
        [field]:
          field === "stock" || field === "price" ? Number(value) || 0 : value,
      };
      return { ...prev, variants: newVariants };
    });
  };

  const removeVariant = (index: number) => {
    setForm((prev) => ({
      ...prev,
      variants: (prev.variants || []).filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    // Clean up empty images & variants before saving
    const cleanedForm = {
      ...form,
      images: (form.images || []).filter((img) => img.url.trim() !== ""),
      variants: (form.variants || []).filter((v) => v.name.trim() !== ""),
    };
    onSave(cleanedForm);
    // Optional: you could close modal here instead of in parent
  };

  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Product"
      footer={
        <>
          <button
            className="flex-1 bg-black text-white py-2 rounded-lg hover:brightness-110 transition"
            onClick={handleSave}
          >
            Save Changes
          </button>
          <button
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5 max-h-[70vh] overflow-y-auto pr-2">
        {/* Basic fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleBasicChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price || 0}
              onChange={handleBasicChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock (fallback if no variants)
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock || 0}
              onChange={handleBasicChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status || "Active"}
              onChange={handleBasicChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {/* ── Images Section ── */}
        <div className="border-t pt-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Product Images</h3>
            <button
              type="button"
              onClick={addImage}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
            >
              + Add Image URL
            </button>
          </div>

          {(form.images || []).length === 0 ? (
            <p className="text-gray-500 text-sm italic">No images yet</p>
          ) : (
            <div className="space-y-3">
              {(form.images || []).map((img, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={img.url}
                    onChange={(e) => updateImage(idx, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 border border-gray-300 rounded-lg p-2 text-sm"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Variants Section ── */}
        <div className="border-t pt-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Variants</h3>
            <button
              type="button"
              onClick={addVariant}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
            >
              + Add Variant
            </button>
          </div>

          {(form.variants || []).length === 0 ? (
            <p className="text-gray-500 text-sm italic">No variants yet</p>
          ) : (
            <div className="space-y-4">
              {(form.variants || []).map((variant, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Name (Size/Color/etc)
                      </label>
                      <input
                        type="text"
                        value={variant.name || ""}
                        onChange={(e) =>
                          updateVariant(idx, "name", e.target.value)
                        }
                        placeholder="e.g. Medium, Red, 256GB"
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Price (optional)
                      </label>
                      <input
                        type="number"
                        value={variant.price ?? ""}
                        onChange={(e) =>
                          updateVariant(idx, "price", e.target.value)
                        }
                        placeholder="Override price"
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={variant.stock || 0}
                        onChange={(e) =>
                          updateVariant(idx, "stock", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeVariant(idx)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove variant
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
