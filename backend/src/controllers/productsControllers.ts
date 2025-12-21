import Products from "../models/Products.js";
import type { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const {
      name,
      price,
      description,
      category,
      tags,
      variants,
      stock,
    } = req.body;

    // images
    const images = req.files.map((file: any) => ({
      url: file.path,
      public_id: file.filename,
    }));

    //  tags parsing
    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim())
      : [];

    // variants parsing (JSON string → object)
    let parsedVariants = [];
    if (variants) {
      parsedVariants =
        typeof variants === "string" ? JSON.parse(variants) : variants;
    }

    // stock (only for non-variant products)
    const parsedStock =
      parsedVariants.length > 0 ? 0 : Number(stock || 0);

    const product = await Products.create({
      name,
      price,
      description,
      images,
      category,
      tags: parsedTags,
      variants: parsedVariants,
      stock: parsedStock,
    });

    res.status(201).json(product);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// GET all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Products.find();

    if (products.length === 0) {
      return res.status(200).json({
        message: "No products found",
        data: [],
      });
    }

    res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
      count: products.length,
    });
  } catch (err: any) {
    console.error("Error fetching products:", err); 
    res.status(500).json({
      message: "Failed to fetch products",
      error: err.message,
    });
  }
};
