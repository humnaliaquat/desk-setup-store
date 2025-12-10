import { Filter } from "lucide-react";
import React from "react";
import FiltersSidebar from "../../componenets/shopPage/FiltersSidebar";
import ProductsDisplay from "../../componenets/shopPage/ProductsDisplay";

export default function page() {
  return (
    <div className="flex flex-col  min-h-screen bg-gray-100">
      <div className="flex justify-center items-center h-[250px]  flex-col">
        <h1 className="text-7xl font-bold ">Shop</h1>
        <div className="flex text-gray-600 mt-4 gap-3 font-medium">
          <p className="flex ">Home </p> &gt;<p> Shop</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row  mb-10 pl-4 lg:pl-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4">
          <FiltersSidebar />
        </aside>

        {/* Products Display */}
        <main className="w-full lg:w-3/4">
          <ProductsDisplay />
        </main>
      </div>
    </div>
  );
}
