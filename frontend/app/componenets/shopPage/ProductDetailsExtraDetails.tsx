"use client";
import React, { useState } from "react";

export default function ProductDetailsExtraDetails() {
  const tabs = [
    "Description",
    "Product Specification",
    "Reviews",
    "Shipping Policy",
    "Refund Policy",
  ];

  const [view, setView] = useState("Description");

  return (
    <div className="mt-10">
      {/* TAB BUTTONS */}
      <div className="flex flex-wrap gap-4 border-b border-gray-300 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={`px-4 py-2 text-sm ${
              view === tab
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENTS */}
      <div className="mt-6 space-y-4 text-sm leading-6">
        {/* DESCRIPTION */}
        {view === "Description" && (
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              architecto officiis aut temporibus quo maiores unde vero est
              vitae, voluptates ducimus esse aliquid cum velit magnam mollitia
              assumenda tempore quas!
            </p>

            <h2 className="mt-6 font-semibold text-base">Key Features</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Ergonomic design for comfort</li>
              <li>RGB backlight with multiple modes</li>
              <li>Water-resistant long-lasting components</li>
              <li>Silent mechanical switches</li>
              <li>Premium aluminum build quality</li>
            </ul>
          </div>
        )}

        {/* SPECIFICATION */}
        {view === "Product Specification" && (
          <div>
            <h2 className="font-semibold text-base mb-2">Specifications</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Dimensions: 450 × 180 × 35 mm</li>
              <li>Weight: 820 g</li>
              <li>Material: ABS + Aluminum</li>
              <li>Connectivity: USB-C / Bluetooth</li>
              <li>Switch Type: Red Silent Mechanical</li>
              <li>Warranty: 1 Year</li>
            </ul>
          </div>
        )}

        {/* REVIEWS */}
        {view === "Reviews" && (
          <div>
            <h2 className="font-semibold text-base mb-3">Customer Reviews</h2>

            <p className="text-gray-500 italic">
              ⭐ No reviews yet — be the first to review this product!
            </p>
          </div>
        )}

        {/* SHIPPING */}
        {view === "Shipping Policy" && (
          <div>
            <h2 className="font-semibold text-base mb-2">Shipping Policy</h2>
            <p>
              Orders are processed within 24–48 hours. Shipping across Pakistan
              typically takes 2–5 business days depending on your location.
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Free shipping on orders above 3000 PKR</li>
              <li>Trackable courier service</li>
              <li>Cash on delivery available</li>
            </ul>
          </div>
        )}

        {/* REFUND */}
        {view === "Refund Policy" && (
          <div>
            <h2 className="font-semibold text-base mb-2">Refund & Returns</h2>
            <p>
              Eligible refunds must be requested within 7 days of delivery.
              Product must be unused and in original packaging.
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Defective items replaced free of charge</li>
              <li>Return shipping covered by customer</li>
              <li>Refunds issued via bank transfer or store credit</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
