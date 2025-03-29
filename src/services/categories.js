const API_URL = "http://localhost:5000/api/categories";

// Fetch all categories
export const fetchCategories = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

// Add a new category
export const addCategory = async (name) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Failed to add category');
  }
};

// Update an existing category
export const updateCategory = async (id,name) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Failed to update category');
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { 
    method: "DELETE" 
  });

  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
};