'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, FileText, User, Info, AlertCircle, Check, X, ArrowLeft, MessageSquare } from 'lucide-react';

const DeliverableDetailPage = ({ params }) => {
  // Use React.use() to unwrap the params Promise
  const unwrappedParams = React.use(params);
  const deliverableId = unwrappedParams?.id;
  
  const [deliverable, setDeliverable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchDeliverable = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/deliverables/${deliverableId}`, {
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

    if (deliverableId) {
      fetchDeliverable();
    }
  }, [deliverableId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReview = async (status) => {
    if (status === 'REJECTED' && !feedback.trim()) {
      setSubmitMessage({
        type: 'error',
        message: 'Please provide feedback for the rejection'
      });
      return;
    }

    setSubmitting(true);
    setSubmitMessage({ type: '', message: '' });

    try {
      const response = await fetch(`http://localhost:5000/api/v1/deliverables/${deliverableId}/review`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          status,
          feedback: feedback.trim()
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit review');
      }

      setDeliverable(result.data);
      setSubmitMessage({
        type: 'success',
        message: `Deliverable has been ${status === 'APPROVED' ? 'approved' : 'rejected'} successfully`
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage({
        type: 'error',
        message: error.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewImage = (url) => {
    window.open(url, '_blank');
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-6 rounded-lg shadow-md max-w-lg w-full">
          <div className="flex items-center">
            <AlertCircle className="text-red-500 mr-2" />
            <h2 className="text-lg font-semibold text-red-700">Error Loading Deliverable</h2>
          </div>
          <p className="mt-2 text-red-600">{error}</p>
          <div className="mt-4 flex space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
            <button 
              onClick={handleGoBack}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!deliverable) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-blue-50 p-6 rounded-lg shadow-md max-w-lg w-full">
          <div className="flex items-center">
            <Info className="text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-blue-700">Deliverable Not Found</h2>
          </div>
          <p className="mt-2 text-blue-600">The requested deliverable could not be found.</p>
          <button 
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const isReviewed = deliverable.status === 'APPROVED' || deliverable.status === 'REJECTED';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={handleGoBack}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back to Deliverables
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{deliverable.title}</h1>
            <span className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(deliverable.status)}`}>
              {deliverable.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <FileText className="w-5 h-5 mt-1 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p>{deliverable.description}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <User className="w-5 h-5 mt-1 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Designer ID</p>
                  <p>{deliverable.desainer}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 mt-1 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Submitted</p>
                  <p>{formatDate(deliverable.submittedAt)}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Info className="w-5 h-5 mt-1 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <p>{deliverable.orderId}</p>
                </div>
              </div>
              
              {deliverable.reviewedAt && (
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mt-1 mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Reviewed</p>
                    <p>{formatDate(deliverable.reviewedAt)}</p>
                  </div>
                </div>
              )}
              
              {deliverable.feedback && (
                <div className="flex items-start">
                  <MessageSquare className="w-5 h-5 mt-1 mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Feedback</p>
                    <p>{deliverable.feedback}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {deliverable.fileUrl && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Deliverable Preview</h2>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={deliverable.fileUrl} 
                  alt={deliverable.title}
                  className="object-contain w-full h-auto max-h-96 mx-auto"
                />
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => handleViewImage(deliverable.fileUrl)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View Full Image
                </button>
              </div>
            </div>
          )}
          
          {!isReviewed && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Review Deliverable</h2>
              
              <div className="mb-4">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback (required for rejection)
                </label>
                <textarea
                  id="feedback"
                  rows="4"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                  placeholder="Provide feedback to the designer..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
              
              {submitMessage.message && (
                <div className={`mb-4 p-3 rounded ${submitMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {submitMessage.message}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button 
                  onClick={() => handleReview('REJECTED')}
                  disabled={submitting}
                  className="flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                  ) : (
                    <X className="w-4 h-4 mr-2" />
                  )}
                  Request Revision
                </button>
                <button 
                  onClick={() => handleReview('APPROVED')}
                  disabled={submitting}
                  className="flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  Approve
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliverableDetailPage;