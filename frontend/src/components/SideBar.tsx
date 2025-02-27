"use client";

import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import Link from "next/link";

const SideBar = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/"); // Redirect to home or login page
  };

  return (
    <div className="w-64 p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard/profile" className="block cursor-pointer hover:underline">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/dashboard/messages" className="block cursor-pointer hover:underline">
            Messages
          </Link>
        </li>
        <li>
          <Link href="/dashboard/events/create" className="block cursor-pointer hover:underline">
            Create Event
          </Link>
        </li>
        <li>
          <Link href="/dashboard/events" className="block cursor-pointer hover:underline">
            Events
          </Link>
        </li>
      </ul>

      <button className="btn mt-4 w-full" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
};

export default SideBar;
