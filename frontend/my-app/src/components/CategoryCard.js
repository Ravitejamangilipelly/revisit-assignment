import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ category, onEdit }) => {
  return (
    <div className="card">
      <img src={category.imageUrl} alt={category.name} className="card-img" />
      <h3>{category.name}</h3>
      <p>{category.itemCount} items</p>
      <button className="btn" onClick={() => onEdit(category)}>Edit</button>
    </div>
  );
};

export default CategoryCard;