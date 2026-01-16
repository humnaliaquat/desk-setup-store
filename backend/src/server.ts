import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "../src/routes/productRoutes.js"
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDB();
// post product details
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
