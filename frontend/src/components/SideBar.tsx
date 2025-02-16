"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const SideBar = ({
  setActivePage,
}: {
  setActivePage: (page: "Profile" | "Inbox" | "CreateEvent" | "Events") => void;
}) => {
  const { setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="w-64 shadow-md p-4 h-full">
      <div>
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li className="cursor-pointer" onClick={() => setActivePage("Profile")}>
            Profile
          </li>
          <li className="cursor-pointer" onClick={() => setActivePage("Inbox")}>
            Inbox
          </li>
          <li className="cursor-pointer" onClick={() => setActivePage("CreateEvent")}>
            Create Event
          </li>
          <li className="cursor-pointer" onClick={() => setActivePage("Events")}>
            Events
          </li>
        </ul>
      </div>

      <button className="btn mt-4 w-full" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
};

export default SideBar;
