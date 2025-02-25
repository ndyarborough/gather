
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import SideBar from "@/components/SideBar";
import Profile from "../profile/page";
import Inbox from "../inbox/page";
import CreateEvent from "../../components/CreateEvent";
import Events from "../events/page";
import SendMessage from "../../components/SendMessage";

import { SafeUser, Event } from "../../../../shared-types";
import ViewProfile from "@/components/ViewProfile";
import EventDetails from "@/components/EventDetails";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [profileId, setProfileId] = useState<string>("");
  const [currentEventDetails, setCurrentEventDetails] = useState<Event | null>(null)  
  if (!user) {
    throw new Error(
      "useContext(UserContext) must be used within a UserProvider"
    );
  }

  const [activePage, setActivePage] = useState<
    | "Profile"
    | "Inbox"
    | "CreateEvent"
    | "Events"
    | "SendMessage"
    | "ViewProfile"
    | "EventDetails"
  >("Profile");
  const [selectedReceiver, setSelectedReceiver] = useState<SafeUser | null>(
    null
  );

  const handleViewProfile = (userId: string) => {
    setProfileId(userId);
    setActivePage("ViewProfile");
  };

  const handleViewEventDetails = (event: Event) => {
    setActivePage("EventDetails");
    setCurrentEventDetails(event)
  };

  const handleThreadClick = (receiver: SafeUser) => {
    setSelectedReceiver(receiver);
    setActivePage("SendMessage");
  };

  const renderContent = () => {
    switch (activePage) {
      case "Profile":
        return (
          <Profile
            handleViewProfile={handleViewProfile}
            setActivePage={setActivePage}
            setSelectedReceiver={setSelectedReceiver}
          />
        );
      case "Inbox":
        return <Inbox onThreadClick={handleThreadClick} />;
      case "CreateEvent":
        return <CreateEvent />;
      case "Events":
        return <Events handleViewProfile={handleViewProfile} handleViewEventDetails={handleViewEventDetails} setActivePage={setActivePage}/>;
      case "SendMessage":
        return selectedReceiver && user?.id ? (
          <SendMessage id={user.id} receiver={selectedReceiver} />
        ) : (
          <Inbox onThreadClick={handleThreadClick} />
        );
      case "ViewProfile":
        return (
          <ViewProfile
            handleThreadClick={handleThreadClick}
            profileId={profileId}
            setActivePage={setActivePage}
            setSelectedReceiver={setSelectedReceiver}
          />
        );
      case "EventDetails":
        if(!currentEventDetails) return;
        return(
          <EventDetails event={currentEventDetails} />
        )
      default:
        return (
          <Profile
            handleViewProfile={handleViewProfile}
            setActivePage={setActivePage}
            setSelectedReceiver={setSelectedReceiver}
          />
        );
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
