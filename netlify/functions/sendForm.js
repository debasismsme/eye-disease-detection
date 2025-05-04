const nodemailer = require('nodemailer');
const busboy = require('busboy');
require('dotenv').config();

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const bb = busboy({ headers: event.headers });
    const fields = {};
    const files = [];

    return await new Promise((resolve, reject) => {
      bb.on('file', (fieldname, file, info) => {
        const { filename } = info;
        const buffers = [];

        file.on('data', (data) => buffers.push(data));
        file.on('end', () => {
          files.push({
            fieldname,
            filename,
            content: Buffer.concat(buffers),
          });
        });
      });

      bb.on('field', (key, value) => {
        fields[key] = value;
      });

      bb.on('finish', async () => {
        try {
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const attachments = files.map((file) => ({
            filename: file.filename,
            content: file.content,
          }));

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: 'New Form Submission',
            html: `
              <h2>Form Submission</h2>
              <p><b>Name:</b> ${fields.name}</p>
              <p><b>Age:</b> ${fields.age}</p>
              <p><b>Gender:</b> ${fields.gender}</p>
              <p><b>Blood Group:</b> ${fields.bloodGroup}</p>
              <p><b>Phone:</b> ${fields.phone}</p>
              <p><b>Email:</b> ${fields.email}</p>
            `,
            attachments,
          };

          await transporter.sendMail(mailOptions);
          resolve({
            statusCode: 200,
            body: 'Form submitted and email sent!',
          });
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          resolve({
            statusCode: 500,
            body: 'Email sending failed',
          });
        }
      });

      bb.end(Buffer.from(event.body, 'base64'));
    });
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
