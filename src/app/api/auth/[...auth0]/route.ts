import {
  Session,
  handleCallback,
  handleAuth,
  handleLogin,
} from "@auth0/nextjs-auth0";

import { NextRequest, NextResponse } from "next/server";

const afterCallback = async (req: NextRequest, session: Session) => {
  console.log("session afterCallback", session);
  //   if (!session || session.accessToken === undefined) {
  //     return NextResponse.redirect(new URL("/api/auth/logout", req.url)); //used to logout user
  //   }

  const response = await fetch(
    `http://localhost/auth0app/src/Auth/get-profile.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: session?.user?.email }),
    }
  );

  const data = await response.json();
  if (!response.ok || data.profile_completed === 0) {
    const redirectUrl = `${req.nextUrl.origin}/update-profile`;
    console.log("Redirecting to:", redirectUrl);
    return {
      returnTo: redirectUrl,
      ...session,
    };
  }
  const redirectUrl = `${req.nextUrl.origin}/profile`;
  console.log("Redirecting to:", redirectUrl);
  return {
    returnTo: redirectUrl,
    ...session,
  };
};

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      scope: "openid profile email",
    },
  }),
});
