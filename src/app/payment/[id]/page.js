'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner'; // Assuming you're using react-hot-toast for notifications

const PaymentPage = () => {
  const params = useParams();
  const orderId = params.id;
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [snapToken, setSnapToken] = useState(null);
  const [clientKey, setClientKey] = useState(null);
  const [isSnapOpen, setIsSnapOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    // Fetch order details
    fetch(`http://localhost:5000/api/orders/${orderId}`, {
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
        
        // Check if order is not paid yet
        if (!data.isPaid) {
          // Request Midtrans token
          initiateMidtransToken(data);
        }
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [orderId, router]);
  
  // Function to get Midtrans token
  const initiateMidtransToken = async (orderData) => {
    try {
      setProcessing(true);
      
      const response = await fetch('http://localhost:5000/api/payments/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          orderId: orderData._id,
          amount: orderData.price,
          // Optional additional details if needed
          itemDetails: [{
            id: orderData.service?._id || 'service-item',
            price: orderData.price,
            quantity: 1,
            name: orderData.service?.title || 'Design Service'
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate payment token');
      }

      const data = await response.json();
      setSnapToken(data.token);
      setClientKey(data.client_key);
      
      // Load Midtrans Snap JS when we have the token
      loadMidtransScript(data.client_key);
    } catch (err) {
      console.error('Error generating payment token:', err);
      setError(err.message);
      toast.error('Failed to initialize payment system');
    } finally {
      setProcessing(false);
    }
  };

  // Function to load Midtrans Snap JS
  const loadMidtransScript = (clientKey) => {
    // Check if script is already loaded
    if (document.getElementById('midtrans-script')) {
      setScriptLoaded(true);
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.id = 'midtrans-script';
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', clientKey);
    
    script.onload = () => {
      console.log('Midtrans script loaded successfully');
      setScriptLoaded(true);
    };
    
    document.body.appendChild(script);
  };

  // Function to open Midtrans Snap
  const openMidtransSnap = () => {
    if (!window.snap || !snapToken || isSnapOpen) {
      console.log('Cannot open Snap:', {
        snapExists: !!window.snap,
        tokenExists: !!snapToken,
        isAlreadyOpen: isSnapOpen
      });
      return;
    }
    
    setIsSnapOpen(true);
    
    window.snap.pay(snapToken, {
      onSuccess: function(result) {
        setIsSnapOpen(false);
        handlePaymentSuccess(result);
      },
      onPending: function(result) {
        setIsSnapOpen(false);
        handlePaymentPending(result);
      },
      onError: function(result) {
        setIsSnapOpen(false);
        handlePaymentError(result);
      },
      onClose: function() {
        setIsSnapOpen(false);
        toast.info('Payment window closed');
      }
    });
  };

  // Handle successful payment
  const handlePaymentSuccess = async (result) => {
    try {
      // Create payment record in our system
      await fetch('http://localhost:5000/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          orderId: orderId,
          amount: order.price,
          paymentMethod: result.payment_type,
          midtransResponse: result
        })
      });

      toast.success('Payment successful!');
      
      // Refresh order data or redirect to order details
      setTimeout(() => {
        router.push(`/orders/${orderId}`);
      }, 1500);
    } catch (err) {
      console.error('Error recording payment:', err);
      toast.error('Payment was processed but failed to update our records');
    }
  };

  // Handle pending payment
  const handlePaymentPending = (result) => {
    toast.info('Payment is pending. Please complete the payment process.');
    console.log('Payment pending:', result);
  };

  // Handle payment error
  const handlePaymentError = (result) => {
    toast.error('Payment failed. Please try again.');
    console.error('Payment error:', result);
  };

  // Manually trigger payment
  const handlePaymentButtonClick = () => {
    if (scriptLoaded && snapToken && !isSnapOpen) {
      openMidtransSnap();
    } else if (!scriptLoaded) {
      toast.error('Payment system is still loading. Please wait.');
    } else if (isSnapOpen) {
      toast.info('Payment window is already open');
    } else {
      toast.error('Payment system is not ready yet');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-semibold text-red-700 mb-3">Error</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => router.push('/notif')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to notif
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-semibold text-yellow-700 mb-3">Order Not Found</h2>
          <p className="text-yellow-600">The requested order could not be found.</p>
          <button 
            onClick={() => router.push('/notif')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to notif
          </button>
        </div>
      </div>
    );
  }

  // If order is already paid
  if (order.isPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-semibold text-green-700 mb-3">Payment Completed</h2>
          <p className="text-green-600">This order has already been paid.</p>
          <button 
            onClick={() => router.push(`/orders/${orderId}`)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Order Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment for Order #{order._id}</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-600">Service:</p>
            <p className="font-medium">{order.service?.title || 'Design Service'}</p>
          </div>
          <div>
            <p className="text-gray-600">Price:</p>
            <p className="font-medium text-xl">${order.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
        <p className="mb-4">
          Click the button below to proceed with your payment using our secure payment gateway.
        </p>
        
        <button
          onClick={handlePaymentButtonClick}
          disabled={processing || !snapToken || !scriptLoaded || isSnapOpen}
          className={`w-full py-3 rounded-lg text-white font-medium ${
            processing || !snapToken || !scriptLoaded || isSnapOpen
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {processing ? 'Preparing Payment...' : isSnapOpen ? 'Payment Window Open' : 'Pay Now'}
        </button>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>
            Your payment is processed securely through Midtrans. We do not store your payment details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;