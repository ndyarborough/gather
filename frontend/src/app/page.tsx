"use client";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import Dashboard from "./dashboard/page"; // Import Dashboard

export default function Page() {
  const { user } = useContext(UserContext); // ✅ Get user from context

  return (
    <div className="app p-4">
      {user ? <Dashboard /> : <>
        <CreateUser />
        <Login />
      </>}
    </div>
  );
}
