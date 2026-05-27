import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  logger: true,
  debug: true
});

// Send email to admin
export const sendContactEmail = async (name, email, message) => {
  try {
    console.log('📧 [EMAIL] Starting to send email...');
    console.log('📧 [EMAIL] From:', process.env.GMAIL_USER);
    console.log('📧 [EMAIL] To:', process.env.GMAIL_USER);

    const result = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `
    });

    console.log('✅ [EMAIL] Email sent successfully!');
    return { success: true };
  } catch (error) {
    console.error('❌ [EMAIL] Error:', error.message);
    console.error('❌ [EMAIL] Code:', error.code);
    return { success: false, error: error.message };
  }
};
