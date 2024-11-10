import nodemailer from "nodemailer";

async function sendEmail(to, subject, message) {
    let transporter = nodemailer.createTransport({
      service: 'Gmail', // or any email service you prefer
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    let info = await transporter.sendMail({
      from: `"Notification Service" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: message,
    });
  
    // console.log('Email sent: %s', info.messageId);
    return info;
}

export default sendEmail;