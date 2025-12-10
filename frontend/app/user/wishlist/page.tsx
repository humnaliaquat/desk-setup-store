import Link from "next/link";
import React from "react";
import Image from "next/image";
import image from "@/public/covers/woman.jpg";
import { X } from "lucide-react";

export default function page() {
  return (
    <section className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="flex flex-col justify-center items-center h-[200px] md:h-[250px] px-4">
        <h1 className="text-4xl md:text-7xl font-bold">Wishlist</h1>

        <div className="flex items-center text-gray-500 mt-4 gap-2 font-medium text-sm md:text-base">
          <Link href="/" className="hover:text-gray-800 transition">
            Home
          </Link>
          <span className="opacity-60">&gt;</span>
          <p>Wishlist</p>
        </div>
      </header>

      {/* TABLE */}
      <main className="px-4 md:px-16 lg:px-32 pb-20 mt-15">
        <div className="overflow-x-auto rounded-xl pb-5">
          <table className="w-full border-collapse">
            {/* HEAD */}
            <thead className=" text-left text-gray-700 text-sm md:text-base font-medium">
              <tr className="border-b border-gray-200 ">
                <th className="p-4 w-10">
                  <input type="checkbox" />
                </th>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 w-40 text-right  invisible">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="text-sm md:text-base">
              {[1, 2, 3].map((item) => (
                <tr
                  key={item}
                  className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                >
                  {/* CHECKBOX */}
                  <td className="p-4 align-middle">
                    <input type="checkbox" />
                  </td>

                  {/* PRODUCT */}
                  <td className="p-4 flex items-center gap-3">
                    <Image
                      src={image}
                      alt="Product Image"
                      width={55}
                      height={55}
                      className="rounded-md shadow-sm"
                    />
                    <span className="font-semibold text-gray-800 leading-tight">
                      Product {item}
                    </span>
                  </td>

                  {/* PRICE */}
                  <td className="p-4 font-medium text-gray-800">$100.00</td>

                  {/* STOCK */}
                  <td className="p-4">
                    <span className="text-green-600 font-semibold">
                      In Stock
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-1">
                    <div className="flex items-center justify-end gap-3">
                      {/* SELECT OPTIONS BUTTON */}
                      <button className="bg-black text-white  px-2 py-2 rounded-md hover:brightness-110 cursor-pointer transition text-xs ">
                        Select Options
                      </button>

                      {/* REMOVE BUTTON */}
                      <button
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                        aria-label="Remove"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* buttons */}
          <div className="flex justify-between gap-4 mt-4">
            <button className="mt-4  border border-gray-500 hover:bg-black hover:brightness-110 hover:text-white px-4 py-2 rounded-md  transition text-sm cursor-pointer">
              Remove
            </button>
            <button className="mt-4  border border-gray-500 hover:bg-black hover:brightness-110 hover:text-white  px-4 py-2 rounded-md  transition text-sm cursor-pointer">
              Empty Wishlist
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
