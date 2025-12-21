// app/admin/products/layout.tsx

export const metadata = {
  title: "Products | Admin Dashboard",
  description: "Manage all products in your store",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-8">
      <div className="">{children}</div>
    </section>
  );
}
