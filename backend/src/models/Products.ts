import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String, // e.g. "Size", "Color"
      required: true,
      trim: true,
      lowercase: true,
    },
    options: [
      {
        value: {
          type: String, // e.g. "Small", "Red"
          required: true,
          trim: true,
        },
        price: {
          type: Number, // price override (optional)
          default: null,
        },
        stock: {
          type: Number,
          default: 0,
          min: 0,
        },
        sku: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
    },
    status:{
      type:String,
      trim: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      required: true, // fixed typo
      trim: true,
      lowercase: true,
      index: true,
    },

    tags: {
      type: [String],
      default: [],
      lowercase: true,
    },

    // 🔹 Variants (size, color, etc)
    variants: {
      type: [variantSchema],
      default: [],
    },

    // 🔹 Inventory (for simple products)
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // 🔹 Auto availability
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto update inStock
productSchema.pre("save", function (next) {
  if (this.variants.length > 0) {
    const totalStock = this.variants.reduce((sum, variant) => {
      return (
        sum +
        variant.options.reduce((optSum, opt) => optSum + opt.stock, 0)
      );
    }, 0);

    this.inStock = totalStock > 0;
  } else {
    this.inStock = this.stock > 0;
  }

  next();
});

export default mongoose.model("Product", productSchema);
