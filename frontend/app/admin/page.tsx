import { Plus } from "lucide-react";
import React from "react";
import LineGraphAndStats from "../componenets/admin/dashboard/LineGraphAndStats";
import RecentOrders from "../componenets/admin/dashboard/RecentOrders";
import TopSellingProducts from "../componenets/admin/dashboard/TopSellingProducts";
import MonthlyProfits from "../componenets/admin/dashboard/MonthlyProfits";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* HEADER */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition">
          <Plus className="h-4 w-4" />
          New Product
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex flex-col gap-6">
        {/* TOP SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <LineGraphAndStats />
          </div>

          {/* RIGHT */}
          <RecentOrders />
        </section>

        {/* BOTTOM SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TABLE */}
          <div className="lg:col-span-2">
            <TopSellingProducts />
          </div>

          {/* CHART */}
          <MonthlyProfits />
        </section>
      </main>
    </div>
  );
}
