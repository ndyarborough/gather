"use client";

import { useState } from "react";

interface LoginProps {
  setUser: (user: any) => void;
}

export default function Login({ setUser }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      setUser(data); // Store the user in state
      console.log("Login successful!", data);
    } catch (error) {
      setMessage('Incorrect Username/Password');
    }
  };

  return (
    <form className="border-2 border-primary-color w-fit p-4" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        className="rounded p-2 my-2 block"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="rounded p-2 my-2 block"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {message && <p>{message}</p>}
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
}