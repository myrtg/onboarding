"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CompleteProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(""); 
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        console.log(data);
        if (data?.email) {
          setEmail(data.email);
        }
      } catch (error) {
        console.error("Failed to fetch user email:", error);
      }
    };
    fetchUserEmail();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, firstName, lastName, position }),
    });

    if (res.ok) {
      setMessage("Profile updated successfully!");
      router.push("/profile"); // Redirect to profile page after completion
    } else {
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div>
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <button type="submit">Complete Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
