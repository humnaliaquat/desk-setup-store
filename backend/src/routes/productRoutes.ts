import express from "express";
import upload from "../middlewares/upload.js";
import { createProduct,getProducts ,deleteProduct, updateProduct} from "../controllers/productsControllers.js";
const router = express.Router();
// upload single pic and product details
router.post("/", upload.array("images",4),createProduct);
// get products
router.get("/get",getProducts);
//delete products
router.delete("/:id",deleteProduct);
//update product
router.put("/:id", upload.array("images"),updateProduct)
export default router;
