import type { Request, Response } from "express";
import Order from "../models/Order.js";

//create order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, payment, total, delivery, items } = req.body;

  
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    const order = await Order.create({ customerName, payment, total, delivery, items });
    res.status(201).json(order);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


//get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


//get on order by id
export const getOneOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // assuming route is /orders/:id
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
