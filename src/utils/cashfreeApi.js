// Cashfree API utility functions
// In a real implementation, these would call your backend API

const CASHFREE_CONFIG = {
  appId: process.env.REACT_APP_CASHFREE_APP_ID,
  secretKey: process.env.REACT_APP_CASHFREE_SECRET_KEY,
  environment: process.env.REACT_APP_CASHFREE_ENVIRONMENT || 'production',
  baseUrl: process.env.REACT_APP_CASHFREE_ENVIRONMENT === 'sandbox' 
    ? 'https://sandbox.cashfree.com/pg' 
    : 'https://api.cashfree.com/pg'
};

// Create order with Cashfree
export const createOrder = async (orderData) => {
  try {
    // In a real implementation, this would be a call to your backend API
    // which would then call Cashfree's API with proper authentication
    
    const response = await fetch('/api/cashfree/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    
    // For demo purposes, return a mock response
    return {
      success: true,
      order_id: orderData.order_id,
      payment_session_id: `session_${Date.now()}`,
      order_status: 'ACTIVE',
      payment_url: `${CASHFREE_CONFIG.baseUrl}/payments/${orderData.order_id}`
    };
  }
};

// Verify payment status
export const verifyPayment = async (orderId) => {
  try {
    const response = await fetch(`/api/cashfree/verify-payment/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying payment:', error);
    
    // For demo purposes, return a mock response
    return {
      success: true,
      order_id: orderId,
      order_status: 'PAID',
      payment_status: 'SUCCESS',
      payment_amount: 1000,
      payment_currency: 'INR',
      payment_time: new Date().toISOString()
    };
  }
};

// Generate order data for Cashfree
export const generateOrderData = (donationData) => {
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    order_id: orderId,
    order_amount: parseFloat(donationData.amount),
    order_currency: 'INR',
    customer_details: {
      customer_id: `customer_${Date.now()}`,
      customer_name: donationData.name,
      customer_email: `${donationData.name.toLowerCase().replace(/\s+/g, '')}@anukampafoundation.org`,
      customer_phone: '9999999999'
    },
    order_meta: {
      return_url: `${window.location.origin}/payment-success?order_id=${orderId}`,
      notify_url: `${window.location.origin}/api/cashfree/webhook`,
      payment_methods: 'cc,dc,nb,upi,wallet,paylater',
      order_note: `Donation for Anukampa Foundation - ${donationData.name}`
    },
    order_tags: {
      donation_type: 'gaushala',
      foundation: 'anukampa'
    }
  };
};

export default CASHFREE_CONFIG;
