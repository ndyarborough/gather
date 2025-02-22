"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import SideBar from "@/components/SideBar";
import Profile from "../profile/page";
import Inbox from "../inbox/page";
import CreateEvent from "../../components/CreateEvent";
import Events from "../events/page";
import SendMessage from "../../components/SendMessage";

import { Event, SafeUser } from "../../../../shared-types";
import {
  changeInterest,
  changeRSVP,
  findEventById,
  getUserEventIds,
} from "@/api/api";
import ViewProfile from "@/components/ViewProfile";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [hostedEvents, setHostedEvents] = useState<Event[]>([]);
  const [attendingEvents, setAttendingEvents] = useState<Event[]>([]);
  const [interestedEvents, setInterestedEvents] = useState<Event[]>([]);
  const [profileId, setProfileId] = useState<string>('');
  if (!user) {
    throw new Error(
      "useContext(UserContext) must be used within a UserProvider"
    );
  }

  const [activePage, setActivePage] = useState<
    "Profile" | "Inbox" | "CreateEvent" | "Events" | "SendMessage" | "ViewProfile"
  >("Profile");
  const [selectedReceiver, setSelectedReceiver] = useState<SafeUser | null>(
    null
  );

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user) return;
      try {
        const hostedEventData = await getUserEventIds(user.id);

        const { events, interests, rsvps } = hostedEventData;

        // Fetch full event objects
        const [hosted, attending, interested] = await Promise.all([
          Promise.all(events.map(findEventById)),
          Promise.all(rsvps.map(findEventById)),
          Promise.all(interests.map(findEventById)),
        ]);
        setHostedEvents(hosted);
        setAttendingEvents(attending);
        setInterestedEvents(interested);
      } catch (error) {
        console.error("❌ Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, [user]);

  const handleViewProfile = (userId: string) => {
    console.log('handling view profile: ', userId)
    setProfileId(userId);
    setActivePage('ViewProfile');
  }

  const handleThreadClick = (receiver: SafeUser) => {
    setSelectedReceiver(receiver);
    setActivePage("SendMessage");
  };

  const handleInterested = async (eventId: string) => {
    if (!user) return;
    const updatedInterests = await changeInterest(user.id, eventId);
    console.log(updatedInterests.interestedEvents)
    if (updatedInterests) {
      setInterestedEvents(updatedInterests.interestedEvents);
      setAttendingEvents(updatedInterests.attendingEvents);
    }
  };

  const handleRSVP = async (eventId: string) => {
    if (!user) return;
    const updatedRSVPs = await changeRSVP(user.id, eventId);
    if (updatedRSVPs) {
      setInterestedEvents(updatedRSVPs.interestedEvents);
      setAttendingEvents(updatedRSVPs.attendingEvents);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "Profile":
        return (
          <Profile
            handleViewProfile={handleViewProfile}
            hostedEvents={hostedEvents}
            attendingEvents={attendingEvents}
            interestedEvents={interestedEvents}
            handleInterested={handleInterested}
            handleRSVP={handleRSVP}
            setActivePage={setActivePage}
            setSelectedReceiver={setSelectedReceiver}
          />
        );
      case "Inbox":
        return <Inbox onThreadClick={handleThreadClick} />;
      case "CreateEvent":
        return <CreateEvent />;
      case "Events":
        return (
          <Events handleViewProfile={handleViewProfile} handleInterested={handleInterested} handleRSVP={handleRSVP} />
        );
      case "SendMessage":
        return selectedReceiver && user?.id ? (
          <SendMessage id={user.id} receiver={selectedReceiver} />
        ) : (
          <Inbox onThreadClick={handleThreadClick} />
        );
      case "ViewProfile":
        return <ViewProfile handleThreadClick={handleThreadClick} profileId={profileId} setActivePage={setActivePage} setSelectedReceiver={setSelectedReceiver} />
      default:
        return (
          <Profile
            handleViewProfile={handleViewProfile}
            hostedEvents={hostedEvents}
            attendingEvents={attendingEvents}
            interestedEvents={interestedEvents}
            handleInterested={handleInterested}
            handleRSVP={handleRSVP}
            setActivePage={setActivePage}
            setSelectedReceiver={setSelectedReceiver}
          />
        );
    }
  };

  return (
    <div className="flex min-h-[90dvh]s justify-between">
      <div className="w-fit">
        <SideBar setActivePage={setActivePage} />
      </div>
      <main className="flex w-[80%]">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
