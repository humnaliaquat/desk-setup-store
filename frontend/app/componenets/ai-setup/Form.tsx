"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import img from "@/public/covers/setup1.jpg";
import Link from "next/link";

type Setup = {
  id: number;
  title: string;
  budget: string;
  colors: string;
  purpose: string;
  room: string;
  img: any;
  price: string;
};

type Filters = {
  budget: string;
  colors: string;
  purpose: string;
  room: string;
};

export default function Form() {
  const [filters, setFilters] = useState<Filters>({
    budget: "",
    colors: "",
    purpose: "",
    room: "",
  });

  const [results, setResults] = useState<Setup[]>([]);

  // 🔥 mock data (typed)
  const setups: Setup[] = [
    {
      id: 1,
      title: "Minimal White Productivity Setup",
      budget: "under-50k",
      colors: "white",
      purpose: "office",
      room: "small",
      img: img,
      price: "45,000 PKR",
    },
    {
      id: 2,
      title: "RGB Gaming Desk",
      budget: "50-100k",
      colors: "rgb",
      purpose: "gaming",
      room: "medium",
      img: img,
      price: "85,000 PKR",
    },
    {
      id: 3,
      title: "Walnut Dual Monitor Editing Setup",
      budget: "150k-plus",
      colors: "walnut",
      purpose: "editing",
      room: "large",
      img: img,
      price: "175,000 PKR",
    },
  ];

  // handle filter change
  const handleChange =
    (field: keyof Filters) => (e: ChangeEvent<HTMLSelectElement>) => {
      setFilters({ ...filters, [field]: e.target.value });
    };

  const handleGenerate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filtered = setups.filter((setup) => {
      return (
        (!filters.budget || setup.budget === filters.budget) &&
        (!filters.colors || setup.colors === filters.colors) &&
        (!filters.purpose || setup.purpose === filters.purpose) &&
        (!filters.room || setup.room === filters.room)
      );
    });

    setResults(filtered);
  };

  return (
    <div className="mx-10 px-8 py-10 rounded-lg bg-white shadow">
      <h1 className="text-2xl font-semibold pb-6">Find the best setup</h1>

      <form
        onSubmit={handleGenerate}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* budget */}
        <select
          onChange={handleChange("budget")}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Select Budget</option>
          <option value="under-50k">Under 50k</option>
          <option value="50-100k">50k – 100k</option>
          <option value="100-150k">100k – 150k</option>
          <option value="150k-plus">150k+</option>
        </select>

        {/* colors */}
        <select
          onChange={handleChange("colors")}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Select Colors</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="walnut">Walnut</option>
          <option value="rgb">RGB</option>
        </select>

        {/* purpose */}
        <select
          onChange={handleChange("purpose")}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Select Purpose</option>
          <option value="gaming">Gaming</option>
          <option value="office">Office / Productivity</option>
          <option value="editing">Video Editing</option>
          <option value="streaming">Streaming</option>
        </select>

        {/* room */}
        <select
          onChange={handleChange("room")}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Room Size</option>
          <option value="small">Small (8×10 ft)</option>
          <option value="medium">Medium (10×12 ft)</option>
          <option value="large">Large (12×14+ ft)</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded-md hover:brightness-110 transition md:col-span-2 lg:col-span-4 justify-self-end"
        >
          Generate
        </button>
      </form>

      {/* results */}
      <div className="mt-10">
        {results.length > 0 && (
          <h2 className="text-xl font-semibold mb-4">Recommended Setups</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((setup) => (
            <div
              key={setup.id}
              className="border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="h-40 relative">
                <Image
                  src={setup.img}
                  alt={setup.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-medium">{setup.title}</h3>
                <p className="text-sm text-gray-500">{setup.price}</p>

                <Link
                  href={`/ai-setup/${setup.id}`}
                  className="mt-3 bg-black text-white px-3 py-1 rounded-md text-sm hover:brightness-110"
                >
                  View Setup
                </Link>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <p className="text-gray-500 text-sm mt-6">
            No setups yet... select filters and hit Generate.
          </p>
        )}
      </div>
    </div>
  );
}
