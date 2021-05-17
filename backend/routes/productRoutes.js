import express from "express";
import { createProduct, getAllProduct } from "../controller/productController";

const router = express.Router();
router.route("/").post(createProduct).get(getAllProduct);

export default router;
