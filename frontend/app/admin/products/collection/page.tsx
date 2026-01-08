"use client";
import React from "react";
import { ImagePlus } from "lucide-react";

export default function AddCollection() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-12 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Add New Collection
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Create a curated desk setup collection for your store.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 max-w-3xl">
        <form className="space-y-6">
          {/* Collection Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Name
            </label>
            <input
              type="text"
              placeholder="e.g. Minimal Workspace"
              className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe this collection..."
              className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>

            <div className="flex items-center justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-orange-400 transition">
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <ImagePlus className="w-6 h-6" />
                <p className="text-sm">Click to upload or drag & drop</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option>Active</option>
              <option>Draft</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-2.5 text-sm rounded-full border hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm rounded-full bg-orange-400 text-white font-semibold hover:brightness-110 transition"
            >
              Create Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
