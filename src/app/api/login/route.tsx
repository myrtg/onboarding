import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Send login credentials to the PHP backend
  const res = await fetch("http://localhost/auth0app/src/Auth/login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data); // Return the response from PHP back to the client
  } else {
    return NextResponse.json(
      { message: "Invalid login credentials" },
      { status: 401 }
    );
  }
}
