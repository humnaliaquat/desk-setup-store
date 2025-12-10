"use client";

import Link from "next/link";

export default function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-4">Page not found</p>
      <Link href="/" className="text-blue-500 underline">
        Go Home
      </Link>
    </div>
  );
}
