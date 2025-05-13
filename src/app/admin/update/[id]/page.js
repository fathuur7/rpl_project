'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const UpdateDeliverable = () => {
  const [deliverable, setDeliverable] = useState({
    title: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchDeliverable = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/deliverables/${id}`, {
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch deliverable details');
        }
        
        const result = await response.json();
        setDeliverable(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deliverable:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchDeliverable();
    }
  }, [id]);

  const handleChange = (e) => {
    setDeliverable({
      ...deliverable,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', deliverable.title);
      formData.append('description', deliverable.description);
      
      if (file) {
        formData.append('file', file);
      }
      
      const response = await fetch(`http://localhost:5000/api/v1/deliverables/${id}`, {
        method: 'PUT',
        body: formData, // No need to set Content-Type when using FormData
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update deliverable');
      }
      
      const result = await response.json();
      setSuccessMessage('Deliverable updated successfully!');
      setLoading(false);
      
      // Redirect to deliverable details page after 2 seconds
      setTimeout(() => {
        router.push(`/deliverables/${id}`);
      }, 2000);
    } catch (error) {
      console.error('Error updating deliverable:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading && !deliverable.title) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Update Deliverable</h1>
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={deliverable.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={deliverable.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="file">
            Upload New File (Optional)
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {deliverable.fileUrl && (
            <p className="mt-2 text-sm text-gray-500">
              Current file: <a href={deliverable.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View file</a>
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            <strong>Note:</strong> You can only update deliverables that are in PENDING or REJECTED status.
          </p>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Updating...' : 'Update Deliverable'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDeliverable;