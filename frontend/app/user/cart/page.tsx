"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import productImage from "@/public/products/lights/reniteco.jpg";
import { Minus, Plus, X } from "lucide-react";
import image from "@/public/covers/woman.jpg";

export default function Cart() {
  const cartItems = [
    { id: 1, name: "Product 1", price: 29.99, quantity: 2, img: productImage },
    { id: 2, name: "Product 2", price: 49.99, quantity: 1, img: productImage },
    { id: 3, name: "Product 3", price: 19.99, quantity: 3, img: productImage },
    { id: 4, name: "Product 4", price: 99.99, quantity: 1, img: productImage },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="flex flex-col justify-center items-center h-[200px] md:h-[250px] px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Shopping Cart
        </h1>

        <div className="flex items-center text-gray-500 mt-4 gap-2 font-medium text-sm md:text-base">
          <Link href="/" className="hover:text-gray-800 transition">
            Home
          </Link>
          <span className="opacity-60">/</span>
          <p>Cart</p>
        </div>
      </header>

      {/* MAIN */}
      <main className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-10 px-6 md:px-12 lg:px-20 py-15 flex-1">
        {/* CART TABLE */}
        <div className="rounded-xl overflow-hidden">
          <table className="w-full text-sm md:text-base">
            {/* HEAD */}
            <thead className="border-b border-gray-300 sticky top-0 z-10">
              <tr className="text-left text-gray-700 font-semibold">
                <th className="p-4 w-10"></th>
                <th className="p-4">Product</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4 text-right">Subtotal</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="">
              {cartItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition border-b border-gray-300"
                >
                  {/* REMOVE */}
                  <td className="p-4 align-middle">
                    <button
                      className="p-2 rounded-full hover:bg-gray-200 transition"
                      aria-label="Remove"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>

                  {/* PRODUCT */}
                  <td className="p-4 flex items-center gap-3">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md shadow-sm"
                    />
                    <span className="font-medium text-gray-800 leading-tight">
                      {item.name}
                    </span>
                  </td>

                  {/* PRICE */}
                  <td className="p-4 text-right font-medium text-gray-800">
                    ${item.price.toFixed(2)}
                  </td>

                  {/* QUANTITY */}
                  <td className="p-2">
                    <div className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2  select-none">
                      <button>
                        <Minus className="w-4 h-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button>
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                  {/* SUBTOTAL */}
                  <td className="p-4 text-right font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Buttons / Coupon */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 pb-6 ">
            {/* Coupon Input */}
            <div className="relative flex-1 max-w-md w-full">
              <input
                placeholder="Coupon Code"
                className="border border-gray-300 w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 font-semibold text-black hover:text-gray-700 transition">
                Apply
              </button>
            </div>

            {/* Update Cart Button */}
            <button className="w-full sm:w-auto mt-2 sm:mt-0 border border-gray-500 hover:bg-black hover:text-white px-6 py-3 rounded-md transition font-semibold text-sm">
              Update Cart
            </button>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-gray-300 p-6 rounded shadow-sm h-fit border border-gray-300">
          <h2 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm md:text-base">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span>${(subtotal * 0.1).toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-red-500">
              <span>Coupon</span>
              <span>- $10.00</span>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-3 mt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${(subtotal * 1.1).toFixed(2)}</span>
          </div>

          <button className="w-full bg-black py-3 mt-6 rounded-full hover:opacity-90 text-white font-semibold transition">
            Proceed to Checkout
          </button>
        </div>
      </main>
    </div>
  );
}
