import React from "react";
import Image from "next/image";
import setup from "@/public/covers/setup5.jpg";
import setup1 from "@/public/covers/setup4.jpg";

export default function Collections() {
  const items = [
    {
      img: setup1,
      title: "Studio Setups",
      tag: "SAVE UP TO 50% OFF ON ALL ITEMS",
    },
    {
      img: setup,
      title: "Desk Accessories",
      tag: "SAVE UP TO 50% OFF ON ALL ITEMS",
    },
  ];

  return (
    <section className="w-full mt-24 px-6 md:px-20 mb-16">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
          DESIGN{" "}
          <span className="text-orange-400 font-extrabold"> inspires</span>
        </h1>
        <p className="text-gray-600 max-w-lg text-sm md:text-base">
          Build your dream workspace with curated setups and accessories.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative h-[360px] md:h-[420px] w-full overflow-hidden rounded shadow-md group"
          >
            {/* Image */}
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-all duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

            {/* Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
              <p className="text-xs md:text-sm tracking-widest opacity-90">
                {item.tag}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold mt-3">
                {item.title}
              </h2>
              <button className="mt-5 text-sm md:text-base underline underline-offset-4 hover:opacity-80 transition">
                Explore Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
