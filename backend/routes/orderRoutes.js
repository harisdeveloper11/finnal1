import express from "express";
import {
  getOrders,
  addOrder,
  updateOrderStatus,
} from "../models/controllers/ordercontroller.js";

const router = express.Router();

// Get all orders
router.get("/", getOrders);

// Add new order
router.post("/", addOrder);

// Update order status
router.put("/:id/status", updateOrderStatus);

export default router;
