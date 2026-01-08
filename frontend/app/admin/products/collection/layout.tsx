// app/admin/products/page.tsx (server component)
import AddCollection from "./page";

export const metadata = {
  title: "Add Collection ",
  description: "Add new collections",
};

export default function ProductsPage() {
  return <AddCollection />;
}
