const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (toEmail, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Verifikasi Akun EduCourse',
    html: `<p>Klik link berikut untuk verifikasi akun Anda:</p>
           <a href="http://localhost:${process.env.PORT || 3000}/api/auth/verify-email?token=${token}">Verifikasi Email</a>`,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
