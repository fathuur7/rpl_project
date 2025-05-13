"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Bell, Calendar, DollarSign, Clock, ChevronRight, AlertTriangle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const NotificationPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, userLoading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (userLoading) return;
    
    if (!user) {
      router.push('/login');
      return;
    }

    
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/v1/orders', {
          credentials: 'include' // This ensures cookies are sent with the request for Passport authentication
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        
        const data = await response.json();
        setOrders(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load notifications. Please try again later.');
        toast.error('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user, userLoading, router]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // For Passport authentication
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to update order status');
      }
      
      // Update local state with new status
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      
      toast.success(`Order status updated to ${newStatus.replace('_', ' ')}`);
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error(err.message || 'Failed to update order status');
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'revision':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  const getTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'Unknown time';
    }
  };
  
  const getActionButtons = (order) => {
    const isClient = user && order.client && order.client._id === user._id;
    const isDesigner = user && order.designer && order.designer._id === user._id;
    
    if (isClient) {
      switch (order.status) {
        case 'in_progress':
          return (
            <>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => updateOrderStatus(order._id, 'revision')}
              >
                Request Revision
              </Button>
              <Button 
                size="sm" 
                onClick={() => updateOrderStatus(order._id, 'completed')}
              >
                Approve
              </Button>
            </>
          );
        case 'completed':
          return (
            <Button size="sm" variant="outline" disabled>
              Order Completed
            </Button>
          );
        default:
          return null;
      }
    }
    
    if (isDesigner) {
      switch (order.status) {
        case 'pending':
          return (
            <Button 
              size="sm" 
              onClick={() => updateOrderStatus(order._id, 'in_progress')}
            >
              Start Work
            </Button>
          );
        case 'revision':
          return (
            <Button 
              size="sm" 
              onClick={() => updateOrderStatus(order._id, 'in_progress')}
            >
              Submit Revision
            </Button>
          );
        default:
          return null;
      }
    }
    
    return null;
  };

  const renderOrderItem = (order) => {
    return (
      <Card 
        key={order._id} 
        className="mb-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => router.push(`/payment/${order._id}`)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getStatusBadgeStyle(order.status)}>
                  {order.status.replace('_', ' ')}
                </Badge>
              

                <span className="text-sm text-gray-500">
                  {getTimeAgo(order.createdAt)}
                </span>
              </div>
              
              <h3 className="font-medium text-lg mb-1">
                {order.service?.title || 'Untitled Order'}
              </h3>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(order.createdAt)}
                </div>
                
                {order.service?.budget && (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${order.service.budget}
                  </div>
                )}
                
                {order.revisionCount > 0 && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {order.revisionCount} revision{order.revisionCount !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
              
              <div className="text-sm mb-4">
                <span className="font-medium">
                  {user && order.client && order.client._id === user._id 
                    ? `Designer: ${order.designer?.name || 'Unnamed'}`
                    : `Client: ${order.client?.name || 'Unnamed'}`
                  }
                </span>
              </div>
            </div>
            
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          {/* Action buttons - prevent click propagation to avoid navigating when clicking buttons */}
          <div className="flex justify-end gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
            {getActionButtons(order)}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (userLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full mb-4 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card className="p-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Access Restricted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You must be logged in to view notifications</p>
            <Button 
              onClick={() => router.push("/login")}
              className="px-6"
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Notifications & Orders</h1>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="revision">Revision</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger onClick={() => router.push('/notif/review')} value="review">
            Review
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {loading ? (
            [1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full mb-4 rounded-lg" />
            ))
          ) : orders.length > 0 ? (
            orders.map(order => renderOrderItem(order))
          ) : (
            <Card className="p-8 text-center text-gray-500">
              <p>No orders found</p>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="pending">
          {loading ? (
            <Skeleton className="h-32 w-full mb-4 rounded-lg" />
          ) : orders.filter(o => o.status === 'pending').length > 0 ? (
            orders.filter(o => o.status === 'pending').map(order => renderOrderItem(order))
          ) : (
            <Card className="p-8 text-center text-gray-500">
              <p>No pending orders</p>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="in_progress">
          {loading ? (
            <Skeleton className="h-32 w-full mb-4 rounded-lg" />
          ) : orders.filter(o => o.status === 'in_progress').length > 0 ? (
            orders
              .filter(o => o.status === 'in_progress')
              .map(order => renderOrderItem(order))
          ) : (
            <Card className="p-8 text-center text-gray-500">
              <p>No orders in progress</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="revision">
          {loading ? (
            <Skeleton className="h-32 w-full mb-4 rounded-lg" />
          ) : orders.filter(o => o.status === 'revision').length > 0 ? (
            orders
              .filter(o => o.status === 'revision')
              .map(order => renderOrderItem(order))
          ) : (
            <Card className="p-8 text-center text-gray-500">
              <p>No orders in progress</p>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {loading ? (
            <Skeleton className="h-32 w-full mb-4 rounded-lg" />
          ) : orders.filter(o => o.status === 'completed').length > 0 ? (
            orders.filter(o => o.status === 'completed').map(order => renderOrderItem(order))
          ) : (
            <Card className="p-8 text-center text-gray-500">
              <p>No completed orders</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationPage;