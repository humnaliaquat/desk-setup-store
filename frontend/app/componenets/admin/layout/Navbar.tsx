import React from "react";

export default function Navbar() {
  return (
    <div className="fixed top-0 bg-white h-18">
      <div className="flex justify-between items-center">
        {/* left side */}
        <div className="w-full">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="border border-gray-300 px-5 py-3 text-gray-500"
          />
        </div>
        {/* right side */}
        <div></div>
      </div>
    </div>
  );
}
