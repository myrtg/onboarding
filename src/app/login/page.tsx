"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // API request for login (this assumes you have a login endpoint ready)
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/profile");
    } else {
      const data = await res.json();
      setErrorMessage(data.message || "Invalid login credentials.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #92A8D1 50%, #F7CAC9 50%)", // Consistent styling with home page
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: "50%",
          padding: "40px",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Login
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {errorMessage && (
            <Typography color="error" align="center" gutterBottom>
              {errorMessage}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
              backgroundColor: "#92A8D1",
              "&:hover": {
                backgroundColor: "#6f91b4",
              },
              width: "100%",
              padding: "10px",
            }}
          >
            Login
          </Button>
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Button
              variant="text"
              onClick={() => router.push("/request-otp")}
              sx={{ textTransform: "none", color: "#92A8D1" }}
            >
              Request OTP
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
