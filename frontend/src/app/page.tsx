"use client" 

import { useState, useEffect } from "react";
import CreateEvent from "./components/CreateEvent";
import CreateUser from "./components/CreateUser";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Events from "./components/Events";
import Inbox from "./components/Inbox";
import SendMessage from "./components/SendMessage";

export default function Page() {
  const [user, setUser] = useState<any>(null);  // Use `any` or a defined type for `user`
  const [receiver, setReceiver] = useState<any>(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSetUser = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
  };

  return (
    <div className="app flex flex-row gap-4 bg-secondary-color min-h-screen text-secondary-color w-screen p-8">
      <CreateEvent user={user} />
      <CreateUser />
      <Profile user={user} setUser={handleSetUser} />
      <Events userId={user?.userId || null} />
      <Inbox setReceiver={setReceiver} userId={user?.userId || null} />
      {!user && <Login setUser={handleSetUser} />}
      
      {/* Only show SendMessage if receiver is selected */}
      {receiver && <SendMessage receiver={receiver} userId={user?.userId || null} />}
    </div>
  );
}
