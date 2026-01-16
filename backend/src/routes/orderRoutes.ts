import express from "express";
import { createOrder, getAllOrders, getOneOrder } from "../controllers/orderController.js";
const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id",getOneOrder);
export default router;