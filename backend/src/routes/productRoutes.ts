import express from "express";
import upload from "../middlewares/upload.js";
import { createProduct,getProducts } from "../controllers/productsControllers.js";
const router = express.Router();
// upload single pic and product details
router.post("/", upload.array("images",4),createProduct);
// get products
router.get("/get",getProducts);
export default router;
