"use client"; // This ensures the component is treated as a Client Component

import { useRouter } from "next/navigation";
import { Box, Typography, Grid } from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  const handleOtpClick = () => {
    router.push("/request-otp");
  };

  const handleCredentialsClick = () => {
    router.push("/login");
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
            Request OTP
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Don’t have a password yet? Request an OTP to log in.
          </Typography>
        </Grid>

        {/* Right Side: Login with Credentials */}
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
            Login with Credentials
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Already have an account? Login with your email and password.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
