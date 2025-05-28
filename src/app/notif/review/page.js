'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, FileText, User, Info, AlertCircle, Download, Eye, Folder, FolderOpen, ChevronDown, ChevronRight, Package } from 'lucide-react';

const ReviewPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [error, setError] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [viewMode, setViewMode] = useState('folder'); // 'folder' or 'grid'
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/deliverables/client', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch deliverables');
        }
        
        const result = await response.json();
        setData(result);
        console.log(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group deliverables by order/service
  const groupDeliverablesByOrder = (deliverables) => {
    const groups = {};
    
    deliverables.forEach(deliverable => {
      const orderId = deliverable.orderId?._id || deliverable.orderId || 'unknown';
      const orderTitle = deliverable.orderId?.title || deliverable.orderId?.serviceName || `Order ${orderId}`;
      const orderStatus = deliverable.orderId?.status || 'unknown';
      const revisionCount = deliverable.orderId?.revisionCount || 0;
      
      if (!groups[orderId]) {
        groups[orderId] = {
          id: orderId,
          title: orderTitle,
          status: orderStatus,
          revisionCount: revisionCount,
          deliverables: []
        };
      }
      
      groups[orderId].deliverables.push(deliverable);
    });
    
    return Object.values(groups);
  };

  const toggleFolder = (folderId) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

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
    switch (status.toUpperCase()) {
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

  const getOrderStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'revision':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewImage = (url) => {
    window.open(url, '_blank');
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
        <div className="bg-red-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <AlertCircle className="text-red-500 mr-2" />
            <h2 className="text-lg font-semibold text-red-700">Error Loading Deliverables</h2>
          </div>
          <p className="mt-2 text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data || !data.success || data.count === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Info className="text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-blue-700">No Deliverables Found</h2>
          </div>
          <p className="mt-2 text-blue-600">You don't have any deliverables at the moment.</p>
          <button 
            onClick={() => router.push('/home')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to home
          </button>
        </div>
      </div>
    );
  }

  const groupedDeliverables = groupDeliverablesByOrder(data.data);

  const renderDeliverableCard = (deliverable) => {
    const revisionCount = deliverable.orderId?.revisionCount || 0;
    const isRevisionLimitReached = revisionCount > 3;
    
    return (
      <div key={deliverable._id} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold truncate">{deliverable.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(deliverable.status)}`}>
              {deliverable.status}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <User className="w-4 h-4 mt-1 mr-2 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Designer</p>
                <p className="text-sm font-medium">{deliverable.desainer?.name || 'Unknown'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FileText className="w-4 h-4 mt-1 mr-2 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-sm">{deliverable.description}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-4 h-4 mt-1 mr-2 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Submitted</p>
                <p className="text-sm">{formatDate(deliverable.submittedAt)}</p>
              </div>
            </div>
          </div>
          
          {deliverable.fileUrl && (
            <div className="mt-4">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded overflow-hidden relative group">
                <img 
                  src={deliverable.fileUrl} 
                  alt={deliverable.title}
                  className="object-cover w-full h-48"
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewImage(deliverable.fileUrl)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-l hover:bg-blue-700 flex items-center"
                      title="View Full Image"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      <span>View</span>
                    </button>
                    
                    <button
                      onClick={() => router.push(`/donwload/${deliverable._id}`)}
                      disabled={downloadingId === deliverable._id}
                      className="px-3 py-2 bg-green-600 text-white rounded-r hover:bg-green-700 flex items-center"
                      title="Download Image"
                    >
                      {downloadingId === deliverable._id ? (
                        <div className="animate-spin h-4 w-4 border-2 border-white rounded-full mr-1 border-t-transparent"></div>
                      ) : (
                        <Download className="w-4 h-4 mr-1" />
                      )}
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">                      
                {isRevisionLimitReached ? (
                  <button 
                    disabled
                    className="w-full px-3 py-1 bg-gray-400 text-white text-sm rounded cursor-not-allowed opacity-60"
                    title="Revision limit reached"
                  >
                    Looking for response
                  </button>
                ) : (
                  <button 
                    className="w-full px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                    onClick={() => router.push(`/notif/review/${deliverable._id}`)}
                  >
                    Looking for response
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Review Deliverables</h1>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('folder')}
            className={`px-3 py-2 rounded flex items-center ${viewMode === 'folder' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <Folder className="w-4 h-4 mr-1" />
            Folder View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded flex items-center ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <Package className="w-4 h-4 mr-1" />
            Grid View
          </button>
        </div>
      </div>

      {viewMode === 'folder' ? (
        /* Folder View */
        <div className="space-y-4">
          {groupedDeliverables.map((group) => {
            const isExpanded = expandedFolders.has(group.id);
            const isRevisionLimitReached = group.revisionCount > 3;
            
            return (
              <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Folder Header */}
                <div 
                  className="p-4 bg-gray-50 border-b cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFolder(group.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                      {isExpanded ? (
                        <FolderOpen className="w-6 h-6 text-blue-500" />
                      ) : (
                        <Folder className="w-6 h-6 text-blue-500" />
                      )}
                      <div>
                        <h2 className="text-lg font-semibold">{group.title}</h2>
                        <p className="text-sm text-gray-500">{group.deliverables.length} deliverable(s)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusBadgeClass(group.status)}`}>
                        {group.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${isRevisionLimitReached ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                        Rev: {group.revisionCount}
                        {isRevisionLimitReached && ' (Max)'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Folder Content */}
                {isExpanded && (
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.deliverables.map(renderDeliverableCard)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Grid View (Original) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map(renderDeliverableCard)}
        </div>
      )}
    </div>
  );
};

export default ReviewPage;