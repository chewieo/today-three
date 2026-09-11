"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await authClient.signUp.email({
      email: email.trim(),
      username: username.trim(),
      name: displayName.trim(),
      displayUsername: username.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Something went wrong.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "20px",
      }}
    >
      <h1>Create Account</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}
      </form>

      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <a href="/login">Login</a>
      </p>
    </main>
  );
}