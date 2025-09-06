// Netlify function to create Cashfree orders
// This file should be placed in netlify/functions/create-order.js

const https = require('https');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const orderData = JSON.parse(event.body);
    
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

    // Prepare the request to Cashfree API
    const cashfreeData = {
      order_id: orderData.order_id,
      order_amount: orderData.order_amount,
      order_currency: orderData.order_currency,
      customer_details: orderData.customer_details,
      order_meta: orderData.order_meta,
      order_tags: orderData.order_tags
    };

    const apiUrl = CASHFREE_ENVIRONMENT === 'sandbox' 
      ? 'https://sandbox.cashfree.com/pg/orders'
      : 'https://api.cashfree.com/pg/orders';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY
      }
    };

    // Make request to Cashfree API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: options.headers,
      body: JSON.stringify(cashfreeData)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Cashfree API error:', responseData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'Failed to create order with Cashfree',
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
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        order_id: responseData.order_id,
        payment_session_id: responseData.payment_session_id,
        order_status: responseData.order_status,
        payment_url: responseData.payment_url
      })
    };

  } catch (error) {
    console.error('Error creating order:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};
