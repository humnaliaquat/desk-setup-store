// /app/admin/layout.tsx
import "@/app/globals.css";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // or spinner

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <main className="">{children}</main>
        </div>
      </body>
    </html>
  );
}
