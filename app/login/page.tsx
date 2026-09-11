"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await authClient.signIn.username({
      username: username.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Invalid username or password.");
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
      <h1>Login</h1>

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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}
      </form>

      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <a href="/register">Create one</a>
      </p>
    </main>
  );
}