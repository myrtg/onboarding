import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Send the request to the PHP backend
    const res = await fetch(
      "http://localhost/auth0app/src/Auth/get-profile.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    // If the request to PHP was successful, return the data to the front-end
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      const error = await res.json();
      return NextResponse.json(
        { error: error.message },
        { status: res.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}
