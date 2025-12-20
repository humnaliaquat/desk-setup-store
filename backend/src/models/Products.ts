import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required: true,
      trim: true,
    },
    price:{
      type: Number,
      required: true,
    },
    description: String,
    images:[
      {
        url:{
          type:String,
          required:true,
        },
        public_id:{
          type:String,
          required:true,
        }
      },
    ],
    category:{
      type:String,
      requried:true,
      trim:true,
      lowercase:true,
      index:true,
    },
    tags:{
      type: [String],
      default: [],
      lowercase: true,
    }
    
  },
  {timestamps:true}
);
export default mongoose.model("Product", productSchema);