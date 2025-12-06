import React from "react";
import Image from "next/image";
import image1 from "@/public/aboutUsPics/teamOnWork.jpg";
import image2 from "@/public/aboutUsPics/teamwork.jpg";
import image3 from "@/public/aboutUsPics/topview.jpg";
import MeetTeam from "./MeetTeam";
import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

export default function MainSec() {
  const items = [
    {
      title: "Free Shipping",
      description: "Free shipping on your first order",
      icon: Truck,
    },
    {
      title: "15 Days Returns",
      description: "Hassle-free moneyback guarantee",
      icon: RotateCcw,
    },

    {
      title: "Secure Payment",
      description: "100% protected and encrypted",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="flex flex-col items-center gap-16 px-4 sm:px-8 md:px-16 lg:px-64 bg-white py-13">
      {/* Text Content */}
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="flex items-center gap-3 font-medium text-lg">
          <span className="w-3 h-1 bg-orange-400"></span>Our Story
        </p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl">
          Designing Desks, <br />
          <span className="text-orange-400">Inspiring Productivity</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl">
          At deskio, we believe that a well-designed workspace is the foundation
          for creativity and efficiency. Our journey began with a simple idea:
          to create desks that not only enhance productivity but also inspire
          innovation. Over the years, we've grown into a trusted name in
          ergonomic and stylish office furniture, committed to helping
          professionals and creatives alike transform their work environments.
        </p>

        {/* CEO Signature */}
        <div className="flex flex-col items-center mt-6">
          <link
            href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
            rel="stylesheet"
          />
          <p style={{ fontFamily: "'Pacifico', cursive", fontSize: "1.5rem" }}>
            Ethan Carter
          </p>
          <p className="text-gray-600 text-sm mt-1">Founder & CEO</p>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full px-10">
        <div className="sm:row-span-2">
          <Image
            src={image1}
            alt="Team on Work"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div>
          <Image
            src={image2}
            alt="Teamwork"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div>
          <Image
            src={image3}
            alt="Top View"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Divider Section */}
      <div className="bg-orange-400 text-white flex flex-wrap justify-around items-center w-full px-6 md:px-16 py-8 rounded-lg shadow-lg gap-8">
        {[
          { value: "5+", label: "Years" },
          { value: "5000+", label: "Happy Clients" },
          { value: "10000+", label: "Desks Delivered" },
          { value: "50+", label: "Awards Won" },
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">{stat.value}</h1>
            <p className="text-sm sm:text-base">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <MeetTeam />
    </section>
  );
}
