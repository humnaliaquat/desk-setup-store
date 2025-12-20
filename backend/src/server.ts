import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "../src/routes/productRoutes.js"
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
// post product details
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
