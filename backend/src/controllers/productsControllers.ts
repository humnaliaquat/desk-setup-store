import Products from "../models/Products.js";
import type { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const { name, price, description , category, tags} = req.body;

    const images = req.files.map((file: any) => ({
      url: file.path,
      public_id: file.filename,
    }));
    const parsedTags = Array.isArray(tags)
  ? tags
  : typeof tags === "string"
  ? tags.split(",").map((t) => t.trim())
  : [];

    const product = await Products.create({
      name,
      price,
      description,
      images,
      category,
      tags: parsedTags,
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
