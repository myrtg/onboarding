"use client"; // This ensures the component is treated as a Client Component

import { useRouter } from "next/navigation";
import { Box, Typography, Grid } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function HomePage() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  const handleOtpClick = () => {
    router.push("/request-otp");
  };

  const handleCredentialsClick = () => {

    if (user) {
    console.log("User info:", user);
    (async () => {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      }); 

      const data = await res.json();
      console.log("API response:", data);
  
      if (!res.ok || data.profile_completed === 0) {
        router.push("/update-profile"); // Redirect to update profile route
      }

      if (data.profile_completed === 1) {
        router.push("/profile"); // Redirect to profile route
      }
    })();
  }
    router.push("/api/auth/login"); // Redirect to Auth0 login route
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F7CAC9 50%, #92A8D1 50%)", // Soft gradient for left and right
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        {/* Left Side: Request OTP */}
        <Grid
          item
          xs={6}
          onClick={handleOtpClick}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "#F7CAC9",
            color: "#fff",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Register
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Request OTP to register
          </Typography>
        </Grid>

        {/* Right Side: Login with Auth0 */}
        <Grid
          item
          xs={6}
          onClick={handleCredentialsClick}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "#92A8D1",
            color: "#fff",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Login
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Login with Auth0
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
