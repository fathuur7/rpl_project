
import React from 'react';

const CategoryList = ({
  categories,
  onEditCategory,
  onDeleteCategory
}) => {
  if (categories.length === 0) {
    return <p className="text-gray-500">No categories found</p>;
  }

  return (
    <ul className="bg-gray-100 p-4 rounded-lg">
      {categories.map((category) => (
        <li 
          key={category._id} 
          className="flex justify-between items-center p-2 border-b last:border-b-0"
        >
          <span>{category.name}</span>
          <div>
            <button
              onClick={() => onEditCategory(category)}
              className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteCategory(category._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;