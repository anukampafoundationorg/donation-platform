// Netlify function to handle Cashfree webhooks
// This file should be placed in netlify/functions/webhook.js

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const webhookData = JSON.parse(event.body);
    
    console.log('Received Cashfree webhook:', webhookData);
    
    // Verify webhook signature (optional but recommended)
    // const signature = event.headers['x-webhook-signature'];
    // if (!verifyWebhookSignature(webhookData, signature)) {
    //   return { statusCode: 401, body: 'Unauthorized' };
    // }
    
    // Handle different webhook events
    switch (webhookData.type) {
      case 'PAYMENT_SUCCESS_WEBHOOK':
        console.log('Payment successful:', webhookData.data);
        // Here you can:
        // - Update your database
        // - Send confirmation email
        // - Update order status
        // - Send notification to admin
        break;
        
      case 'PAYMENT_FAILED_WEBHOOK':
        console.log('Payment failed:', webhookData.data);
        // Handle failed payment
        break;
        
      case 'PAYMENT_USER_DROPPED_WEBHOOK':
        console.log('Payment user dropped:', webhookData.data);
        // Handle user dropped payment
        break;
        
      default:
        console.log('Unknown webhook type:', webhookData.type);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Webhook processed successfully' 
      })
    };

  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};

// Function to verify webhook signature (implement if needed)
function verifyWebhookSignature(payload, signature) {
  // Implement signature verification logic here
  // This is optional but recommended for security
  return true; // For now, always return true
}
