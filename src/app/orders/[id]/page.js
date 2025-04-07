// pages/orders/[id].js
'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderDetail() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  
  useEffect(() => {
    if (!id) return;

    // Fetch order details
    fetch(`http://localhost:5000/api/orders/${id}`, {
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 401) {
          router.push('/auth/login');
          throw new Error('Please log in to view order details');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        return response.json();
      })
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, router]);

  // Function to render status badge with appropriate color
  const renderStatusBadge = (status) => {
    let bgColor = 'bg-gray-100 text-gray-800';
    
    switch(status) {
      case 'in_progress':
        bgColor = 'bg-blue-100 text-blue-800';
        break;
      case 'revision':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'completed':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'cancelled':
        bgColor = 'bg-red-100 text-red-800';
        break;
    }
    
    // Convert snake_case to Title Case
    const formattedStatus = status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return (
      <span className={`px-2 py-1 rounded text-sm ${bgColor}`}>
        {formattedStatus}
      </span>
    );
  };

  // Function to handle requesting a revision
  const requestRevision = () => {
    // Implement when needed
    alert('Revision request functionality will be implemented here');
  };

  // Function to handle marking order as completed
  const markCompleted = () => {
    // Implement when needed
    alert('Mark as completed functionality will be implemented here');
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  
  if (!order) return <div className="text-center p-4">Order not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Link href="/orders" className="text-blue-500 mb-4 inline-block">
        &larr; Back to Orders
      </Link>
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Order #{order._id.substring(order._id.length - 6)}</h1>
          <div>{renderStatusBadge(order.status)}</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-3">Order Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">${order.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created On:</span>
                <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">{new Date(order.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className={`font-medium ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                  {order.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
              {order.revisionCount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Revisions:</span>
                  <span className="font-medium">{order.revisionCount}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-3">Service Information</h2>
            {order.service ? (
              <div className="space-y-2">
                <div className="font-medium">{order.service.title}</div>
                <div className="text-sm text-gray-600 line-clamp-3">{order.service.description}</div>
                <Link 
                  href={`/services/${order.service._id}`}
                  className="text-blue-500 hover:underline text-sm inline-block mt-2"
                >
                  View Full Service Details
                </Link>
              </div>
            ) : (
              <div className="text-gray-600">Service information not available</div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Client</h2>
            {order.client ? (
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {order.client.name ? order.client.name.charAt(0).toUpperCase() : 'C'}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{order.client.name || 'Anonymous Client'}</div>
                  <div className="text-sm text-gray-600">{order.client.email || ''}</div>
                </div>
              </div>
            ) : (
              <div className="text-gray-600">Client information not available</div>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-3">Designer</h2>
            {order.designer ? (
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {order.designer.name ? order.designer.name.charAt(0).toUpperCase() : 'D'}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{order.designer.name || 'Anonymous Designer'}</div>
                  <div className="text-sm text-gray-600">{order.designer.email || ''}</div>
                </div>
              </div>
            ) : (
              <div className="text-gray-600">Designer information not available</div>
            )}
          </div>
        </div>
        
        {/* Order Actions Section */}
        <div className="border-t pt-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Order Actions</h2>
          
          <div className="flex flex-wrap gap-3">
            {/* Show different actions based on order status and user role */}
            {order.status === 'in_progress' && (
              <>
                <button 
                  onClick={requestRevision}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Request Revision
                </button>
                <button 
                  onClick={markCompleted}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Mark as Completed
                </button>
              </>
            )}
            
            {order.status === 'completed' && !order.isPaid && (
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Process Payment
              </button>
            )}
            
            {/* Message button is always available */}
            <Link
              href={`https://wa.me/6285815245639?text=${encodeURIComponent(
                `Hello ${order.designer ? order.designer.name : 'Designer'},\n\n` +
                `Here are the details of my order:\n` +
                `Order ID: ${order._id}\n` +
                `Client: ${order.client ? order.client.name : 'Client'}\n` +
                `Service: ${order.service ? order.service.title : 'Service title not available'}\n` +
                `Description: ${order.service ? order.service.description : 'Service description not available'}\n` +
                `Designer: ${order.designer ? order.designer.name : 'Designer'}\n` +
                `Price: Rp${order.price}\n` +
                `Created On: ${new Date(order.createdAt).toLocaleDateString()}\n` +
                `Last Updated: ${new Date(order.updatedAt).toLocaleDateString()}\n` +
                `Order Status: ${order.status}\n` +
                `Payment Status: ${order.isPaid ? 'Paid' : 'Unpaid'}\n` +
                `Number of Revisions: ${order.revisionCount}\n\n` +
                `Please confirm or continue the discussion.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              WhatsApp {order.designer ? order.designer.name : 'Designer'}
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}