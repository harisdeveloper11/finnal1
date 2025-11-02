import Product from "../product.js"; // ✅ fixed import (ES module style)

// ✅ Get all products
export const getProducts = async (req, res) => {
  try {
    const snapshot = await Product.get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ✅ Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const doc = await Product.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: "Product not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// ✅ Get related products (same category, exclude current)
export const getRelatedProducts = async (req, res) => {
  try {
    const currentDoc = await Product.doc(req.params.id).get();
    if (!currentDoc.exists)
      return res.status(404).json({ message: "Product not found" });

    const currentProduct = currentDoc.data();
    const snapshot = await Product.where('category', '==', currentProduct.category).get();
    const related = snapshot.docs
      .filter(doc => doc.id !== req.params.id)
      .slice(0, 4)
      .map(doc => ({ id: doc.id, ...doc.data() }));

    res.json(related);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Failed to fetch related products" });
  }
};

// ✅ Add new product
export const addProduct = async (req, res) => {
  try {
    const docRef = await Product.add(req.body);
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(400).json({ message: "Failed to add product" });
  }
};

// ✅ Update product
export const updateProduct = async (req, res) => {
  try {
    await Product.doc(req.params.id).update(req.body);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to update product" });
  }
};

// ✅ Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.doc(req.params.id).delete();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete product" });
  }
};

// ✅ Get products by collection
export const getProductsByCollection = async (req, res) => {
  try {
    const { type } = req.params;
    const snapshot = await Product.where('collection', '==', type).get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products by collection" });
  }
};
