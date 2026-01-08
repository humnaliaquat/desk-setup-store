import Products from "../models/Products.js";
import type { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

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
      status,
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
      status,
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



export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    /*  Delete Images from Cloudinary  */
    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        if (image.public_id) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }
    }

    /*  Delete Product */
    await Products.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct: product,
    });
  } catch (error: any) {
    console.error("Error deleting product:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server error: Unable to delete product",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      name,
      price,
      description,
      category,
      tags,
      variants,
      stock,
      status,
    } = req.body;

    
    let images: any[] = [];

    if (req.files && Array.isArray(req.files)) {
      images = req.files.map((file: any) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    
    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim())
      : [];

    
    let parsedVariants: any[] = [];

    if (variants) {
      parsedVariants =
        typeof variants === "string" ? JSON.parse(variants) : variants;
    }

    
    const parsedStock =
      parsedVariants.length > 0 ? 0 : Number(stock || 0);

    
    const product = await Products.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        category,
        status,
        tags: parsedTags,
        variants: parsedVariants,
        stock: parsedStock,
        ...(images.length > 0 && { images }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
//get single product by id
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error: Unable to fetch product",
    });
  }
};
