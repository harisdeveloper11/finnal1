import db from '../firebaseConfig.js';

const contactsCollection = db.collection('contacts');

export default contactsCollection;
