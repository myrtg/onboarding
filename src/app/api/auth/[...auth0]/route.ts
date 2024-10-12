import { NextRequest } from "next/server";
import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  async callback(req: NextRequest) {
    try {
      // Let Auth0 handle the callback
      await handleCallback(req);

      // Redirect the user to the set-password page after successful authentication
      return new Response(null, {
        status: 302,
        headers: { Location: "/set-password" },
      });
    } catch (error) {
      console.error("Error during Auth0 callback:", error);

      return new Response(JSON.stringify({ message: "Callback failed" }), {
        status: 500,
      });
    }
  },
});
