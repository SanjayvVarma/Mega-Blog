import { config } from "dotenv";
import nodemailer from "nodemailer";
import asyncHandler from "./asyncHandler.js";

config({ path: '../../.env' });

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const sendVerificationLink = asyncHandler(async (fullName, email, token) => {

    const url = `${process.env.CORS_ORIGIN}/verify?token=${token}`;

    const mailOptions = {
        from: `"MEGA SKBLOG" ${process.env.MAIL_USER}`,
        to: email,
        subject: "Please verify your subscription",
        html: `
              <p>Hi ${fullName},</p>
              <p>Thank you for subscribing! Please verify your email by clicking the link below:</p>
              <a href="${url}">${url}</a>
              <p>This link will expire in 1 hour.</p>
             `,
    }

    const mailInfo = await transporter.sendMail(mailOptions);

    return mailInfo;

});

const sendConfirmationEmail = async (fullName, email) => {

    const mailOptions = {
        from: `"MEGA SKBLOG Team" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "🎉 Subscription Confirmed!",
        html: `
            <body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                     <div style="text-align: center; margin-bottom: 20px;">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Rg6NAqAXbNLQr9bcMYoW9ZKcf3hB1ZNJkA&s" alt="Email Verified" width="90" />
                     </div>
                     <h2 style="color: #2f855a; text-align: center;">Welcome to SKBLOG, ${fullName}! 🎉</h2>
                    <p style="font-size: 16px; color: #333; text-align: center;">
                        Thank you for confirming your email. You’re now subscribed to our newsletter! 📬
                    </p>
                    <p style="font-size: 16px; color: #555; text-align: center;">
                        We’ll keep you in the loop with updates, curated articles, and exciting blog content.
                    </p>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="https://mega-blog-seven-lovat.vercel.app/" style="display: inline-block; background-color: #38a169; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
                            Visit SKBLOG
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #888; margin-top: 40px; text-align: center;">
                        Cheers,<br />
                        <strong>The MEGA SKBLOG Team</strong>
                    </p>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
                    <p style="font-size: 12px; color: #aaa; text-align: center;">
                        You received this email because you subscribed to SKBLOG. If this wasn’t you, please ignore this message.
                    </p>
                </div>
            </body>
       `,
    };

    await transporter.sendMail(mailOptions);
};

const sendBlogEmail = async (email, title, intro, blogLink) => {

    const mailOptions = {
        from: `"MEGA SKBLOG Team" <${process.env.MAIL_USER}>`,
        to: email,
        subject: `New Blog Published - ${title}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 30px;">
                <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); padding: 20px;">
                <h2 style="color: #4f46e5;">🎉 A New Blog Has Just Been Published!</h2>
                <h3 style="color: #222;">${title}</h3>
                <p style="line-height: 1.6;">${intro}</p>
                <a href="${blogLink}" 
                     target="_blank"
                     style="display: inline-block; margin-top: 20px; padding: 12px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                     👉 Read Full Blog
                 </a>
                <p style="margin-top: 30px; font-size: 12px; color: #777;">
                        You’re receiving this email because you subscribed to blog updates from <strong>MEGA SKBLOG</strong>.
                 </p>
                 </div>
             </div>
            `,
    };

    await transporter.sendMail(mailOptions);
};

export { sendVerificationLink, sendConfirmationEmail, sendBlogEmail };