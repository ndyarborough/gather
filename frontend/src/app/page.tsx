"use client";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import Dashboard from "./dashboard/page"; // Import Dashboard

export default function Page() {
  const { user } = useContext(UserContext); // ✅ Get user from context

  return (
    <div className="app gap-4 bg-secondary-color min-h-screen text-secondary-color w-screen p-8">
      {user ? <Dashboard /> : <>
        <CreateUser />
        <Login />
      </>}
    </div>
  );
}
