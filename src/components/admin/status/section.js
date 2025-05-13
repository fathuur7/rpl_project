'use client';

import React, { useState, useEffect } from 'react';

const DesignerServiceRequests = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'available', 'expired'

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/designer/services', {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch service requests');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError('Failed to fetch service requests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Frontend - handleCancel function
    const handleCancel = async (serviceId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/designer/${serviceId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to cancel service');
      }
  
      const result = await response.json();
      
      // Update UI after successful cancellation
      setServices(prevServices => 
        prevServices.map(service => 
          service._id === serviceId ? { ...service, status: 'cancelled' } : service
        )
      );
  
      // Show success notification
      alert(result.msg);
      
      return true;
    } catch (error) {
      console.error('Error cancelling service:', error);
      alert(error.message);
      return false;
    }
  };

  // Check if deadline is in the future
  const isDeadlineAvailable = (deadline) => {
    const now = new Date();
    const serviceDeadline = new Date(deadline);
    return serviceDeadline > now;
  };

  // Filter services based on deadline
  const filteredServices = services.filter(service => {
    if (filter === 'all') return true;
    if (filter === 'available') return isDeadlineAvailable(service.deadline);
    if (filter === 'expired') return !isDeadlineAvailable(service.deadline);
    if (filter === 'cancelled') return service.status === 'cancelled';
    return true;
  });

  const handleEmailClick = (clientEmail, serviceTitle, clientName, designerName) => {
    const subject = `Apology for Late Assignment of Service Request: ${serviceTitle}`;
    const body = `Dear ${clientName},\n\nI want to start by apologizing for the late assignment of your service request for "${serviceTitle}". I know how important it is to have a designer assigned to your project in a timely manner, and I fell short of that standard.\n\nPlease know that I am fully committed to making it right and delivering high-quality work. I am excited to work on your project and get started as soon as possible.\n\nAs a token of apology, I am willing to offer a compensation of 10% of the total project cost or extend the deadline by 3 days, whichever you prefer. Please let me know your preference by replying to this email.\n\nOnce again, I apologize for the inconvenience and appreciate your understanding.\n\nBest regards,\n${designerName}`;
    window.location.href = `mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) return <div className="flex justify-center p-8">Loading service requests...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 truncate">Service Requests</h1>
      
      <div className="mb-6">
        <label className="mr-2 font-medium">Filter by deadline:</label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Requests</option>
          <option value="cancelled">Cancelled</option>
          <option value="available">Available (Deadline not passed)</option>
          <option value="expired">Expired (Deadline passed)</option>
        </select>
      </div>
      
      {filteredServices.length === 0 ? (
        <div className="p-4 bg-gray-100 rounded">No service requests found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <div key={service._id} className="border rounded p-4 shadow overflow-hidden">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold truncate max-w-[70%]">{service.title}</h2>
                <span className={`px-2 py-1 rounded text-sm flex-shrink-0 ${
                  service.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {service.status}
                </span>
              </div>
              
              <p className="text-gray-600 mt-2 line-clamp-2 overflow-ellipsis">{service.description}</p>
              
              <div className="mt-4">
                <p className="text-sm truncate">
                  <span className="font-medium">Category:</span> {service.category.name}
                </p>
                <p className="text-sm truncate">
                  <span className="font-medium">Budget:</span> ${service.budget}
                </p>
                <p className="text-sm truncate">
                  <span className="font-medium">Client:</span> {service.client.name}
                </p>
                <p className="text-sm truncate">
                  <span className="font-medium">Deadline:</span> {new Date(service.deadline).toLocaleDateString()}
                  {isDeadlineAvailable(service.deadline) ? (
                    <span className="ml-2 text-green-600 font-medium">Available</span>
                  ) : (
                    <span className="ml-2 text-red-600 font-medium">Expired</span>
                  )}
                </p>
                <p className="text-sm truncate">
                  <span className="font-medium">Max Revisions:</span> {service.maxRevisions}
                </p>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2 flex-shrink-0">
                {service.status === 'assigned' && !isDeadlineAvailable(service.deadline) && (
                  <div
                  className="flex space-x-2"
                  >
                  <button 
                    onClick ={() => handleCancel(service._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  > Cancel 
                  </button>

                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={
                      handleEmailClick(service.clientEmail, service.title, service.clientName, service.designerName)
                    }
                  > Chat Client 
                  </button>
                  </div>
                )}
                {service.status === 'assigned' && isDeadlineAvailable(service.deadline) && (
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  > Submit 
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignerServiceRequests;