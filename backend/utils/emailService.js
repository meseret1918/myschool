const nodemailer = require('nodemailer');

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});

// Send email function
const sendEmail = (to, subject, text, html) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email address
        to, // Receiver's email address
        subject, // Email subject
        text, // Plain text body (fallback)
        html, // HTML body (formatted email content)
    };

    return transporter.sendMail(mailOptions);
};

// Example function to send a registration email
const sendRegistrationEmail = (to, username) => {
    const subject = 'Welcome to Our School Management System';
    const text = `Hello ${username},\n\nWelcome to the system. We are excited to have you onboard.`;
    const html = `<p>Hello ${username},</p><p>Welcome to the system. We are excited to have you onboard.</p>`;

    return sendEmail(to, subject, text, html);
};

module.exports = { sendEmail, sendRegistrationEmail };
