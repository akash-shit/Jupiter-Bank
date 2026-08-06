const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Jupiter Bank" <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        // console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


async function sendRegistrationEmail(userEmail, name) {
    const subject = 'Welcome to Jupiter Bank - Your Account Has Been Created';
    const text = `Hello ${name},Welcome to Jupiter Bank! We are delighted to inform you that your account registration has been successfully completed. Thank you for choosing Jupiter Bank as your trusted financial partner.You can now securely access our banking services and enjoy a seamless digital banking experience. If you have any questions or need assistance, our support team is always here to help.Thank you for banking with us. Best regards, Jupiter Bank Team`;
    const html = `<p class="header">Welcome to Jupiter Bank!</p><p>Hello <strong>${name}</strong>,</p><p>We are delighted to inform you that your account registration has been successfully completed.</p><p>Thank you for choosing <strong>Jupiter Bank</strong> as your trusted financial partner. You can now access our secure banking services and enjoy a smooth digital banking experience.</p><p>If you have any questions or require assistance, our support team is always available to help you.</p><p>Thank you for banking with us. We look forward to serving you.</p><p>Best regards,<br><strong>Jupiter Bank Team</strong></p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Successful!';
    const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Jupiter Bank Team`;
    const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Jupiter Bank Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Failed';
    const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Jupiter Bank Team`;
    const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Jupiter Bank Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
};
