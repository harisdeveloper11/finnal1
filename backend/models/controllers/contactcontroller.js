import Contact from "../contact.js";

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    const snapshot = await Contact.get();
    const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

// Add new contact
export const addContact = async (req, res) => {
  try {
    const docRef = await Contact.add(req.body);
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(400).json({ message: "Failed to add contact" });
  }
};
