import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import cors from 'cors';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

// Set up multer for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API to receive form data
app.post('/api/send-form', upload.fields([{ name: 'leftEyeFile' }, { name: 'rightEyeFile' }]), (req, res) => {
  const { name, age, gender, bloodGroup, phone, email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: 'New Form Submission',
    html: `
      <h2>Form Submission</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Age:</b> ${age}</p>
      <p><b>Gender:</b> ${gender}</p>
      <p><b>Blood Group:</b> ${bloodGroup}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
    `,
    attachments: [
      req.files.leftEyeFile?.[0] && {
        filename: 'left-eye.jpg',
        content: req.files.leftEyeFile[0].buffer,
      },
      req.files.rightEyeFile?.[0] && {
        filename: 'right-eye.jpg',
        content: req.files.rightEyeFile[0].buffer,
      },
    ].filter(Boolean),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Email error:', err);
      return res.status(500).send('Error sending email');
    }
    res.send('Form submitted and email sent!');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
