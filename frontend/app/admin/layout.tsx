// app/admin/layout.tsx
import "@/app/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Sidebar from "@/app/componenets/admin/layout/Sidebar";
import Navbar from "@/app/componenets/admin/layout/Navbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex min-h-screen bg-gray-100 ${jakarta.className}`}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN SECTION */}
      <div className="flex flex-col flex-1">
        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
