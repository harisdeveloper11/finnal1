// 🌍 Load environment variables
import dotenv from "dotenv";
dotenv.config();

// 🚀 Import dependencies
import express from "express";
import cors from "cors";
import db from "./firebaseConfig.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// ⚙️ Initialize express app
const app = express();

// 🧩 Middleware setup
app.use(express.json());
app.use(cors());

// 🛒 Use routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contacts", contactRoutes);

// 🧭 Root route (for testing)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ API is running... Backend connected successfully!",
  });
});

// 📊 Dashboard route (for Vercel compatibility)
app.get("/dashboard", (req, res) => {
  return res.status(200).json({ message: "Dashboard working on Vercel ✅" });
});

// 🧱 Firestore initialized (from firebaseConfig.js)
console.log("✅ Firestore initialized successfully");

// 🚀 Start local server (important for localhost testing)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Export app for Vercel (kept for deployment)
export default app;
