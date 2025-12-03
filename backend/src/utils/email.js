import { config } from "dotenv";
import { Resend } from "resend";
import nodemailer from "nodemailer";

config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// const sendWelcomeEmail = async (email, fullName) => {

//     const mailOptions = {
//         from: `"MEGA SKBLOG" <${process.env.MAIL_USER}>`,
//         to: email,
//         subject: `Welcome to Mega SKBlog, ${fullName}! 🎉`,
//         html: `
//             <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f2f4f8; padding: 50px 20px;">
//               <div style="max-width: 650px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">

//                 <div style="background: linear-gradient(135deg, #007bff, #6f42c1); color: #ffffff; padding: 35px 40px;">
//                 <h1 style="margin: 0; font-size: 30px; letter-spacing: 0.5px;">Welcome to <span style="color: #ffc107;">MEGA SKBLOG</span>!</h1>
//                 <p style="margin-top: 10px; font-size: 16px;">Where ideas take flight ✨</p>
//                 </div>

//                 <div style="padding: 30px 35px; line-height: 1.6; color: #333;">
//                 <p style="font-size: 16px;">Hi <strong style="color: #007bff;">${fullName}</strong>,</p>
//                 <p style="font-size: 15px;">
//                     We're absolutely thrilled to have you onboard! You've officially joined a growing community of developers, creators, and thinkers who love to share their knowledge and stories.
//                 </p>
//                 <p style="font-size: 15px;">
//                     At <strong>MEGA SKBLOG</strong>, you can publish your thoughts, explore insightful blogs, and connect with like-minded individuals.
//                 </p>

//                 <div style="text-align: center; margin: 30px 0;">
//                     <a href="https://mega-blog-seven-lovat.vercel.app/login" target="_blank" style="padding: 12px 30px; background-color: #007bff; color: white; font-size: 15px; font-weight: bold; text-decoration: none; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
//                     🚀 Get Started
//                     </a>
//                 </div>

//                 <p style="font-size: 14px; color: #666;">
//                     Need help or have any questions? Our support team is just an email away — we’re here for you.
//                 </p>

//                 <p style="margin-top: 30px; font-size: 15px;">Happy blogging,</p>
//                 <p style="font-size: 15px; font-weight: bold;">The MEGA SKBLOG Team</p>
//                 </div>

//                 <div style="background-color: #f8f9fa; text-align: center; padding: 15px 40px; font-size: 12px; color: #999;">
//                 &copy; ${new Date().toLocaleString("en-US", { month: "long" })} ${new Date().getFullYear()} MEGA SKBLOG. All rights reserved.
//                 </div>
//              </div>
//             </div>
//         `,
//     };


//     await transporter.sendMail(mailOptions)
// };

// const sendVerificationCode = async (email, verificationCode) => {

//     const mailOptions = {
//         from: `"MEGA SKBLOG" <${process.env.MAIL_USER}>`,
//         to: email,
//         subject: "✅ Mega SKBlog: Your OTP for Email Verification",
//         html: `
//             <div style="font-family: Arial, sans-serif; color: #333;">
//                 <h2>🔐 Email Verification - Mega SKBlog</h2>
//                 <p>Hi there,</p>
//                 <p>We received a request to register your email on <strong>Mega SKBlog</strong>.</p>
//                 <p>Please use the following OTP to verify your email address:</p>
//                 <h1 style="letter-spacing: 5px; color: #2e86de;">${verificationCode}</h1>
//                 <p>This OTP is valid for the next <strong>5 minutes</strong>. Do not share it with anyone.</p>
//                 <p>If you did not initiate this request, please ignore this email.</p>
//                 <br />
//                 <p>Thank you,<br/>Team Mega SKBlog</p>
//             </div>
//             `
//     }

//     await transporter.sendMail(mailOptions);
// };

// const sendVerificationLink = async (fullName, email, token) => {

//     const url = `${process.env.CORS_ORIGIN}/verify?token=${token}`;

//     const mailOptions = {
//         from: `"MEGA SKBLOG" <${process.env.MAIL_USER}>`,
//         to: email,
//         subject: "Please verify your subscription",
//         html: `
//               <p>Hi ${fullName},</p>
//               <p>Thank you for subscribing! Please verify your email by clicking the link below:</p>
//               <a href="${url}">${url}</a>
//               <p>This link will expire in 1 hour.</p>
//              `,
//     }

//     await transporter.sendMail(mailOptions);

// };

// const sendConfirmationEmail = async (fullName, email) => {

