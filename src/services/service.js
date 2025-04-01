// utils/serviceApi.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const serviceApi = {
  // Get all services
  getAllServices: async () => {
    const response = await fetch(`${API_URL}/api/designer/services`, {
      credentials: 'include' // Include cookies for Passport session
    });
    
    if (response.status === 401) {
      // Handle unauthorized - you might want to redirect here
      throw new Error('Please log in to view services');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.msg || 'Failed to fetch services');
    }
    
    return response.json();
  },
  
  // Get service by ID
  getServiceById: async (serviceId) => {
    const response = await fetch(`${API_URL}/api/designer/services/${serviceId}`, {
      credentials: 'include' // Include cookies for Passport session
    });
    
    if (response.status === 401) {
      throw new Error('Please log in to view service details');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.msg || 'Failed to fetch service details');
    }
    
    return response.json();
  },
  
  // Apply for a service
  applyForService: async (serviceId) => {
    const response = await fetch(`${API_URL}/api/designer/services/${serviceId}/apply`, {
      method: 'PUT',
      credentials: 'include', // Include cookies for Passport session
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 401) {
      throw new Error('Please log in to apply for services');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.msg || 'Failed to apply for service');
    }
    
    return response.json();
  }
};

export default serviceApi;