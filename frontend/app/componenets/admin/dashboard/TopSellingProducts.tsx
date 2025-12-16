import React from "react";

export default function TopSellingProducts() {
  const products = [
    {
      name: "FrostLite Keyboard",
      status: "Active",
      sales: 120,
      earning: "$2,400",
    },
    {
      name: "NovaX Gaming Mouse",
      status: "Active",
      sales: 95,
      earning: "$1,900",
    },
    {
      name: "AeroPulse Headset",
      status: "Out of Stock",
      sales: 60,
      earning: "$1,200",
    },
    {
      name: "GlidePro Mouse Pad",
      status: "Active",
      sales: 150,
      earning: "$900",
    },
  ];

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">
          Top Selling Products
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
              <th className="py-3 px-2">
                <input type="checkbox" />
              </th>
              <th className="py-3 px-2">Product</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Sales</th>
              <th className="py-3 px-2 text-right">Earning</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, index) => (
              <tr
                key={index}
                className="text-sm text-gray-700 border-b border-gray-200 last:border-none hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-2">
                  <input type="checkbox" />
                </td>

                <td className="py-3 px-2 font-medium text-gray-800">
                  {item.name}
                </td>

                <td className="py-3 px-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="py-3 px-2">{item.sales}</td>

                <td className="py-3 px-2 text-right font-semibold text-gray-800">
                  {item.earning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
