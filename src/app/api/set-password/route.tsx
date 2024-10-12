import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise"; // Use the correct MySQL library

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to the database
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "", // Update with your MySQL root password
      database: "tym", // Your database name
    });

    // Update the user's password
    const [result] = await connection.execute(
      "UPDATE auth SET password = ?, password_set = 1 WHERE email = ?",
      [hashedPassword, email]
    );

    // Close the database connection
    await connection.end();

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Password successfully updated" });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
