// types.ts
export type Variant = {
  name: string;
  price?: number;
  stock: number;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft";
  images: { url: string; public_id: string }[];
  variants: Variant[];
  createdAt: string;
};
export default Product;