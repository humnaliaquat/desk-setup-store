"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { MoreHorizontal } from "lucide-react";

export default function MonthlyProfits() {
  const data = [
    { name: "Segment A", value: 35 },
    { name: "Segment B", value: 35 },
  ];

  const COLORS = ["#a855f7", "#60a5fa"];
  const TOTAL = "$284,562";

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Monthly Profits</h3>
        <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
      </div>

      {/* Chart */}
      <div className="relative flex justify-center items-center my-4">
        <div className="w-44 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Center Text */}
        <div className="absolute text-center">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-lg font-semibold text-gray-800">{TOTAL}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-gray-600">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
