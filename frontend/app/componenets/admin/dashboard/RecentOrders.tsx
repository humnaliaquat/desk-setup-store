import React from "react";
import Image from "next/image";
import pic from "@/public/products/keyboard/FrostLite.jpg";

export default function RecentOrders() {
  const orders = [
    {
      productTitle: "FrostLite Keyboard",
      category: "Keyboard",
      pic,
      price: "$123.00",
      totalItems: 5,
    },
    {
      productTitle: "FrostLite Keyboard",
      category: "Keyboard",
      pic,
      price: "$123.00",
      totalItems: 5,
    },
    {
      productTitle: "FrostLite Keyboard",
      category: "Keyboard",
      pic,
      price: "$123.00",
      totalItems: 5,
    },
    {
      productTitle: "FrostLite Keyboard",
      category: "Keyboard",
      pic,
      price: "$123.00",
      totalItems: 5,
    },
    {
      productTitle: "FrostLite Keyboard",
      category: "Keyboard",
      pic,
      price: "$123.00",
      totalItems: 5,
    },
  ];

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-4">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        Recent Orders
      </h3>

      <div className="flex flex-col ">
        {orders.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 transition rounded-md px-2"
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <Image
                src={item.pic}
                alt={item.productTitle}
                width={48}
                height={48}
                className="rounded-md border"
              />

              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-800">
                  {item.productTitle}
                </p>
                <span className="text-xs text-gray-400">{item.category}</span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">
                {item.price}
              </p>
              <span className="text-xs text-gray-400">x{item.totalItems}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 flex justify-center items-center pt-3 w-full   rounded-md  transition-colors font-medium text-sm border-t border-gray-200">
        View All
      </button>
    </div>
  );
}
