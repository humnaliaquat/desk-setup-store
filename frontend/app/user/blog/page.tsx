"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import blogsData from "@/db/blogs.json";

export default function BlogListPage() {
  return (
    <section className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="flex flex-col justify-center items-center h-[200px] md:h-[250px] px-4">
        <h1 className="text-4xl md:text-7xl font-bold">Blog</h1>
        <div className="flex items-center text-gray-600 mt-4 gap-2 font-medium text-sm md:text-base">
          <p>Home</p>
          <span>&gt;</span>
          <p>Blog</p>
        </div>
      </div>

      {/* Blog Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 px-6 md:px-20 mb-16 lg:grid-cols-4 gap-7 gap-y-12">
        {blogsData.map((item) => (
          <Link
            href={`/blog/${item.id}`}
            key={item.id}
            className="flex flex-col cursor-pointer group rounded overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-52 relative overflow-hidden rounded">
              <Image
                src={item.coverImage.replace("/public", "")} // remove /public for next/image
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Text */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center text-sm text-gray-500 gap-3 font-medium">
                <p>
                  By <span className="text-black">{item.author}</span>
                </p>
                <span className="opacity-50">•</span>
                <p>Nov 28, 2025</p>{" "}
                {/* You can add a date field in JSON if needed */}
              </div>

              <p className="font-semibold text-lg leading-snug transition">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </main>
    </section>
  );
}
