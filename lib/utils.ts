import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import nodemailer from "nodemailer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({
  from,
  subject,
  message,
}: {
  from: string;
  subject: string;
  message: string;
}) => {
  try {
    const info = await transporter.sendMail({
      to: process.env.NEXT_PUBLIC_EMAIL_USER,
      from,
      subject,
      message,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
