'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const FileUploadComponent = ({ orderId }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    if (!title.trim()) {
      setError('Please provide a title for the deliverable');
      return;
    }

    try {
      setIsUploading(true);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('orderId', orderId);
      formData.append('title', title);
      formData.append('description', description);
      
      // Upload the file using fetch
      const response = await fetch('/api/deliverables', {
        method: 'POST',
        body: formData,
        credentials: 'include' // Include cookies for auth
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload deliverable');
      }
      
      const result = await response.json();
      
      setSuccess('Deliverable uploaded successfully!');
      setFile(null);
      setTitle('');
      setDescription('');
      
      // Refresh the page or update the UI
      router.refresh();
      
    } catch (err) {
      setError(err.message || 'Error uploading deliverable');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Submit Deliverable</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            File Upload
          </label>
          <input
            type="file"
            id="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Max file size: 10MB. Supported formats: JPG, PNG, PDF, etc.
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Submit Deliverable'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUploadComponent;