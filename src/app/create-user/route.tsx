import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { firstName, lastName, email } = await request.json();

  try {
    // Make a POST request to your PHP backend to create the user
    const res = await fetch(
      "http://localhost/auth0app/src/Auth/create-user.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email }),
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
