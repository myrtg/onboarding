import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      "http://localhost/auth0app/src/Auth/send-otp.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (response.ok) {
      return NextResponse.json({ message: "OTP sent successfully." });
    } else {
      const data = await response.json();
      return NextResponse.json(
        { message: data.message || "Failed to send OTP." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error during OTP request:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
