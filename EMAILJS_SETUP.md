# EmailJS Setup Guide for Speedy Box Movers

This guide will help you set up EmailJS to receive form submissions at alamrandhawa16@gmail.com.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" as your email service
4. Connect your Gmail account (alamrandhawa16@gmail.com)
5. Note down the **Service ID** (something like "service_xxxxxxx")

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Moving Quote Request from {{user_name}}

Hello,

You have received a new moving quote request from your website:

Customer Details:
- Name: {{user_name}}
- Email: {{user_email}}
- Phone: {{user_phone}}

Moving Details:
- From: {{moving_from}}
- To: {{moving_to}}
- Moving Date: {{moving_date}}

Additional Message:
{{message}}

---
This request was submitted through the Speedy Box Movers website contact form.
```

4. Set the "To Email" field to: {{to_email}}
5. Save the template and note down the **Template ID** (something like "template_xxxxxxx")

## Step 4: Get Your Public Key

1. Go to "Account" -> "General"
2. Find your **Public Key** (something like "user_xxxxxxxxxxxxxxx")

## Step 5: Update Your Website Code

1. Open `/script.js` file
2. Replace the following placeholders:

```javascript
// Line 3: Replace YOUR_PUBLIC_KEY
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY_HERE");

// Line 227: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
emailjs.send('YOUR_ACTUAL_SERVICE_ID', 'YOUR_ACTUAL_TEMPLATE_ID', templateParams)
```

## Example Configuration

Your final configuration should look like this:

```javascript
// EmailJS Configuration
(function() {
    emailjs.init("user_abc123def456"); // Your actual public key
})();

// In the form handler:
emailjs.send('service_gmail123', 'template_form456', templateParams)
```

## Step 6: Test the Form

1. Open your website
2. Fill out the contact form
3. Submit it
4. Check alamrandhawa16@gmail.com for the email

## Troubleshooting

- **Form not sending**: Check browser console for errors
- **Emails not received**: Check spam folder
- **Template errors**: Verify template variables match form field names
- **Service errors**: Ensure Gmail service is properly connected

## Free Plan Limits

EmailJS free plan includes:
- 200 emails per month
- 2 email services
- 2 email templates
- EmailJS branding in emails

For higher volume, consider upgrading to a paid plan.

## Security Note

Your EmailJS public key is safe to expose in frontend code. It only allows sending emails through your configured templates and services.