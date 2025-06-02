'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CreditCard, Shield, CheckCircle, AlertCircle, Clock, ArrowLeft } from 'lucide-react';

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
    fetch(`http://localhost:5000/api/v1/orders/${orderId}`, {
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
      
      const response = await fetch('http://localhost:5000/api/v1/payments/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          orderId: orderData._id,
          amount: orderData.price,
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
      await fetch('http://localhost:5000/api/v1/payments/create', {
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
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-destructive mb-3">Error</h2>
          <p className="text-destructive/80 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/notif')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Notifications
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-warning mb-3">Order Not Found</h2>
          <p className="text-warning/80 mb-4">The requested order could not be found.</p>
          <button 
            onClick={() => router.push('/notif')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Notifications
          </button>
        </div>
      </div>
    );
  }

  // If order is already paid
  if (order.isPaid) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-success/10 rounded-lg p-6 text-center">
          <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-success mb-3">Payment Completed</h2>
          <p className="text-success/80 mb-4">This order has already been paid successfully.</p>
          <button 
            onClick={() => router.push(`/orders/${orderId}`)}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            View Order Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Complete Your Payment</h1>
        <p className="text-muted-foreground">
          Order ID: <span className="font-mono text-sm">{order._id}</span>
        </p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Order Summary</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Service</p>
              <p className="font-medium">{order.service?.title || 'Design Service'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold text-primary">${order.price.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Amount</span>
              <span className="text-2xl font-bold">${order.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Card */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Secure Payment</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Click the button below to proceed with your payment using our secure payment gateway powered by Midtrans.
          </p>
          
          {/* Payment Status Indicator */}
          <div className="flex items-center gap-2 text-sm">
            {processing ? (
              <>
                <Clock className="h-4 w-4 animate-spin text-warning" />
                <span className="text-warning">Preparing payment system...</span>
              </>
            ) : scriptLoaded && snapToken ? (
              <>
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-success">Payment system ready</span>
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Initializing payment...</span>
              </>
            )}
          </div>
          
          <button
            onClick={handlePaymentButtonClick}
            disabled={processing || !snapToken || !scriptLoaded || isSnapOpen}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              processing || !snapToken || !scriptLoaded || isSnapOpen
                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg transform hover:scale-[1.02]'
            }`}
          >
            {processing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                Preparing Payment...
              </div>
            ) : isSnapOpen ? (
              'Payment Window Open'
            ) : (
              <div className="flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pay ${order.price.toFixed(2)} Now
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-muted/50 border rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="mb-1 font-medium">Your payment is secure</p>
            <p>
              All transactions are encrypted and processed securely through Midtrans. 
              We never store your payment card details on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;