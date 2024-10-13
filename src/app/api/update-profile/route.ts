import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, firstName, lastName, position } = await req.json();

  try {
    // Send the data to the PHP backend to update the profile
    const response = await fetch(
      "http://localhost/auth0app/src/Auth/updateprofile.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, lastName, position }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ message: "Profile updated successfully." });
    } else {
      return NextResponse.json(
        { message: data.message || "Failed to update profile." },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
