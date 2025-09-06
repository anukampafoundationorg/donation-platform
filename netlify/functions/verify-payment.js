// Netlify function to verify Cashfree payments
// This file should be placed in netlify/functions/verify-payment.js

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { orderId } = event.queryStringParameters;
    
    if (!orderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Order ID is required' })
      };
    }

    // Cashfree API configuration
    const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
    const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
    const CASHFREE_ENVIRONMENT = process.env.CASHFREE_ENVIRONMENT || 'production';
    
    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Cashfree credentials not configured' })
      };
    }

    const apiUrl = CASHFREE_ENVIRONMENT === 'sandbox' 
      ? `https://sandbox.cashfree.com/pg/orders/${orderId}`
      : `https://api.cashfree.com/pg/orders/${orderId}`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY
      }
    };

    // Make request to Cashfree API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: options.headers
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Cashfree API error:', responseData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'Failed to verify payment with Cashfree',
          details: responseData
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        order_id: responseData.order_id,
        order_status: responseData.order_status,
        payment_status: responseData.payment_status,
        payment_amount: responseData.payment_amount,
        payment_currency: responseData.payment_currency,
        payment_time: responseData.payment_time
      })
    };

  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};
