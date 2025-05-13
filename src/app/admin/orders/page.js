'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Sidebar from '@/components/layouts/sidebar/Sidebar'
import Header from '@/components/layouts/header/Header'
import useCurrentUser from '@/hooks/useCurrentUser'

// Komponen baru yang ditambahkan
import SummaryCards from '@/components/deliverables/SummaryCards'
import OrdersTable from '@/components/deliverables/OrdersTable'
import DeliverablesTable from '@/components/deliverables/DeliverablesTable'

const DesignerDashboard = () => {
  const router = useRouter()
  const { user, userLoading } = useCurrentUser()
  const [activeOrders, setActiveOrders] = useState([])
  const [deliverables, setDeliverables] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchDesignerData = async () => {
      if (!user) return
      
      try {
        setLoading(true)
        
        // Fetch orders assigned to this designer
        const ordersResponse = await fetch('http://localhost:5000/api/v1/orders', {
          credentials: 'include'
        })
        
        if (!ordersResponse.ok) {
          throw new Error('Failed to fetch orders')
        }
        
        const ordersData = await ordersResponse.json()
        setActiveOrders(ordersData.filter(order => 
          ['pending', 'in_progress', 'revision', 'awaiting_payment'].includes(order.status)
        ))
        
        // Fetch deliverables created by this designer
        const deliverablesResponse = await fetch('http://localhost:5000/api/v1/deliverables/designer', {
          credentials: 'include'
        })
        
        if (!deliverablesResponse.ok) {
          throw new Error('Failed to fetch deliverables')
        }
        
        const deliverablesData = await deliverablesResponse.json()
        setDeliverables(deliverablesData.data || [])
        
        setError(null)
      } catch (err) {
        console.error('Error fetching designer data:', err)
        setError('Failed to load your dashboard data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    if (user) {
      fetchDesignerData()
    }
  }, [user])

  // Filter orders based on status and deadline
  const getOrdersByStatus = (status) => {
    return activeOrders.filter(order => order.status === status);
  }

  // Filter orders with valid deadlines
  const getOrdersByDeadlineStatus = (isAvailable) => {
    return activeOrders.filter(order => {
      const hasValidDeadline = isDeadlineAvailable(order.service?.deadline);
      return isAvailable ? hasValidDeadline : !hasValidDeadline;
    });
  }

  // Check if deadline is available
  const isDeadlineAvailable = (deadline) => {
    if (!deadline) return false;
    const now = new Date();
    const serviceDeadline = new Date(deadline);
    return serviceDeadline > now;
  };

  // Get available orders
  const availableOrders = getOrdersByDeadlineStatus(true);
  
  // Get revision orders
  const revisionOrders = getOrdersByStatus('revision');
  
  // Get awaiting payment orders
  const awaitingPaymentOrders = getOrdersByStatus('awaiting_payment');
  
  // Get expired orders
  const expiredOrders = getOrdersByDeadlineStatus(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <Header title="Designer Dashboard" user={user} />
          
          <main className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-700">{error}</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Summary Cards */}
                <SummaryCards 
                  activeOrders={activeOrders.length}
                  availableOrders={availableOrders.length}
                  pendingReview={deliverables.filter(d => d.status === 'PENDING').length}
                  revisionsNeeded={revisionOrders.length}
                />
                
                {/* Available Orders */}
                <OrdersTable 
                  orders={availableOrders}
                  title="Orders You Can Work On"
                  badgeText="Available Deadlines"
                  badgeColor="bg-green-100 text-green-800"
                  isAvailable={true}
                  router={router}
                />
                
                {/* Revision Orders */}
                <OrdersTable 
                  orders={revisionOrders}
                  title="Orders Requiring Revision"
                  badgeText="Needs Attention"
                  badgeColor="bg-orange-100 text-orange-800"
                  isAvailable={true}
                  router={router}
                />
                
                {/* Awaiting Payment Orders */}
                <OrdersTable 
                  orders={awaitingPaymentOrders}
                  title="Orders Awaiting Payment"
                  badgeText="Payment Pending"
                  badgeColor="bg-blue-100 text-blue-800"
                  isAvailable={true}
                  router={router}
                />
                
                {/* Expired Orders */}
                <OrdersTable 
                  orders={expiredOrders}
                  title="Orders With Expired Deadlines"
                  badgeText="Contact Manager"
                  badgeColor="bg-red-100 text-red-800"
                  isAvailable={false}
                  router={router}
                />
                
                {/* Recent Deliverables */}
                <DeliverablesTable 
                  deliverables={deliverables.slice(0, 5)}
                  title="Recent Deliverables"
                  showViewAll={deliverables.length > 5}
                  router={router}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default DesignerDashboard