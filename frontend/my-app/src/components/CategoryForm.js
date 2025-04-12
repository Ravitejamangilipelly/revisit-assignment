import React, { useState } from 'react';
import axios from 'axios';
import './CategoryForm.css';

const CategoryForm = ({ onClose, onSuccess, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [itemCount, setItemCount] = useState(initialData?.itemCount || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (initialData) {
        await axios.put(`http://localhost:5000/api/categories/${initialData._id}`, { name, itemCount, imageUrl }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/categories', { name, itemCount, imageUrl }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      onClose();
      onSuccess();
    } catch (err) {
      alert('Error saving category');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{initialData ? 'Edit' : 'Add'} Category</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="number" placeholder="Item Count" value={itemCount} onChange={(e) => setItemCount(e.target.value)} required />
          <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
          <div className="modal-actions">
            <button type="submit" className="btn">Save</button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
