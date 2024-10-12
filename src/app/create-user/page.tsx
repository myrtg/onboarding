"use client";
import { useState } from "react";

export default function UserCreationForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, service, position }),
      });

      if (res.ok) {
        alert("User created, OTP sent via email");
      } else {
        const data = await res.json();
        setError(data.message || "Error creating user.");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Service"
        value={service}
        onChange={(e) => setService(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating User..." : "Create User"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
