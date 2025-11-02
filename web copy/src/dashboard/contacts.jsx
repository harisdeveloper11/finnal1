// src/dashboard/contacts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/contacts`)
      .then(res => setContacts(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Contacts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map(contact => (
          <div key={contact._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{contact.name}</h3>
            <p className="text-sm text-gray-600">{contact.email}</p>
            <p className="text-sm font-semibold">{contact.subject}</p>
            <p className="text-sm mt-2">{contact.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(contact.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {contacts.length === 0 && (
        <p className="text-gray-500 text-center mt-8">No contact messages yet. Messages from the contact form will appear here.</p>
      )}
    </div>
  );
};

export default Contacts;
