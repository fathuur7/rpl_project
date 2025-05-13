import React from 'react'

const SummaryCards = ({ activeOrders, availableOrders, pendingReview, revisionsNeeded }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-700">Active Orders</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">{activeOrders}</p>
        <p className="text-sm text-gray-500">Orders requiring attention</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-700">Workable Orders</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">{availableOrders}</p>
        <p className="text-sm text-gray-500">Orders with valid deadlines</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-700">Pending Review</h3>
        <p className="mt-2 text-3xl font-bold text-yellow-600">{pendingReview}</p>
        <p className="text-sm text-gray-500">Awaiting client approval</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-700">Needs Revision</h3>
        <p className="mt-2 text-3xl font-bold text-red-600">{revisionsNeeded}</p>
        <p className="text-sm text-gray-500">Revisions requested by clients</p>
      </div>
    </div>
  )
}

export default SummaryCards