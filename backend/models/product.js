import db from '../firebaseConfig.js';

const productsCollection = db.collection('products');

export default productsCollection;
