// src/dashboard/orders.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleShipOrder = (orderId) => {
    axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}/status`, { status: 'Shipped' })
      .then(() => {
        toast.success('Order shipped and notification sent to customer');
        fetchOrders();
      })
      .catch(err => toast.error('Failed to ship order'));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{order.customerName}</h3>
            <p className="text-sm text-gray-600">{order.email}</p>
            <p className="text-sm">{order.phone}</p>
            <p className="text-sm">{order.address}</p>
            <p className="font-semibold">Total: ${order.total}</p>
            <p className={`text-sm font-medium ${order.status === 'Shipped' ? 'text-green-600' : order.status === 'Delivered' ? 'text-blue-600' : 'text-yellow-600'}`}>
              Status: {order.status}
            </p>
            <div className="mt-2">
              <h4 className="text-sm font-semibold mb-1">Items:</h4>
              <ul className="text-xs space-y-1">
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} (x{item.quantity}) - ${item.price * item.quantity}</li>
                ))}
              </ul>
            </div>
            {order.status === 'Pending' && (
              <button
                onClick={() => handleShipOrder(order.id)}
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 w-full"
              >
                Ship Order
              </button>
            )}
          </div>
        ))}
      </div>
      {orders.length === 0 && (
        <p className="text-gray-500 text-center mt-8">No orders yet. Orders placed from the frontend will appear here.</p>
      )}
    </div>
  );
};

export default Orders;
