import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
    const response = await fetch(
        `http://localhost/auth0app/src/Auth/get-profile.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

    const data = await response.json();

   return NextResponse.json({profile_completed: data.profile_completed});
}
