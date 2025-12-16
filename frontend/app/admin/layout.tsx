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
    <div className={`min-h-screen bg-gray-100 ${jakarta.className}`}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-64 flex min-h-screen flex-col">
        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto  pt-15">{children}</main>
      </div>
    </div>
  );
}
