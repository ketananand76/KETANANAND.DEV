// Email functionality test script
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmailFunctionality() {
    console.log('Testing email functionality...');
    
    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        // Verify connection
        await transporter.verify();
        console.log('✅ Email server connection successful');
        
        // Test email
        const testEmail = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself for testing
            subject: 'Portfolio Email Test',
            html: `
                <h2>Portfolio Email Test</h2>
                <p>This is a test email from your portfolio website.</p>
                <p>If you receive this, your email configuration is working!</p>
                <hr>
                <p><strong>Test Details:</strong></p>
                <ul>
                    <li>Time: ${new Date().toLocaleString()}</li>
                    <li>Environment: ${process.env.NODE_ENV}</li>
                    <li>Server: Portfolio Website</li>
                </ul>
            `
        };
        
        const result = await transporter.sendMail(testEmail);
        console.log('✅ Test email sent successfully:', result.messageId);
        console.log('✅ Email functionality is working properly!');
        
    } catch (error) {
        console.error('❌ Email test failed:', error.message);
        console.error('Please check your environment variables and Gmail settings.');
    } finally {
        transporter.close();
    }
}

// Run test
testEmailFunctionality();