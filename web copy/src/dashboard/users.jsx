// src/dashboard/users.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Assuming there's a users API, for now placeholder
    // axios.get('http://localhost:5000/api/users')
    //   .then(res => setUsers(res.data))
    //   .catch(err => console.log(err));
    // Placeholder data
    setUsers([
      { _id: 1, name: 'John Doe', email: 'john@example.com' },
      { _id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
