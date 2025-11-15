import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-selector">
      <h2>Select a Category</h2>
      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;