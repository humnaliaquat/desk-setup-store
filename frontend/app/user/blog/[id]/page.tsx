"use client";
import blogsData from "@/db/blogs.json";
import Image from "next/image";
import auther from "@/public/covers/woman.jpg";
import BlogSec from "@/app/componenets/homePageItems/BlogSec";

interface Blog {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  headings: string[];
  images: string[];
  content?: string[];
}

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  const blogId = parseInt(id, 10);

  if (!blogId) {
    return (
      <p className="text-center mt-20 text-lg text-red-500 font-semibold">
        Invalid blog ID
      </p>
    );
  }

  const blog = blogsData.find((b) => b.id === blogId);

  if (!blog) {
    return (
      <p className="text-center mt-20 text-lg text-gray-700 font-semibold">
        Blog not found
      </p>
    );
  }

  return (
    <section className="min-h-screen bg-white px-6  py-10 lg:py-16">
      {/* Banner */}
      <div className="relative flex flex-col items-center mb-20">
        <Image
          src={blog.coverImage.replace("/public", "")}
          alt={blog.title}
          width={1100}
          height={700}
          priority
          className="w-[1200px] max-h-[700px] object-cover rounded-xl shadow-md"
        />

        {/* Author badge */}
        <div className="absolute bottom-36 flex items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <Image
              src={auther}
              alt={blog.author}
              width={80}
              height={80}
              className="object-cover object-top w-full h-full"
            />
          </div>
        </div>

        {/* Title + Author */}
        <div className="mt-20 flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-bold text-center leading-snug">
            {blog.title}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            By <span className="font-semibold text-black">{blog.author}</span>
          </p>
        </div>
      </div>

      {/* Intro with Drop Letter */}
      <div className="flex gap-6 mb-16 items-start max-w-4xl mx-auto">
        <span className="flex items-center justify-center w-25 h-25 rounded-full bg-black text-white text-4xl font-semibold shrink-0">
          L
        </span>
        <p className="text-gray-700 leading-relaxed text-[17px] tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          molestiae quaerat quos. Omnis voluptas quia dicta praesentium ad sit
          vitae laborum. Harum iure delectus repellat veritatis tempore, nobis
          possimus facere. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Totam molestiae quaerat quos. Omnis.
        </p>
      </div>

      {/* Full-width image */}
      <div className="max-w-4xl mx-auto">
        <Image
          src={blog.images[1].replace("/public", "")}
          alt="Blog Image"
          width={900}
          height={400}
          className="h-[500px] rounded-lg w-full object-cover"
        />
      </div>

      {/* Divider Heading */}
      <div className="uppercase py-8 border-b-2 max-w-4xl mx-auto mt-5 text-center font-semibold tracking-wide text-gray-800">
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </div>

      {/* Two column section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 max-w-4xl mx-auto">
        {/* Left */}
        <div className="flex flex-col gap-6 text-gray-700 leading-relaxed text-[17px] tracking-wide">
          <h2 className="text-2xl font-semibold text-gray-900">
            {blog.headings[0]}
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            molestiae quaerat quos. Omnis voluptas quia dicta praesentium ad sit
            vitae laborum. Harum iure delectus repellat veritatis tempore, nobis
            possimus facere.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            molestiae quaerat quos. Omnis voluptas quia dicta praesentium ad sit
            vitae laborum. Harum iure delectus repellat veritatis tempore, nobis
          </p>
          <button className="self-start px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer">
            Read More
          </button>
        </div>

        {/* Right image */}
        <Image
          src={blog.images[2].replace("/public", "")}
          alt="Blog Image"
          width={900}
          height={400}
          className="h-[500px] rounded-lg w-full object-cover object-left"
        />
      </div>

      {/* Divider */}
      <div className="uppercase mt-20 pt-8 border-t-2 max-w-4xl mx-auto text-center font-semibold tracking-wide text-gray-800">
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </div>

      {/* Image */}
      <div className="max-w-4xl mx-auto mt-10">
        <Image
          src={blog.images[3].replace("/public", "")}
          alt="Blog Image"
          width={900}
          height={400}
          className="h-[500px] rounded-lg w-full object-cover"
        />
      </div>

      {/* Third Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-12 mt-20">
        <h2 className="text-2xl font-semibold text-gray-900">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
        </h2>

        <p className="text-gray-700 leading-relaxed text-[17px] tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          molestiae quaerat quos. Omnis voluptas quia dicta praesentium ad sit
          vitae laborum.
        </p>
      </div>
      {/* related blogs section could go here */}
      <BlogSec title="Latest" highlight="Posts" />
    </section>
  );
}
