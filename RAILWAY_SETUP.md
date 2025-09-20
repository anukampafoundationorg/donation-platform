# Railway Food Order System Setup

## Environment Variables Required

To make the railway food order system work, you need to set these environment variables in your Netlify dashboard:

### 1. Gmail Configuration

```
GMAIL_USER=anukampafoundationorg@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password_here
```

### 2. How to Get Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "App passwords"
4. Select "Mail" and "Other (custom name)"
5. Enter "Anukampa Railway Orders" as the name
6. Copy the generated 16-character password
7. Use this password as `GMAIL_APP_PASSWORD`

### 3. Setting Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site
3. Go to "Site settings" > "Environment variables"
4. Add the following variables:
   - `GMAIL_USER`: anukampafoundationorg@gmail.com
   - `GMAIL_APP_PASSWORD`: [your generated app password]

### 4. How It Works

When users submit the railway food order form:

1. ✅ Form data is sent to `/.netlify/functions/railway-order`
2. ✅ Backend validates the data
3. ✅ Email is sent directly to `anukampafoundationorg@gmail.com`
4. ✅ User gets confirmation with Order ID
5. ✅ No email client opens on user's device

### 5. Email Format

The email will contain:
- 🚂 Subject: "Railway Food Order - PNR: [PNR_NUMBER]"
- 📧 Formatted HTML email with all passenger details
- 📞 Contact information highlighted
- ⏰ Timestamp in Indian time zone

### 6. Optional: WhatsApp Integration

If you want to also send orders to WhatsApp, you can add:
```
WHATSAPP_API_TOKEN=your_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_id
```

This requires WhatsApp Business API setup (additional cost).

## Testing

After setting up the environment variables:

1. Deploy your site to Netlify
2. Test the railway food order form
3. Check if emails arrive at anukampafoundationorg@gmail.com
4. Verify the email format and content

## Troubleshooting

- If emails don't arrive, check Netlify function logs
- Ensure Gmail App Password is correct (16 characters, no spaces)
- Check spam folder in Gmail
- Verify environment variables are set correctly in Netlify
