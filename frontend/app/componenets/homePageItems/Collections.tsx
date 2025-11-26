import React from "react";
import Image from "next/image";
import setup from "@/public/covers/setup1.jpg";
export default function Collections() {
  return (
    <div className="flex w-full h-[500px] relative overflow-hidden mb-5 space-y-10 mt-16 gap-5 flex-col px-20  ">
      {/* Background Image */}

      <div className="grid grid-cols-2 gap-4 ">
        <div className=" w-full bg-black">hello</div>
        <div className="flex flex-col gap-4">
          <div className="h-50 w-full bg-black">hello</div>
          <div className="h-50 w-full bg-black">hello</div>
        </div>
      </div>
    </div>
  );
}
