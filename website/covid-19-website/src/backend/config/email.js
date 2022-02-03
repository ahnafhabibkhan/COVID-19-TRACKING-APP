import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'soen390proj@gmail.com',
        pass: 'SOEN390ProjectPassword',
    },
    secure: true,
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;