"use client";

import { useState } from "react";
import CreateEvent from "./components/CreateEvent";
import CreateUser from "./components/CreateUser";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Events from "./components/Events";

export default function Page() {
  const [user, setUser] = useState(null);

  return (
    <div className="app flex flex-row gap-4 bg-secondary-color min-h-screen text-secondary-color w-screen p-8">
      <CreateEvent user={user} />
      <CreateUser />
      <Login setUser={setUser} />
      <Profile user={user} />
      <Events />
    </div>
  );
}