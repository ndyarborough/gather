"use client";

import { useState, useEffect } from "react";
import CreateEvent from "./components/CreateEvent";
import CreateUser from "./components/CreateUser";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Events from "./components/Events";
import Inbox from "./components/Inbox";
import SendMessage from "./components/SendMessage";
import { SafeUser } from "../../../shared-types";

export default function Page() {
  const [user, setUser] = useState<SafeUser | null>(null); // Use `any` or a defined type for `user`
  const [receiver, setReceiver] = useState<SafeUser | null>(null);
  useEffect(() => {
    const checkStorage = async () => {
      const storedUser = await localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    checkStorage();
  }, []);

  const handleSetUser = (userData: SafeUser | null) => {
    console.log("setting user");
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
  };

  return (
    <div className="app flex flex-row gap-4 bg-secondary-color min-h-screen text-secondary-color w-screen p-8">
      {!user ? (
        <>
          <CreateUser />
          <Login setUser={handleSetUser} />
          <CreateUser />
        </>
      ) : (
        <>
          <CreateEvent user={user} />
          <Profile user={user} setUser={setUser} />
          <Events id={user.id} />
          <Inbox setReceiver={setReceiver} id={user.id} />
          {receiver && <SendMessage receiver={receiver} id={user.id} />}
        </>
      )}
    </div>
  );
}
