import React from "react";

export default function FiltersSidebar() {
  return (
    <div className="w-[320px] p-6 pr-2 pt-0 rounded-2xl">
      {/* CATEGORY */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">Category</h3>

        <ul className="space-y-3">
          {[
            { name: "Keyboards", count: 12 },
            { name: "Mice", count: 10 },
            { name: "Lighting", count: 4 },
            { name: "Accessories", count: 4 },
          ].map((cat, i) => (
            <li key={i}>
              <div className="flex justify-between items-center">
                {/* CIRCLED CHECKBOX */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="
                      appearance-none
                      w-4 h-4 
                      rounded-full 
                      border border-gray-400
                      checked:bg-black checked:border-black
                      cursor-pointer
                    "
                  />
                  <span className="text-sm">{cat.name}</span>
                </label>

                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                  {cat.count}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* PRICE RANGE */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Price Range</h3>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm"
          />
        </div>
      </div>

      {/* COLORS */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Colors</h3>
        <div className="flex gap-3 items-center">
          {[
            "bg-black",
            "bg-white border",
            "bg-blue-500",
            "bg-red-500",
            "bg-green-500",
          ].map((color, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full border border-gray-300 cursor-pointer hover:scale-105 transition ${color}`}
            ></div>
          ))}
        </div>
      </div>

      {/* RGB YES / NO */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">RGB Lighting</h3>

        <div className="flex gap-6">
          {/* Yes Option */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rgb"
              className="
                appearance-none
                w-4 h-4 
                rounded-full 
                border border-gray-400
                checked:bg-black checked:border-black
                cursor-pointer
              "
            />
            <span className="text-sm">Yes</span>
          </label>

          {/* No Option */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rgb"
              className="
                appearance-none
                w-4 h-4 
                rounded-full 
                border border-gray-400
                checked:bg-black checked:border-black
                cursor-pointer
              "
            />
            <span className="text-sm">No</span>
          </label>
        </div>
      </div>

      {/* SORT */}
      <div className="mb-2">
        <h3 className="font-semibold text-lg mb-3">Sort by Price</h3>
        <select className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm cursor-pointer">
          <option value="low-to-high">Low → High</option>
          <option value="high-to-low">High → Low</option>
        </select>
      </div>
    </div>
  );
}
