// pages/services/index.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch services with credentials (cookies) included for Passport
    fetch('http://localhost:5000/api/designer/services', {
      credentials: 'include' // This is important for including cookies with the request
    })
      .then(response => {
        if (response.status === 401) {
          // Unauthorized, redirect to login
          throw new Error('Please log in to view services');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        return response.json();
      })
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  if (loading) return <div>Loading...</div>;
  
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Services</h1>
      
      {services.length === 0 ? (
        <p className="text-gray-500">No services available at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service._id} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <div className="mb-2">
                <span className="text-sm text-gray-600">Category: {service.category?.name || 'Unknown'}</span>
              </div>
              <div className="mb-2">
                <span className="text-sm text-gray-600">Client: {service.client?.name || 'Anonymous'}</span>
              </div>
              <p className="text-gray-700 mb-3">{service.description}</p>
              <p className="font-medium mb-2">Budget: ${service.budget}</p>
              <div className="mb-3">
                <span className="text-sm text-gray-600">Deadline: {new Date(service.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </span>
                <Link 
                  href={`/admin/status/${service._id}`} 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}