import { model, Schema } from "mongoose";

const productSchema =  Schema(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      default: 10,
    },
    price: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    
  },
  { timestamps: true }
);
const Product = model("Product", productSchema);
export default Product;
