import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';
import CategoryForm from '../components/CategoryForm';
import './Dashboard.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/categories', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCategories(res.data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleEdit = (data) => {
    setEditData(data);
    setShowForm(true);
  };

  return (
    <div className="dashboard-container">
      <h1>Categories</h1>
      <button className="btn" onClick={() => { setEditData(null); setShowForm(true); }}>+ Add Category</button>
      <div className="grid">
        {categories.map(cat => (
          <CategoryCard key={cat._id} category={cat} onEdit={handleEdit} />
        ))}
      </div>
      {showForm && (
        <CategoryForm onClose={() => setShowForm(false)} onSuccess={fetchCategories} initialData={editData} />
      )}
    </div>
  );
};

export default Dashboard;