import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mysql from "mysql2/promise";

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(req: Request) {
  const { email } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "no-reply@yourapp.com",
    to: email,
    subject: "Complete Your Registration",
    text: `Click the following link to complete your registration: https://7d61-102-158-42-201.ngrok-free.app/onboarding/complete-registration.php`, // Use ngrok URL
  };

  try {
    // Check if the user exists in the employees table
    const [users] = await pool.query(
      "SELECT * FROM employees WHERE email = ?",
      [email]
    );

    if (Array.isArray(users) && users.length === 0) {
      return NextResponse.json(
        { message: "User not found in the employees table" },
        { status: 404 }
      );
    }

    // Send the email without generating a token
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
