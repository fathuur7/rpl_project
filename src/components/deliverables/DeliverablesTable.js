import React from 'react'

const DeliverablesTable = ({ deliverables, title, showViewAll, router }) => {
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  // Function to get deliverable status badge color
  const getDeliverableStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      
      {deliverables.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">You haven't submitted any deliverables yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
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
              {deliverables.map(deliverable => (
                <tr key={deliverable._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {deliverable.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {deliverable.orderId?.service?.title || 
                     `Order ${deliverable.orderId?._id?.substring(0, 8) || ''}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(deliverable.submittedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDeliverableStatusColor(deliverable.status)}`}>
                      {deliverable.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium gap-4 flex">
                    <button
                      onClick={() => router.push(`/admin/orders/${deliverable.orderId?._id}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Order
                    </button>

                    <button className='text-red-600 hover:text-red-900'
                      onClick={() => router.push(`/admin/update/${deliverable._id}`)}
                    >
                      Edit  Revision
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {showViewAll && (
            <div className="px-6 py-3 bg-gray-50 text-right">
              <button 
                onClick={() => router.push('/deliverables')}
                className="text-sm font-medium text-blue-600 hover:text-blue-900"
              >
                View All Deliverables
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DeliverablesTable