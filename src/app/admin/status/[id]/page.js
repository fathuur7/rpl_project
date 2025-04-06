// pages/services/[id].js
'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function ServiceDetail() {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/designer/services/${id}`, {
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 401) {
          router.push('/auth/login');
          throw new Error('Please log in to view service details');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch service details');
        }
        return response.json();
      })
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, router]);

  const handleApply = () => {
    setApplying(true);
    
    fetch(`http://localhost:5000/api/designer/services/${id}/apply`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 401) {
          router.push('/auth/login');
          throw new Error('Please log in to apply for services');
        }
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.msg || 'Failed to apply for service');
          });
        }
        return response.json();
      })
      .then(data => {
        // Handle successful application with order creation
        alert('Application submitted successfully! An order has been created.');
        
        // Check if we received order data in response
        if (data.order && data.order._id) {
          // Navigate to the order details page
          router.push(`/orders/${data.order._id}`);
        } else {
          // If no order details, just refresh service details
          router.push(`admin/status/${id}`);
        }
      })
      .catch(err => {
        alert(err.message);
        setApplying(false);
      });
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  
  if (!service) return <div className="text-center p-4">Service not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Link href="#" onClick={() => router.back()} className="text-blue-500 mb-4 inline-block">
        &larr; Back to Services
      </Link>
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <h1 className="text-2xl font-bold mb-4">{service.title}</h1>
        
        <div className="mb-4">
          <span className={`px-2 py-1 rounded text-sm ${
            service.status === 'open' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Category</p>
            <p className="font-medium">{service.category?.name || 'Unknown'}</p>
          </div>
          <div>
            <p className="text-gray-600">Client</p>
            <p className="font-medium">{service.client?.name || 'Anonymous'}</p>
          </div>
          <div>
            <p className="text-gray-600">Budget</p>
            <p className="font-medium">${service.budget}</p>
          </div>
          <div>
            <p className="text-gray-600">Deadline</p>
            <p className="font-medium">{new Date(service.deadline).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="whitespace-pre-line">{service.description}</p>
        </div>
        
        {service.attachments && service.attachments.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Attachments</h2>
            <ul className="list-disc list-inside">
              {service.attachments.map((attachment, index) => (
                <li key={index}>
                  <a 
                    href={attachment} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Attachment {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {service.status === 'open' && (
          <button
            onClick={handleApply}
            disabled={applying}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {applying ? 'Submitting Application...' : 'Apply for This Project'}
          </button>
        )}
      </div>
    </div>
  );
}