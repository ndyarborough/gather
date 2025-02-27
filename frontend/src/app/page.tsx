"use client";

import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import Dashboard from "./dashboard/page";

export default function Page() {
  const { user } = useContext(UserContext);
  const [isRegister, setIsRegister] = useState<boolean>(false)
  return (
    <div className="app p-40 md:px-10 lg:px-20 xl:px-40 2xl:px-80 space-y-4">
      {user ? (
        <Dashboard />
      ) : (
        <>
          <div className="flex">
            {isRegister ? <CreateUser /> : <Login />}
            <button onClick={() => setIsRegister((prev) => !prev)}>
              {isRegister ? 'Log in' : 'Sign up'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
