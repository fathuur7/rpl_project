'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const PaymentPage = () => {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Failed to load order details');
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const processPayment = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch('http://localhost:5000/api/payments/create', {
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
            order_id: order._id,
            payment_type: paymentMethod
          }
        })
      });

      if (!response.ok) throw new Error('Payment processing failed. Please try again.');

      alert('Payment successful!');
      router.push(`/orders/${orderId}`);
    } catch (err) {
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

                  <button 
                    className="btn btn-success btn-lg btn-block"
                    onClick={processPayment}
                    disabled={!paymentMethod || processing}
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
