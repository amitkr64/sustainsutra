const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Create transporter based on environment
const createTransporter = () => {
    // Check if email configuration is available
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        logger.warn('Email configuration not found. Using test mode.');
        return null;
    }

    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Email templates
const templates = {
    welcome: (name) => ({
        subject: 'Welcome to SustainSutra!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%); color: #c9a227; padding: 30px; text-align: center; }
                    .content { padding: 30px; background: #f9f9f9; }
                    .button { display: inline-block; padding: 12px 30px; background: #c9a227; color: #1e3a5f; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>SustainSutra</h1>
                        <p>Engineering NetZero Pathways</p>
                    </div>
                    <div class="content">
                        <h2>Welcome, ${name}!</h2>
                        <p>Thank you for joining SustainSutra. We're excited to have you on board.</p>
                        <p>Get started with our comprehensive ESG advisory services:</p>
                        <ul>
                            <li>Carbon Footprint Analysis</li>
                            <li>ISO 14064 Verification</li>
                            <li>BRSR Consulting</li>
                            <li>Sustainability Training</li>
                        </ul>
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/carbon-calculator" class="button">Get Started</a>
                        <p>If you have any questions, feel free to reach out to us.</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 SustainSutra. All rights reserved.</p>
                        <p>Email: info@sustainsutra.in | Phone: +91-8742939191</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    passwordReset: (resetUrl) => ({
        subject: 'Reset Your Password - SustainSutra',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%); color: #c9a227; padding: 30px; text-align: center; }
                    .content { padding: 30px; background: #f9f9f9; }
                    .button { display: inline-block; padding: 12px 30px; background: #c9a227; color: #1e3a5f; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>SustainSutra</h1>
                    </div>
                    <div class="content">
                        <h2>Password Reset Request</h2>
                        <p>You requested to reset your password. Click the button below to proceed:</p>
                        <a href="${resetUrl}" class="button">Reset Password</a>
                        <div class="warning">
                            <p><strong>This link will expire in 1 hour.</strong></p>
                            <p>If you didn't request this, please ignore this email.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    appointmentConfirmation: (data) => ({
        subject: 'Appointment Confirmed - SustainSutra',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%); color: #c9a227; padding: 30px; text-align: center; }
                    .content { padding: 30px; background: #f9f9f9; }
                    .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>SustainSutra</h1>
                    </div>
                    <div class="content">
                        <h2>Appointment Confirmed</h2>
                        <p>Hello ${data.name},</p>
                        <p>Your appointment has been confirmed. Here are the details:</p>
                        <div class="details">
                            <p><strong>Date:</strong> ${data.date}</p>
                            <p><strong>Time:</strong> ${data.timeSlot}</p>
                            <p><strong>Type:</strong> ${data.type || 'General Consultation'}</p>
                        </div>
                        <p>We look forward to speaking with you!</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    courseEnrollment: (data) => ({
        subject: `Enrolled in ${data.courseTitle} - SustainSutra`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%); color: #c9a227; padding: 30px; text-align: center; }
                    .content { padding: 30px; background: #f9f9f9; }
                    .button { display: inline-block; padding: 12px 30px; background: #c9a227; color: #1e3a5f; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>SustainSutra Academy</h1>
                    </div>
                    <div class="content">
                        <h2>You're Enrolled!</h2>
                        <p>You have successfully enrolled in:</p>
                        <h3>${data.courseTitle}</h3>
                        <p><strong>Instructor:</strong> ${data.instructor}</p>
                        <p><strong>Duration:</strong> ${data.duration}</p>
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/courses/${data.courseSlug}/learn" class="button">Start Learning</a>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    reportPurchase: (data) => ({
        subject: 'Report Purchase Confirmation - SustainSutra',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%); color: #c9a227; padding: 30px; text-align: center; }
                    .content { padding: 30px; background: #f9f9f9; }
                    .receipt { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>SustainSutra</h1>
                    </div>
                    <div class="content">
                        <h2>Purchase Confirmation</h2>
                        <p>Thank you for your purchase!</p>
                        <div class="receipt">
                            <h3>Receipt</h3>
                            <p><strong>Report:</strong> ${data.reportName}</p>
                            <p><strong>Amount:</strong> ₹${data.amount}</p>
                            <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
                            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                        </div>
                        <p>Your report is now available for download.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    })
};

// Send email function
const sendEmail = async (to, template, data) => {
    const transporter = createTransporter();

    // If no transporter, log and return success (for demo mode)
    if (!transporter) {
        logger.info(`[DEMO MODE] Would send email to: ${to}`, { template, data });
        return { success: true, demo: true };
    }

    try {
        const emailContent = templates[template](data);
        const mailOptions = {
            from: `"SustainSutra" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to,
            ...emailContent
        };

        const info = await transporter.sendMail(mailOptions);
        logger.info('Email sent successfully', { to, template, messageId: info.messageId });
        return { success: true, messageId: info.messageId };
    } catch (error) {
        logger.error('Error sending email', { to, template, error: error.message });
        return { success: false, error: error.message };
    }
};

// Email service methods
const emailService = {
    // Send welcome email
    sendWelcome: (email, name) => sendEmail(email, 'welcome', { name }),

    // Send password reset email
    sendPasswordReset: (email, resetUrl) => sendEmail(email, 'passwordReset', { resetUrl }),

    // Send appointment confirmation
    sendAppointmentConfirmation: (email, data) => sendEmail(email, 'appointmentConfirmation', data),

    // Send course enrollment confirmation
    sendCourseEnrollment: (email, data) => sendEmail(email, 'courseEnrollment', data),

    // Send report purchase confirmation
    sendReportPurchase: (email, data) => sendEmail(email, 'reportPurchase', data),

    // Test email configuration
    testConnection: async () => {
        const transporter = createTransporter();
        if (!transporter) {
            return { success: false, message: 'Email not configured' };
        }

        try {
            await transporter.verify();
            return { success: true, message: 'Email server is ready' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
};

module.exports = emailService;
