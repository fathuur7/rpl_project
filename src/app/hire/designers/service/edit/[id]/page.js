'use client';

import React, { useState, useEffect , useRef} from 'react';
import { useParams, useRouter } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';
import { fetchCategories as fetchCategoriesService } from '@/services/categories';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const EditServicePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const user = useCurrentUser();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    category: '',
    attachments: []
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Fetch service request data
 // Tambahkan state untuk melacak apakah data telah dimuat
    const [dataLoaded, setDataLoaded] = useState(false);

// Modifikasi useEffect
    useEffect(() => {
    console.log('User:', user);
    if (!user || dataLoaded) return;
    
    const fetchData = async () => {
        try {
        await Promise.all([
            fetchServiceRequest(),
            loadCategories()
        ]);
        setDataLoaded(true);
        } catch (err) {
        console.error('Error loading data:', err);
        } finally {
        setLoading(false);
        }
    };
    
    fetchData();
    }, [id, user, dataLoaded]);
  
  const fetchServiceRequest = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch service request');
      }
      
      const data = await response.json();
      
      // Format the date from ISO to YYYY-MM-DD for input field
      const deadlineDate = new Date(data.deadline);
      const formattedDate = deadlineDate.toISOString().split('T')[0];
      
      setFormData({
        title: data.title || '',
        description: data.description || '',
        budget: data.budget || '',
        deadline: formattedDate || '',
        category: data.category?._id || data.category || '',
        attachments: data.attachments || []
      });
    } catch (err) {
      console.error('Error fetching service request:', err);
      setError('Failed to load service request. Please try again later.');
      toast.error('Failed to load service request');
    }
  };
  
  const loadCategories = async () => {
    try {
      const data = await fetchCategoriesService();
      setCategories(data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to load categories. Please refresh the page and try again.');
      toast.error('Failed to load categories');
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Handle different input types properly
    const newValue = type === 'number' ? parseFloat(value) || value : value;
    
    // Update state and ensure it persists
    setFormData(prevState => {
      const updatedState = {
        ...prevState,
        [name]: newValue
      };
      
      // For debugging - remove in production
      console.log(`Field ${name} updated to:`, newValue);
      
      return updatedState;
    });
  };
  
  const handleFileChange = (e) => {
    // Simpan hanya nama file atau URL dari file, bukan objek kompleks
    const files = Array.from(e.target.files);
    
    // Asumsi: server Anda hanya menerima string/URL untuk attachment
    setFormData(prevState => ({
      ...prevState,
      // Simpan string URL saja untuk dikirim ke server
      attachments: [...prevState.attachments, ...files.map(file => file.name)] 
    }));
  };
  
  const removeAttachment = (index) => {
    setFormData(prevState => ({
      ...prevState,
      attachments: prevState.attachments.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    // Buat salinan dari formData untuk modifikasi sebelum mengirim
    const formDataToSubmit = {...formData};
    
    // Pastikan attachments hanya berisi string, bukan objek kompleks
    if (formDataToSubmit.attachments && Array.isArray(formDataToSubmit.attachments)) {
      formDataToSubmit.attachments = formDataToSubmit.attachments.map(attachment => {
        // Jika attachment adalah objek, ambil hanya URL atau name
        if (typeof attachment === 'object') {
          return attachment.url || attachment.name || '';
        }
        return attachment; // Jika sudah berupa string
      });
    }
        // Basic validation
    if (!formData.title.trim()) {
        setError('Title is required');
        setSubmitting(false);
    return;
    }

    if (!formData.category) {
        setError('Please select a category');
        setSubmitting(false);
    return;
    }

    if (parseFloat(formData.budget) <= 0) {
        setError('Budget must be greater than zero');
        setSubmitting(false);
    return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataToSubmit) // Kirim data yang sudah dimodifikasi
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update service request');
      }
      
      // Success notification
      toast.success('Service request updated successfully!');
      
      // Navigate back after successful update
      setTimeout(() => {
        router.push('/hire/status');
      }, 1000);
    } catch (err) {
      console.error('Error updating service request:', err);
      setError(err.message || 'Failed to update service request. Please try again.');
      toast.error('Failed to update service request');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="text-center p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Please log in to edit service requests</p>
          <button 
            onClick={() => router.push('/login')}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Service Request</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            maxLength={100}
          />
        </div>
        
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength={10}
            maxLength={1000}
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.description.length}/1000 characters
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">
              Budget <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="1"
                step="0.01"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="deadline" className="block text-gray-700 font-medium mb-2">
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={new Date().toISOString().split('T')[0]} // Can't select dates in the past
            />
          </div>
        </div>
        
        
        <div className="mb-4">
          <label htmlFor="attachments" className="block text-gray-700 font-medium mb-2">
            Attachments (Max 5 files, 5MB each)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:bg-gray-50 transition-colors">
            <input
              type="file"
              id="attachments"
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label htmlFor="attachments" className="cursor-pointer text-blue-500 hover:text-blue-700">
              Click to upload files or drag and drop
            </label>
          </div>
          
          {formData.attachments.length > 0 && (
            <div className="mt-4">
              <p className="font-medium mb-2">Current Attachments:</p>
              <ul className="border rounded-md divide-y">
                {formData.attachments.map((attachment, index) => (
                  <li key={index} className="flex items-center justify-between p-3 hover:bg-gray-50">
                    <a 
                      href={attachment.url || attachment} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 truncate"
                    >
                      {attachment.name || (typeof attachment === 'string' 
                        ? attachment.split('/').pop() 
                        : 'Attachment ' + (index + 1))}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                      aria-label="Remove attachment"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.push('/hire/designers')}
            className="order-2 sm:order-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={submitting}
            className="order-1 sm:order-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : 'Update Service Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditServicePage;