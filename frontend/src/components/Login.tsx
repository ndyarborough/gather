"use client";

import { useContext, useState } from "react";
import { login } from "../api/api";
import { UserContext } from "@/context/UserContext";
import { ToastContext } from "@/context/ToastContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext); // ✅ Get setUser from context
  const toast = useContext(ToastContext);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const userData = await login(email, password);

    if (userData.message) {
      toast?.setToast(userData.message, 'error');
    } else {
      setUser(userData); // ✅ Store user in context
    }
  };

  return (
    <form className="shadow-primary shadow-sm rounded-lg p-4" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        className="rounded-sm p-2 my-2 block"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="rounded-sm p-2 my-2 block"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
}
