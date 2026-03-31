
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
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
    const subject = "🎉 Welcome to Backend Ledger!";

    const text = `Hello ${name},

Welcome to Backend Ledger!

We're excited to have you on board. Your account has been successfully created and you can now start managing your financial records efficiently.

If you have any questions or need assistance, feel free to reach out to us anytime.

Best regards,  
Backend Ledger Team`;

    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
        
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: #4CAF50; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">Backend Ledger</h2>
            </div>

            <!-- Body -->
            <div style="padding: 30px; color: #333;">
                <h3>Hello ${name}, 👋</h3>

                <p>
                    Welcome to <strong>Backend Ledger</strong>! We're thrilled to have you join our platform.
                </p>

                <p>
                    Your account has been successfully created. You can now start tracking and managing your financial records with ease.
                </p>

                <p>
                    If you need any help, feel free to contact our support team anytime.
                </p>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 30px 0;">
                    <a href="#" style="background: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Get Started
                    </a>
                </div>

                <p>
                    Cheers,<br>
                    <strong>The Backend Ledger Team</strong>
                </p>
            </div>

            <!-- Footer -->
            <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                © ${new Date().getFullYear()} Backend Ledger. All rights reserved.
            </div>

        </div>
    </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Successful!';
    const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Backend Ledger Team`;
    const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Failed';
    const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Backend Ledger Team`;
    const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}


module.exports = {
    sendRegistrationEmail,
     sendTransactionEmail,
     sendTransactionFailureEmail
}