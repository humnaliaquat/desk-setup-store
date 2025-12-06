import React from "react";
import Image from "next/image";
import ceo from "@/public/aboutUsPics/ceo.jpg";
import headofdesign from "@/public/aboutUsPics/sofia.jpg";
import operationsManager from "@/public/aboutUsPics/liam.jpg";

export default function MeetTeam() {
  return (
    <div className="flex flex-col items-center gap-8 px-4 sm:px-16 bg-white mt-16">
      <div className="text-center flex flex-col gap-4 items-center">
        <p className="flex items-center gap-3 font-medium text-lg">
          <span className="w-3 h-1 bg-orange-400"></span>Our Team
        </p>
        <h2 className="text-4xl font-bold mb-8">Meet Our Team</h2>

        {/* team pics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 w-full">
          {/* CEO */}
          <div className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <Image
              src={ceo}
              alt="Ethan Carter"
              className="w-56 h-56 rounded object-cover shadow-md object-top-left"
            />
            <p className="mt-4 font-semibold text-lg">Ethan Carter</p>
            <p className="text-gray-600 text-xs mt-1">[CEO, DESKIO]</p>
          </div>

          {/* Head of Design */}
          <div className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <Image
              src={headofdesign}
              alt="Sophia Williams"
              className="w-56 h-56 rounded object-cover shadow-md object-top-left"
            />
            <p className="mt-4 font-semibold text-lg">Sophia Williams</p>
            <p className="text-gray-600 text-xs mt-1">[Head of Design]</p>
          </div>

          {/* Operations Manager */}
          <div className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <Image
              src={operationsManager}
              alt="Liam Patel"
              className="w-56 h-56 rounded object-cover object-top-left shadow-md"
            />
            <p className="mt-4 font-semibold text-lg">Liam Patel</p>
            <p className="text-gray-600 text-xs mt-1">[Operations Manager]</p>
          </div>
        </div>
      </div>
    </div>
  );
}
