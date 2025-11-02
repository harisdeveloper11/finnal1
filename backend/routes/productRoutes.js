import express from "express";
import {
  getProducts,
  getProductById,
  getRelatedProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCollection,
} from "../models/controllers/productcontroller.js"; // ✅ fixed path

const router = express.Router();

// ⚠️ Related route ko sabse pehle rakho (important)
router.get("/related/:id", getRelatedProducts);

// ✅ Get all products
router.get("/", getProducts);

// ✅ Get products by collection
router.get("/collection/:type", getProductsByCollection);

// ✅ Get single product
router.get("/:id", getProductById);

// ✅ Add new product
router.post("/", addProduct);

// ✅ Update product
router.put("/:id", updateProduct);

// ✅ Delete product
router.delete("/:id", deleteProduct);

export default router;
