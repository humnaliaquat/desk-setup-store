import mongoose, {Schema, Document} from "mongoose";
import { title } from "process";
export interface IProduct extends Document{
  title: string;
  description: string;
  price: number;
  category:string;
  image: string;
}
const ProductSchema:Schema = new Schema(
  {
    title:{type: String, required:true},
    description:String,
    price: Number,
    category: String,
    image: String,
  },
  {timestamps:true},
);

export default mongoose.model<IProduct>("Product", ProductSchema);