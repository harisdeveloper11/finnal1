// src/dashboard/products.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    collection: 'featured'
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchProducts = () => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    setFormData({ ...formData, image: e.target.value });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price) || 0
    };
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/products`, productData)
      .then(() => {
        toast.success('Product created successfully');
        setShowCreateForm(false);
        setFormData({ name: '', price: '', category: '', description: '', image: '', collection: 'featured' });
        setImageFile(null);
        setImagePreview(null);
        fetchProducts();
      })
      .catch(err => {
        console.error('Create product error:', err);
        toast.error('Failed to create product: ' + (err.response?.data?.message || err.message));
      });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
      image: product.image || '',
      collection: product.collection || 'featured'
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price) || 0
    };
    axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/products/${editingProduct.id}`, productData)
      .then(() => {
        toast.success('Product updated successfully');
        setEditingProduct(null);
        setFormData({ name: '', price: '', category: '', description: '', image: '', collection: 'featured' });
        setImageFile(null);
        setImagePreview(null);
        fetchProducts();
      })
      .catch(err => {
        console.error('Update product error:', err);
        toast.error('Failed to update product: ' + (err.response?.data?.message || err.message));
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`)
        .then(() => {
          toast.success('Product deleted successfully');
          fetchProducts();
        })
        .catch(err => toast.error('Failed to delete product'));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white p-4 md:p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Create New Product</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required className="border p-2 rounded w-full" />
            <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Price" required className="border p-2 rounded w-full" />
            <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" required className="border p-2 rounded w-full" />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Image</label>
              <input type="file" onChange={handleImageChange} accept="image/*" className="border p-2 rounded mb-2 w-full" />
              <input name="image" value={formData.image} onChange={handleImageUrlChange} placeholder="Or enter Image URL" className="border p-2 rounded w-full" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-20 w-20 object-cover" />}
            </div>
            <select name="collection" value={formData.collection} onChange={handleInputChange} required className="border p-2 rounded w-full">
              <option value="featured">Featured</option>
              <option value="trending">Trending</option>
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="deals">Deals</option>
              <option value="shop">Shop</option>
            </select>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="border p-2 rounded md:col-span-2 w-full"></textarea>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto">Create</button>
              <button type="button" onClick={() => setShowCreateForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full sm:w-auto">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Form */}
      {editingProduct && (
        <div className="bg-white p-4 md:p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required className="border p-2 rounded w-full" />
            <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Price" required className="border p-2 rounded w-full" />
            <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" required className="border p-2 rounded w-full" />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Image</label>
              <input type="file" onChange={handleImageChange} accept="image/*" className="border p-2 rounded mb-2 w-full" />
              <input name="image" value={formData.image} onChange={handleImageUrlChange} placeholder="Or enter Image URL" className="border p-2 rounded w-full" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-20 w-20 object-cover" />}
            </div>
            <select name="collection" value={formData.collection} onChange={handleInputChange} required className="border p-2 rounded w-full">
              <option value="featured">Featured</option>
              <option value="trending">Trending</option>
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="deals">Deals</option>
              <option value="shop">Shop</option>
            </select>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="border p-2 rounded md:col-span-2 w-full"></textarea>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto">Update</button>
              <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full sm:w-auto">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2 cursor-pointer" />
            </Link>
            <h3 className="font-bold">{product.name}</h3>
            <p>${product.price}</p>
            <p className="text-sm text-gray-600">{product.category}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
