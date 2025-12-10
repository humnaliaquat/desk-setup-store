"use client";
import React from "react";
import Image from "next/image";
import blogs from "@/db/blogs.json";

interface BlogSecProps {
  title: string;
  highlight?: string;
  subtitle?: string; // optional
}

export default function BlogSec({ title, highlight, subtitle }: BlogSecProps) {
  // only 4 blogs
  const blogList = blogs.slice(0, 4);

  return (
    <section className="px-6 md:px-20 mt-20 mb-16">
      {/* 🔥 Reusable Inline Header */}
      <header className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold mb-2">
          {title}{" "}
          {highlight && <span className="text-orange-400">{highlight}</span>}
        </h1>

        {subtitle && (
          <p className="text-gray-600 max-w-lg text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </header>

      {/* Blog Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {blogList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col cursor-pointer group rounded overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-52 relative overflow-hidden rounded">
              <Image
                src={item.coverImage.replace("/public", "")}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Info */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center text-sm text-gray-500 gap-3 font-medium">
                <p>
                  By <span className="text-black">{item.author}</span>
                </p>
                <span className="opacity-50">•</span>
                <p>15 May 2025</p>
              </div>

              <p className="font-semibold text-lg leading-snug group-hover:text-orange-400 transition">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
}