//     const mailOptions = {
//         from: `"MEGA SKBLOG Team" <${process.env.MAIL_USER}>`,
//         to: email,
//         subject: "🎉 Subscription Confirmed!",
//         html: `
//             <body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
//                 <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
//                      <div style="text-align: center; margin-bottom: 20px;">
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Rg6NAqAXbNLQr9bcMYoW9ZKcf3hB1ZNJkA&s" alt="Email Verified" width="90" />
//                      </div>
//                      <h2 style="color: #2f855a; text-align: center;">Welcome to SKBLOG, ${fullName}! 🎉</h2>
//                     <p style="font-size: 16px; color: #333; text-align: center;">
//                         Thank you for confirming your email. You’re now subscribed to our newsletter! 📬
//                     </p>
//                     <p style="font-size: 16px; color: #555; text-align: center;">
//                         We’ll keep you in the loop with updates, curated articles, and exciting blog content.
//                     </p>
//                     <div style="text-align: center; margin-top: 30px;">
//                         <a href="https://mega-blog-seven-lovat.vercel.app/" style="display: inline-block; background-color: #38a169; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
//                             Visit SKBLOG
//                         </a>
//                     </div>
//                     <p style="font-size: 14px; color: #888; margin-top: 40px; text-align: center;">
//                         Cheers,<br />
//                         <strong>The MEGA SKBLOG Team</strong>
//                     </p>
//                     <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
//                     <p style="font-size: 12px; color: #aaa; text-align: center;">
//                         You received this email because you subscribed to SKBLOG. If this wasn’t you, please ignore this message.
//                     </p>
//                 </div>
//             </body>
//        `,
//     };

//     await transporter.sendMail(mailOptions);
// };

// const sendBlogEmail = async (email, title, intro, blogLink) => {

//     const mailOptions = {
//         from: `"MEGA SKBLOG Team" <${process.env.MAIL_USER}>`,
//         to: email,
//         subject: `New Blog Published - ${title}`,
//         html: `
//             <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 30px;">
//                 <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); padding: 20px;">
//                 <h2 style="color: #4f46e5;">🎉 A New Blog Has Just Been Published!</h2>
//                 <h3 style="color: #222;">${title}</h3>
//                 <p style="line-height: 1.6;">${intro}</p>
//                 <a href="${blogLink}" 
//                      target="_blank"
//                      style="display: inline-block; margin-top: 20px; padding: 12px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
//                      👉 Read Full Blog
//                  </a>
//                 <p style="margin-top: 30px; font-size: 12px; color: #777;">
//                         You’re receiving this email because you subscribed to blog updates from <strong>MEGA SKBLOG</strong>.
//                  </p>
//                  </div>
//              </div>
//             `,
//     };

//     await transporter.sendMail(mailOptions);
// };

// const sendMessageReply = async (email, message) => {

//     const mailOptions = {
//         from: `"MEGA SKBLOG Team" <${process.env.MAIL_USER}>`,
//         to: email,
//         subject: `Reply Your Message By Mega SKBlog`,
//         html: `
//          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #ffffff; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
//             <h2 style="color: #2d2d2d; text-align: center; margin-bottom: 10px;">You've Got a Reply!</h2>
//             <p style="color: #555; font-size: 16px; text-align: center; margin: 0;">from <strong>MEGA SKBLOG Team</strong></p>

//             <hr style="border: none; height: 1px; background: #eee; margin: 25px 0;">

//             <p style="font-size: 15px; color: #333; line-height: 1.8; text-align: center;">
//                 ${message}
//             </p>

//             <div style="margin-top: 35px; text-align: center;">
//                 <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Kind Regards,</p>
//                 <p style="font-size: 15px; color: #2c3e50; font-weight: bold;">MEGA SKBLOG Team</p>
//                 <a href="https://mega-blog-seven-lovat.vercel.app" target="_blank" style="display: inline-block; margin-top: 10px; background-color: #4f46e5; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">Visit Website</a>
//             </div>

//             <footer style="margin-top: 40px; font-size: 12px; color: #999; text-align: center; line-height: 1.5;">
//                 You received this email because you contacted MEGA SKBLOG.<br />
//                 If you didn’t make this request, you can safely ignore this message.
//             </footer>
//         </div>
//         `
//     }

//     await transporter.sendMail(mailOptions);
// }


