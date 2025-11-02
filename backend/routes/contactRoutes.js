import express from "express";
import {
  getContacts,
  addContact,
} from "../models/controllers/contactcontroller.js";

const router = express.Router();

// Get all contacts
router.get("/", getContacts);

// Add new contact
router.post("/", addContact);

export default router;
