import React from 'react'

const OrdersTable = ({ orders, title, badgeText, badgeColor, isAvailable, router }) => {
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  // Function to get status badge color
  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'revision': return 'bg-orange-100 text-orange-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'awaiting_payment': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Calculate time remaining for deadline
  const getTimeRemaining = (deadline) => {
    if (!deadline) return "No deadline set";
    
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    
    if (diffTime < 0) return "Expired";
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ${diffHours} hr${diffHours !== 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    } else {
      const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${badgeColor}`}>
            {badgeText}
          </span>
        </div>
        <div className="p-6 text-center">
          <p className="text-gray-500">
            {isAvailable 
              ? `You don't have any ${title.toLowerCase()} at the moment.` 
              : `You don't have any ${title.toLowerCase()}.`}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${badgeColor}`}>
          {badgeText}
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {isAvailable ? "Time Remaining" : "Deadline"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order._id.substring(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.service?.title || 'Unknown Service'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.client?.name || 'Unknown Client'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {isAvailable ? (
                    <span className="text-green-600 font-medium">
                      {getTimeRemaining(order.service?.deadline)}
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Expired: {formatDate(order.service?.deadline)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getOrderStatusColor(order.status)}`}>
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1).replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => router.push(`/admin/orders/${order._id}`)}
                    className={`${isAvailable ? 'text-blue-600 hover:text-blue-900' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable