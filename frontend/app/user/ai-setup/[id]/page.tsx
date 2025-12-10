"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import img from "@/public/covers/setup1.jpg";

const setups = [
  {
    id: 1,
    title: "Minimal White Productivity Setup",
    budget: "under-50k",
    colors: "white",
    purpose: "office",
    room: "small",
    img: img,
    price: "45,000 PKR",
    items: [
      "24-inch LED Monitor",
      "Mechanical Keyboard",
      "White Desk",
      "Minimal LED Strip",
      "Green Desk Plant",
    ],
  },
  // ...rest setups
];

export default function SetupDetailsPage() {
  const { id } = useParams();
  const setup = setups.find((s) => s.id === Number(id));

  if (!setup) return <p>Setup not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* IMAGE */}
      <div className="relative w-full h-[350px] rounded-xl overflow-hidden shadow">
        <Image
          src={setup.img}
          alt={setup.title}
          fill
          className="object-cover"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mt-6">{setup.title}</h1>
      <p className="text-gray-600 text-lg">{setup.price}</p>

      {/* SPECS */}
      <div className="mt-6 text-sm bg-gray-100 p-4 rounded-lg">
        <p>
          <strong>Budget:</strong> {setup.budget}
        </p>
        <p>
          <strong>Color:</strong> {setup.colors}
        </p>
        <p>
          <strong>Purpose:</strong> {setup.purpose}
        </p>
        <p>
          <strong>Room:</strong> {setup.room}
        </p>
      </div>

      {/* ITEMS */}
      <h2 className="text-xl font-semibold mt-10 mb-3">What's Included</h2>
      <ul className="list-disc ml-6 text-gray-700">
        {setup.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* BUY BUTTONS */}
      <div className="flex gap-4 mt-10">
        <button className="bg-black text-white px-4 py-2 rounded-md">
          🔥 Find on Daraz
        </button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
          🌐 Amazon Link
        </button>
      </div>
    </div>
  );
}
