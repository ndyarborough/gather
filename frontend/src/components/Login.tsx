"use client";

import { useContext, useState } from "react";
import { login } from "../../api/api";
import { UserContext } from "@/context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { setUser } = useContext(UserContext); // ✅ Get setUser from context

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const userData = await login(email, password);
    console.log(userData);

    if (userData.message) {
      setMessage(userData.message);
      console.log("Setting message");
    } else {
      setUser(userData); // ✅ Store user in context
      console.log("Login successful!", userData);
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
