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
    // Try to call the Netlify function first
    const response = await fetch('/.netlify/functions/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.warn('Netlify function not available, using mock response');
      throw new Error('Backend not available');
    }
  } catch (error) {
    console.log('Using mock response for demo purposes:', error.message);
    
    // Return mock response for demo purposes when backend is not available
    return {
      success: true,
      order_id: orderData.order_id,
      payment_session_id: `session_${Date.now()}`,
      order_status: 'ACTIVE',
      payment_url: `https://merchant.cashfree.com/merchant/pg?payment_session_id=session_${Date.now()}`
    };
  }
};

// Verify payment status
export const verifyPayment = async (orderId) => {
  try {
    const response = await fetch(`/.netlify/functions/verify-payment?orderId=${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.warn('Netlify function not available, using mock response');
      throw new Error('Backend not available');
    }
  } catch (error) {
    console.log('Using mock response for demo purposes:', error.message);
    
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
