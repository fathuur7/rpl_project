'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const PaymentPage = () => {
  const params = useParams();
  const orderId = params.id;
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const [snapToken, setSnapToken] = useState(null);
  const [clientKey, setClientKey] = useState(null);

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
  }, [orderId]);
  
  // Function to get Midtrans token
  const initiateMidtransToken = async (orderData) => {
    try {
      const response = await fetch('http://localhost:5000/api/payment/generate-token', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData._id,
          amount: orderData.price,
          itemDetails: [{
            id: orderData.service._id,
            price: orderData.price,
            quantity: 1,
            name: orderData.service.title
          }],
          customerDetails: {
            firstName: orderData.client.name?.split(' ')[0] || 'Customer',
            lastName: orderData.client.name?.split(' ').slice(1).join(' ') || '',
            email: orderData.client.email
          }
        })
      });

      if (!response.ok) throw new Error('Failed to generate payment token');
      
      const tokenData = await response.json();
      setSnapToken(tokenData.token);
      setClientKey(tokenData.client_key);
      
      // Load Midtrans Snap JS when token is received
      loadMidtransScript(tokenData.client_key);
    } catch (err) {
      setError('Payment initialization failed: ' + err.message);
    }
  };
  
  // Load Midtrans Snap JS
  const loadMidtransScript = (clientKey) => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    
    // Check if script is already loaded
    if (!document.querySelector(`script[src="${midtransScriptUrl}"]`)) {
      const script = document.createElement('script');
      script.src = midtransScriptUrl;
      script.setAttribute('data-client-key', clientKey);
      script.async = true;
      
      script.onload = () => {
        console.log('Midtrans Snap script loaded successfully');
      };
      
      script.onerror = () => {
        setError('Failed to load Midtrans payment script');
      };
      
      document.body.appendChild(script);
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const processPayment = async () => {
    if (snapToken) {
      // Use Midtrans Snap for payment
      setProcessing(true);
      
      try {
        // Check if snap is available
        if (window.snap) {
          window.snap.pay(snapToken, {
            onSuccess: function(result) {
              handlePaymentCallback(result);
            },
            onPending: function(result) {
              handlePaymentCallback(result);
            },
            onError: function(result) {
              console.error('Payment error:', result);
              setError('Payment failed. Please try again.');
              setProcessing(false);
            },
            onClose: function() {
              console.log('Customer closed the payment window');
              setProcessing(false);
            }
          });
        } else {
          throw new Error('Midtrans Snap is not loaded properly');
        }
      } catch (err) {
        console.error('Snap pay error:', err);
        setError('Payment processing failed: ' + err.message);
        setProcessing(false);
      }
    } else {
      // Fallback to direct API call if Midtrans is not available
      if (!paymentMethod) {
        setError('Please select a payment method');
        return;
      }

      setProcessing(true);
      try {
        const response = await fetch('http://localhost:5000/api/payment/create', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order._id,
            amount: order.price,
            paymentMethod,
            midtransResponse: {
              transaction_status: 'settlement',
              transaction_id: `TRX-${Date.now()}`,
              order_id: `ORDER-${order._id}-${Date.now()}`,
              payment_type: paymentMethod,
              gross_amount: order.price
            }
          })
        });

        if (!response.ok) throw new Error('Payment processing failed. Please try again.');

        const paymentData = await response.json();
        alert('Payment successful!');
        router.push(`/orders/${orderId}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setProcessing(false);
      }
    }
  };
  
  // Handle callback from Midtrans
  const handlePaymentCallback = async (result) => {
    try {
      console.log('Payment result:', result);
      
      // Send payment result to backend
      const response = await fetch('http://localhost:5000/api/payment/create', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order._id,
          amount: order.price,
          paymentMethod: result.payment_type,
          midtransResponse: result
        })
      });

      if (!response.ok) throw new Error('Failed to record payment');
      
      const paymentData = await response.json();
      
      if (result.transaction_status === 'settlement' || 
          (result.transaction_status === 'capture' && result.fraud_status === 'accept')) {
        alert('Payment successful!');
      } else if (result.transaction_status === 'pending') {
        alert('Payment is pending. Please complete the payment process.');
      } else {
        alert('Payment status: ' + result.transaction_status);
      }
      
      router.push(`/orders/${orderId}`);
    } catch (err) {
      console.error('Payment callback error:', err);
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="container mt-5"><h3>Loading order details...</h3></div>;
  if (!order) return <div className="container mt-5"><h3>Order not found</h3></div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4>Complete Your Payment</h4>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h5>Order Details</h5>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Service:</strong> {order.service.title}</p>
                <p><strong>Designer:</strong> {order.designer.name}</p>
                <p><strong>Amount:</strong> ${order.price.toFixed(2)}</p>
              </div>

              {order.isPaid ? (
                <div className="alert alert-success">
                  <h5>Payment Completed</h5>
                  <p>This order has already been paid for. Thank you!</p>
                </div>
              ) : (
                <>
                  {error && <div className="alert alert-danger">{error}</div>}
                  
                  {!snapToken ? (
                    // Show payment method selection if Midtrans token not available
                    <div className="mb-4">
                      <h5>Select Payment Method</h5>
                      {['credit_card', 'gopay', 'bank_transfer', 'shopeepay'].map((method) => (
                        <div className="form-check" key={method}>
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="paymentMethod" 
                            value={method}
                            onChange={handlePaymentMethodChange}
                          />
                          <label className="form-check-label">
                            {method.replace('_', ' ').toUpperCase()}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="alert alert-info">
                      <p>You&apos;ll be redirected to Midtrans secure payment page.</p>
                    </div>
                  )}

                  <button 
                    className="btn btn-success btn-lg btn-block"
                    onClick={processPayment}
                    disabled={(!snapToken && !paymentMethod) || processing}
                  >
                    {processing ? 'Processing...' : 'Pay Now'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;