//Resend

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (email, fullName) => {
    await resend.emails.send({
        from: "Mega SKBlog <onboarding@resend.dev>",
        to: email,
        subject: `Welcome to Mega SKBlog, ${fullName}! 🎉`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f2f4f8; padding: 50px 20px;">
              <div style="max-width: 650px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
                
                <div style="background: linear-gradient(135deg, #007bff, #6f42c1); color: #ffffff; padding: 35px 40px;">
                <h1 style="margin: 0; font-size: 30px; letter-spacing: 0.5px;">Welcome to <span style="color: #ffc107;">MEGA SKBLOG</span>!</h1>
                <p style="margin-top: 10px; font-size: 16px;">Where ideas take flight ✨</p>
                </div>

                <div style="padding: 30px 35px; line-height: 1.6; color: #333;">
                <p style="font-size: 16px;">Hi <strong style="color: #007bff;">${fullName}</strong>,</p>
                <p style="font-size: 15px;">
                    We're absolutely thrilled to have you onboard! You've officially joined a growing community of developers, creators, and thinkers who love to share their knowledge and stories.
                </p>
                <p style="font-size: 15px;">
                    At <strong>MEGA SKBLOG</strong>, you can publish your thoughts, explore insightful blogs, and connect with like-minded individuals.
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://mega-blog-seven-lovat.vercel.app/login" target="_blank" style="padding: 12px 30px; background-color: #007bff; color: white; font-size: 15px; font-weight: bold; text-decoration: none; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    🚀 Get Started
                    </a>
                </div>

                <p style="font-size: 14px; color: #666;">
                    Need help or have any questions? Our support team is just an email away — we’re here for you.
                </p>

                <p style="margin-top: 30px; font-size: 15px;">Happy blogging,</p>
                <p style="font-size: 15px; font-weight: bold;">The MEGA SKBLOG Team</p>
                </div>

                <div style="background-color: #f8f9fa; text-align: center; padding: 15px 40px; font-size: 12px; color: #999;">
                &copy; ${new Date().toLocaleString("en-US", { month: "long" })} ${new Date().getFullYear()} MEGA SKBLOG. All rights reserved.
                </div>
             </div>
            </div>
        `,
    })
}

const sendVerificationCode = async (email, verificationCode) => {
    await resend.emails.send({
        from: "Mega SKBlog <onboarding@resend.dev>",
        to: email,
        subject: "✅ Mega SKBlog: Your OTP for Email Verification",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>🔐 Email Verification - Mega SKBlog</h2>
                <p>Hi there,</p>
                <p>We received a request to register your email on <strong>Mega SKBlog</strong>.</p>
                <p>Please use the following OTP to verify your email address:</p>
                <h1 style="letter-spacing: 5px; color: #2e86de;">${verificationCode}</h1>
                <p>This OTP is valid for the next <strong>5 minutes</strong>. Do not share it with anyone.</p>
                <p>If you did not initiate this request, please ignore this email.</p>
                <br />
                <p>Thank you,<br/>Team Mega SKBlog</p>
            </div>
         `
    });
};

const sendVerificationLink = async (fullName, email, token) => {

    const url = `${process.env.CORS_ORIGIN}/verify?token=${token}`;

    await resend.emails.send({
        from: "MEGA SKBLOG <onboarding@resend.dev>",
        to: email,
        subject: "Please verify your subscription",
        html: `
            <p>Hi ${fullName},</p>
            <p>Thank you for subscribing! Please verify your email by clicking the link below:</p>
            <a href="${url}">${url}</a>
            <p>This link will expire in 1 hour.</p>
        `,
    });
};

const sendConfirmationEmail = async (fullName, email) => {
    await resend.emails.send({
        from: "MEGA SKBLOG Team <onboarding@resend.dev>",
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
    });
};

const sendBlogEmail = async (email, title, intro, blogLink) => {
    await resend.emails.send({
        from: "MEGA SKBLOG Team <onboarding@resend.dev>",
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
    });
};

const sendMessageReply = async (email, message) => {
    await resend.emails.send({
        from: "MEGA SKBLOG Team <onboarding@resend.dev>",
        to: email,
        subject: "Reply Your Message By Mega SKBlog",
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #ffffff; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h2 style="color: #2d2d2d; text-align: center; margin-bottom: 10px;">You've Got a Reply!</h2>
                <p style="color: #555; font-size: 16px; text-align: center; margin: 0;">from <strong>MEGA SKBLOG Team</strong></p>

                <hr style="border: none; height: 1px; background: #eee; margin: 25px 0;">

                <p style="font-size: 15px; color: #333; line-height: 1.8; text-align: center;">
                    ${message}
                </p>

                <div style="margin-top: 35px; text-align: center;">
                    <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Kind Regards,</p>
                    <p style="font-size: 15px; color: #2c3e50; font-weight: bold;">MEGA SKBLOG Team</p>
                    <a href="https://mega-blog-seven-lovat.vercel.app" target="_blank" style="display: inline-block; margin-top: 10px; background-color: #4f46e5; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">Visit Website</a>
                </div>

                <footer style="margin-top: 40px; font-size: 12px; color: #999; text-align: center; line-height: 1.5;">
                    You received this email because you contacted MEGA SKBLOG.<br />
                    If you didn’t make this request, you can safely ignore this message.
                </footer>
            </div>
        `,
    });
};

export { sendWelcomeEmail, sendVerificationCode, sendVerificationLink, sendConfirmationEmail, sendBlogEmail, sendMessageReply };