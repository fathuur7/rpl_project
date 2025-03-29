'use client';
import React, { useState, useEffect } from 'react';

const CategoryForm = ({
  editingCategory,
  onAddCategory,
  onUpdateCategory,
  onCancelEdit
}) => {
  const [name, setName] = useState('');

  // Update input when editing category changes
  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
    } else {
      setName('');
    }
  }, [editingCategory]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingCategory) {
      onUpdateCategory(editingCategory._id, name);
    } else {
      onAddCategory(name);
    }

    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center">
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded mr-2 flex-grow"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        {editingCategory ? 'Update' : 'Add'}
      </button>
      {editingCategory && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CategoryForm;
