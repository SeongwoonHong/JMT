import * as nodemailer from 'nodemailer';

const { GMAIL_USER: user, GMAIL_PASS: pass } = process.env;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass,
  }
});

export const sendMail = (payload, url) => transporter.sendMail({
  to: payload.email,
  subject: 'Verification Email',
  html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
});
