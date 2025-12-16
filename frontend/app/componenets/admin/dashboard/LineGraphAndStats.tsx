"use client";

import {
  ShoppingBasket,
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LineGraphAndStats() {
  const stats = [
    {
      title: "Total Orders",
      value: "156",
      change: "+5%",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Items",
      value: "21",
      change: "-2%",
      trend: "down",
      icon: Package,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Total Revenue",
      value: "$4,220",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
  ];

  const chartData = [
    { day: "Mon", sales: 120 },
    { day: "Tue", sales: 210 },
    { day: "Wed", sales: 180 },
    { day: "Thu", sales: 260 },
    { day: "Fri", sales: 200 },
    { day: "Sat", sales: 300 },
    { day: "Sun", sales: 280 },
  ];

  return (
    <section className="flex flex-col gap-6">
      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-white p-4  border border-gray-200 shadow-sm  transition"
            >
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {item.value}
                </h3>

                <div
                  className={`mt-1 flex items-center gap-1 text-xs ${
                    item.trend === "up" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  <TrendIcon className="h-4 w-4" />
                  {item.change}
                </div>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* LINE CHART */}
      <div className="rounded-xl bg-white border border-gray-200 p-6 pt-4 pb-4  h-80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Sales Analytics
          </h3>
          <span className="text-xs text-gray-400">Last 7 days</span>
        </div>

        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              padding={{ left: 20 }}
              className="text-xs"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={37}
              className="text-xs pl-0 pr-0"
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#FB923C"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
