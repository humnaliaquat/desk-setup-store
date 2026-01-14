import { Layers } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AllCollectionsPage() {
  return (
    <div className="min-h-screen w-full bg-stone-50 px-4 md:px-6 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-orange-500" />
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            Collections
          </h1>
        </div>

        <Link
          href={"/admin/products/collection/add"}
          className="rounded-xl bg-orange-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-orange-600 transition"
        >
          Add Collection
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-stone-100">
            <tr className="text-left text-sm text-stone-700">
              <th className="px-4 py-3">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Products Count</th>
            </tr>
          </thead>

          <tbody>
            {/* Empty state */}
            <tr className="border-t border-stone-200">
              <td
                colSpan={3}
                className="px-4 py-8 text-center text-sm text-stone-500"
              >
                No collections found
              </td>
            </tr>

            {/* Example row (remove later) */}
            {/* 
            <tr className="border-t hover:bg-stone-50 transition">
              <td className="px-4 py-3">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-3 font-medium text-stone-800">
                Summer Sale
              </td>
              <td className="px-4 py-3 text-stone-600">12</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
