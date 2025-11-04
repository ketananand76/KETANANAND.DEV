const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - Enhanced CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://ketananand76.github.io'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'ketanpaswan53@gmail.com',
        pass: process.env.EMAIL_PASS // App Password from Gmail
    }
});

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
    console.log('Email request received:', req.body); // Debug log
    const { name, email, subject, message, country, state, type } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
        console.log('Missing required fields:', { name, email, message });
        return res.status(400).json({ 
            success: false, 
            message: 'Missing required fields: name, email, and message are required' 
        });
    }

    try {
        let emailSubject, emailHtml;

        if (type === 'visitor_profile') {
            emailSubject = 'New Visitor Profile Submission';
            emailHtml = `
                <h2>New Visitor Profile</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>State:</strong> ${state}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `;
        } else {
            emailSubject = subject || 'New Contact Form Submission';
            emailHtml = `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `;
        }

        console.log('Sending email with subject:', emailSubject); // Debug log

        // Send email
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            replyTo: email,
            subject: emailSubject,
            html: emailHtml
        });

        console.log('Email sent successfully:', info.messageId); // Debug log

        res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully!' 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error details:', error.message); // More detailed error
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email',
            error: error.message 
        });
    }
});

// Serve the portfolio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Email service configured`);
});
