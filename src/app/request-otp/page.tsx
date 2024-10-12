"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CssBaseline,
  Grid,
} from "@mui/material";

export default function RequestOtpPage() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/request-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // Ensure email is captured here
    });

    if (res.ok) {
      setSuccessMessage("OTP sent to your email!");
      setErrorMessage("");
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`); // Redirect to verify-otp page
    } else {
      const data = await res.json();
      setErrorMessage(data.message || "Failed to send OTP.");
      setSuccessMessage("");
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Request One-Time Password (OTP)
        </Typography>
        <Box
          component="form"
          onSubmit={handleRequestOtp}
          sx={{ width: "100%", maxWidth: 400 }}
        >
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          {successMessage && (
            <Typography color="success">{successMessage}</Typography>
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Request OTP
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
