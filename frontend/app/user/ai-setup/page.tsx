"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Form from "../../componenets/ai-setup/Form";

export default function AiSetupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* HEADER */}
      <header className="flex flex-col justify-center items-center h-[200px] md:h-[250px] px-4 text-center">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
          AI Setup Finder
        </h1>

        {/* Breadcrumb */}
        <div className="flex items-center mt-4 gap-2 font-medium text-gray-500 text-sm">
          <Link href="/" className="hover:text-gray-800 transition">
            Home
          </Link>

          <ChevronRight size={16} className="opacity-60" />

          <span>AI Setup</span>
        </div>
      </header>

      {/* FORM SECTION */}
      <main className="max-w-8xl mx-auto px-4 md:px-8 w-full">
        <Form />
      </main>
    </div>
  );
}
