"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // To retrieve URL params

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(""); // For storing the user's email

  const router = useRouter();
  const searchParams = useSearchParams(); // To access URL query params

  useEffect(() => {
    // Retrieve the email from query params or redirect if not present
    const userEmail = searchParams.get("email");
    if (userEmail) {
      setEmail(userEmail);
    } else {
      setErrorMessage("Unable to retrieve user email");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Make API request to update the password
    const res = await fetch("/api/set-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }), // Pass email along with password
    });

    if (res.ok) {
      alert("Password successfully updated!");
      router.push("/login"); // Redirect to login after setting the password
    } else {
      const data = await res.json();
      setErrorMessage(data.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Set Your Password</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Set Password</button>
      </form>
    </div>
  );
}
