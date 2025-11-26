# Desk Setup Store -- Full-Stack E‑Commerce (Next.js + Node.js + TypeScript)

This is a full‑stack e‑commerce project built for portfolio purposes.\
It allows users to browse desk‑setup products, view details, add to
cart, and checkout.\
Admin can manage products and data using a backend API.

------------------------------------------------------------------------

## 🚀 Tech Stack

### **Frontend**

-   Next.js 14 (App Router)
-   TypeScript
-   Tailwind CSS
-   Zustand (state management)
-   Axios (API calls)

### **Backend**

-   Node.js
-   Express.js
-   TypeScript
-   MongoDB + Mongoose
-   Dotenv
-   CORS

------------------------------------------------------------------------

## 📂 Project Structure

### **Frontend (`desk-setup-store/`)**

    src/
      app/
        layout.tsx
        page.tsx
        products/
          page.tsx
        products/[id]/
          page.tsx
        cart/
          page.tsx
        checkout/
          page.tsx
        ai-builder/
          page.tsx
      components/
        Navbar.tsx
        ProductCard.tsx
        Footer.tsx
      lib/
        axios.ts
      store/
        cartStore.ts
      types/
        product.ts

------------------------------------------------------------------------

### **Backend (`desk-setup-backend/`)**

    src/
      server.ts
      config/
        db.ts
      models/
        Product.ts
      routes/
        productRoutes.ts
      controllers/
        productController.ts
      types/
        Product.ts

------------------------------------------------------------------------

## 🛠 Installation & Setup

### **Frontend**

``` bash
cd desk-setup-store
npm install
npm run dev
```

Frontend runs on:\
`http://localhost:3000`

------------------------------------------------------------------------

### **Backend**

``` bash
cd desk-setup-backend
npm install
npm run dev
```

Backend runs on:\
`http://localhost:5000`

------------------------------------------------------------------------

## 🔗 API Routes

### **GET /api/products**

Fetch all products.

### **GET /api/products/:id**

Fetch a single product by ID.

------------------------------------------------------------------------

## 🧩 Features

### **Frontend Features**

-   Fully responsive layout
-   Modern, minimal UI
-   Product listing page
-   Product detail page
-   Add to cart
-   Cart page
-   Checkout skeleton
-   Zustand‑powered cart state
-   AI Setup Builder (optional)

### **Backend Features**

-   MongoDB connection
-   Product CRUD (basic)
-   Controller + Route structure
-   Typed models and responses

------------------------------------------------------------------------

## 🖼 Todo / Upcoming Features

-   Authentication (JWT)
-   Admin panel
-   Order tracking
-   Search & filters
-   Payment integration
-   Product reviews

------------------------------------------------------------------------

## 📜 License

This project is free to use for portfolio and educational purposes.

------------------------------------------------------------------------

## ✨ Author

Built with ❤️ by Hani\
Location: Lahore, Pakistan\
Full‑Stack Developer (MERN + Next.js)

------------------------------------------------------------------------
