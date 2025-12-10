// /app/admin/layout.tsx
import "@/app/globals.css";
import Sidebar from "@/app/componenets/admin/layout/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // or spinner

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
