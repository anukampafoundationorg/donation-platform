const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, phone, pnr, seat, coach } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !phone || !pnr || !seat || !coach) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' }),
      };
    }

    // Create email transporter (using Gmail SMTP)
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // anukampafoundationorg@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
      },
    });

    // Email content
    const emailSubject = `🚂 Railway Food Order - PNR: ${pnr}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #38a169; text-align: center;">🚂 नया रेलवे भोजन ऑर्डर</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2d3748; margin-top: 0;">यात्री की जानकारी:</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">नाम:</td>
              <td style="padding: 10px 0; color: #2d3748;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">फोन नंबर:</td>
              <td style="padding: 10px 0; color: #2d3748;">${phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">PNR नंबर:</td>
              <td style="padding: 10px 0; color: #2d3748; font-family: monospace; font-size: 16px;">${pnr}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">सीट नंबर:</td>
              <td style="padding: 10px 0; color: #2d3748;">${seat}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">कोच नंबर:</td>
              <td style="padding: 10px 0; color: #2d3748;">${coach}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #2f855a; font-weight: bold;">📞 कृपया इस यात्री से ${phone} पर संपर्क करें और भोजन की व्यवस्था करें।</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            यह ऑर्डर अनुकम्पा फाउंडेशन की वेबसाइट से आया है<br>
            <strong>समय:</strong> ${new Date().toLocaleString('hi-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>
      </div>
    `;

    // Send email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'anukampafoundationorg@gmail.com',
      subject: emailSubject,
      html: emailHtml,
      replyTo: phone.includes('@') ? phone : `${phone}@example.com`,
    };

    await transporter.sendMail(mailOptions);

    // Also send WhatsApp message (optional - using WhatsApp Business API)
    const whatsappMessage = `🚂 *नया रेलवे भोजन ऑर्डर*

*यात्री की जानकारी:*
नाम: ${name}
फोन: ${phone}
PNR: ${pnr}
सीट: ${seat}
कोच: ${coach}

कृपया इस यात्री को भोजन की व्यवस्था करें।

समय: ${new Date().toLocaleString('hi-IN', { timeZone: 'Asia/Kolkata' })}`;

    // You can integrate WhatsApp Business API here if needed
    // For now, we'll just log it
    console.log('WhatsApp Message:', whatsappMessage);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Order submitted successfully',
        orderId: `RFO-${Date.now()}`
      }),
    };

  } catch (error) {
    console.error('Error processing railway order:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to submit order',
        details: error.message 
      }),
    };
  }
};
