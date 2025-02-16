"use client";

import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import SideBar from "@/components/SideBar";
import Profile from "../profile/page";
import Inbox from "../inbox/page";
import CreateEvent from "../../components/CreateEvent";
import Events from "../events/page";

const Dashboard = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useContext(UserContext) must be used within a UserProvider");
  }

  const [activePage, setActivePage] = useState<"Profile" | "Inbox" | "CreateEvent" | "Events">("Profile");

  const renderContent = () => {
    switch (activePage) {
      case "Profile":
        return <Profile />;
      case "Inbox":
        return <Inbox />;
      case "CreateEvent":
        return <CreateEvent />;
      case "Events":
        return <Events />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-between">
    <div className="w-fit">
    <SideBar setActivePage={setActivePage} />
    </div>
      <main className="flex w-[80%]">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
