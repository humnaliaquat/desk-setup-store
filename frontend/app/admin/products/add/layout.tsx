// app/admin/products/page.tsx (server component)
import AddProduct from "./page";

export const metadata = {
  title: "Add Products ",
  description: "Add new products",
};

export default function ProductsPage() {
  return <AddProduct />;
}
