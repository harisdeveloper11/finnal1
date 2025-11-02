import Order from "../order.js";
import nodemailer from 'nodemailer';

// Configure nodemailer (use your email service credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER, // Set in .env
    pass: process.env.EMAIL_PASS  // Set in .env
  }
});

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const snapshot = await Order.get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Add new order
export const addOrder = async (req, res) => {
  try {
    const docRef = await Order.add(req.body);
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(400).json({ message: "Failed to add order" });
  }
};

// Update order status and send notification
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Order.doc(req.params.id).update({ status });

    const doc = await Order.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: "Order not found" });
    const order = { id: doc.id, ...doc.data() };

    // Send shipping notification if status is 'Shipped'
    if (status === 'Shipped') {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: order.email,
        subject: 'Your Order Has Been Shipped!',
        text: `Dear ${order.customerName},\n\nYour order was packed and is shipping.\n\nOrder Details:\nTotal: $${order.total}\nStatus: Shipped\n\nThank you for shopping with us!`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Email send error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Failed to update order status" });
  }
};
