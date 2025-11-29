import React from "react";
import Image from "next/image";
import pic from "@/public/covers/setup.png";

export default function BlogSec() {
  const blogs = [
    {
      title: "The Ultimate 2025 Desk Setup — Clean, Modern & Productive",
      author: "Fiza Raja",
      date: "Nov 28, 2025",
      pic: pic,
    },
    {
      title: "Lighting That Transforms Your Workspace Instantly",
      author: "Deskio Editorial",
      date: "Nov 12, 2025",
      pic: pic,
    },
    {
      title: "10 Accessories That Upgrade Your Desk Aesthetic",
      author: "Ayesha Noor",
      date: "Oct 27, 2025",
      pic: pic,
    },
    {
      title: "How to Build a Creator-Friendly Home Workspace",
      author: "Deskio Team",
      date: "Sep 14, 2025",
      pic: pic,
    },
  ];

  return (
    <section className="px-6 md:px-20 mt-20 mb-16">
      {/* Heading */}
      <header className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold mb-2">
          The Deskio <span className="text-orange-400">Blog</span>
        </h1>
        <p className="text-gray-600 max-w-lg text-sm md:text-base">
          Stories, guides, and insights to elevate your workspace experience.
        </p>
      </header>

      {/* Blog Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {blogs.map((item, index) => (
          <div
            key={index}
            className="flex flex-col cursor-pointer group rounded overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-52 relative overflow-hidden rounded">
              <Image
                src={item.pic}
                alt="blog image"
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
                <p>{item.date}</p>
              </div>

              <p className="font-semibold text-lg leading-snug  transition">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
}
