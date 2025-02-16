"use client";

import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import SideBar from "@/components/SideBar";
import Profile from "../profile/page";
import Inbox from "../inbox/page";
import CreateEvent from "../../components/CreateEvent";
import Events from "../events/page";
import SendMessage from "../../components/SendMessage";
import { SafeUser } from "../../../../shared-types";

const Dashboard = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error(
      "useContext(UserContext) must be used within a UserProvider"
    );
  }

  const [activePage, setActivePage] = useState<
    "Profile" | "Inbox" | "CreateEvent" | "Events" | "SendMessage"
  >("Profile");
  const [selectedReceiver, setSelectedReceiver] = useState<SafeUser | null>(
    null
  );

  const handleThreadClick = (receiver: SafeUser) => {
    setSelectedReceiver(receiver);
    setActivePage("SendMessage");
  };

  const renderContent = () => {
    switch (activePage) {
      case "Profile":
        return <Profile />;
      case "Inbox":
        return <Inbox onThreadClick={handleThreadClick} />;
      case "CreateEvent":
        return <CreateEvent />;
      case "Events":
        return <Events />;
      case "SendMessage":
        return selectedReceiver && userContext.user?.id ? (
          <SendMessage id={userContext.user.id} receiver={selectedReceiver} />
        ) : (
          <Inbox onThreadClick={handleThreadClick} />
        );
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex min-h-[90dvh] justify-between">
      <div className="w-fit">
        <SideBar setActivePage={setActivePage} />
      </div>
      <main className="flex w-[80%]">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
