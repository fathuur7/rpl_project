'use client'

import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '@/services/categories';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Load categories from the API
  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  // Handle adding a new category
  const handleAddCategory = async (categoryName) => {
    try {
      await addCategory(categoryName);
      loadCategories();
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  // Handle updating an existing category
  const handleUpdateCategory = async (id, newName) => {
    try {
      await updateCategory(id, newName);
      setEditingCategory(null);
      loadCategories();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  // Prepare category for editing
  const startEditing = (category) => {
    setEditingCategory(category);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingCategory(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Category Management</h2>
      
      <CategoryForm 
        editingCategory={editingCategory}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onCancelEdit={cancelEditing}
      />
      
      <CategoryList 
        categories={categories}
        onEditCategory={startEditing}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
};

export default CategoriesPage;