import db from '../firebaseConfig.js';

const ordersCollection = db.collection('orders');

export default ordersCollection;
