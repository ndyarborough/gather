"use client";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import Dashboard from "./dashboard/page"; // Import Dashboard

export default function Page() {
  const { user } = useContext(UserContext); // ✅ Get user from context

  return (
    <div className="app p-4 md:px-10 lg:px-20 xl:px-40 2xl:px-80 space-y-4">
      {user ? <Dashboard /> : <>
        <CreateUser />
        <Login />
      </>}
    </div>
  );
}
