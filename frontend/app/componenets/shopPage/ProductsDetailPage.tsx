import React from "react";

export default function ProductsDetailPage() {
  return (
    <div>
      {/* breadcrumbs */}
      <nav className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <a href="/user">Home</a>
          </li>
          <li>
            <a href="/user/shop">Shop</a>
          </li>
          <li>
            <a href="/shop/product/1">Product Name</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
