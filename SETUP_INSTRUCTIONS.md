# Portfolio Setup with Nodemailer

## ✅ Email Already Configured!

Good news! Your Gmail App Password is already set in `.env` file.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Open Portfolio
Open browser and go to: **http://localhost:3000**

## 📧 How Email Works

1. **Backend Server**: Node.js + Express + Nodemailer
2. **Email Service**: Gmail SMTP
3. **Your Email**: ketanpaswan53@gmail.com
4. **App Password**: Already configured in `.env`

## 🔧 What Was Configured

### Files Created/Updated:
- ✅ `server.js` - Backend server with Nodemailer
- ✅ `package.json` - Dependencies and scripts
- ✅ `.env` - Email credentials (PROTECTED)
- ✅ `.gitignore` - Protects sensitive files
- ✅ `public/js/main.js` - Form handlers updated

### Forms Now Working:
1. **Visitor Profile Form** - Sends visitor information
2. **Contact Form** - Sends contact messages

## 📝 Commands

```bash
# Install all dependencies
npm install

# Start production server
npm start

# Start development server (auto-reload)
npm run dev
```

## 🧪 Testing

1. Start server: `npm start`
2. Open: `http://localhost:3000`
3. Fill any form
4. Submit
5. Check your email: **ketanpaswan53@gmail.com**

## ⚠️ Important Notes

### Gmail App Password
- Already configured: `jedc qjxg hrha ueei`
- Keep `.env` file SECRET
- Never commit `.env` to Git

### If Email Not Working:
1. Check Gmail settings:
   - 2-Step Verification enabled
   - App password still valid
2. Check server console for errors
3. Verify internet connection

## 🔐 Security

- `.env` file is protected by `.gitignore`
- Never share your app password
- Keep credentials secure

## 📦 Dependencies

```json
{
  "express": "^4.18.2",      // Web server
  "nodemailer": "^6.9.7",    // Email sending
  "cors": "^2.8.5",          // CORS support
  "dotenv": "^17.2.3"        // Environment variables
}
```

## 🎯 Features

- ✅ Real-time email sending
- ✅ Both forms working
- ✅ Error handling
- ✅ Loading states
- ✅ Success/Error notifications
- ✅ Gmail integration

## 🆘 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "Email not sending"
- Check `.env` file exists
- Verify Gmail app password
- Check internet connection

### "Port 3000 already in use"
Change port in `.env`:
```
PORT=3001
```

## 🌟 Ready to Use!

Your portfolio is fully configured with working email functionality!

Just run:
```bash
npm install
npm start
```

Then visit: **http://localhost:3000**
