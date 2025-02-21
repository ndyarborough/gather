import { FC, useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import UserTabs from "./UserTabs";
import EventList from "./EventList";
import { Event } from "../../../shared-types";
import { getUserById, getUserEventIds, findEventById } from "@/api/api";

interface ViewProfileProps {
  profileId: string;
}

const ViewProfile: FC<ViewProfileProps> = ({ profileId }) => {
  const [user, setUser] = useState<{ fullName: string; email: string; profilePic?: string; id: string } | null>(null);
  const [hostedEvents, setHostedEvents] = useState<Event[]>([]);
  const [attendingEvents, setAttendingEvents] = useState<Event[]>([]);
  const [interestedEvents, setInterestedEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<"hosting" | "rsvps" | "interested">("hosting");

  useEffect(() => {
    if (!profileId) return;

    const fetchProfileData = async () => {
      try {
        // Fetch user data
        const userData = await getUserById(profileId);
        console.log('sfljsdflsjdfkdsfjsdf')
        setUser(userData);

        // Fetch event IDs
        const hostedEventData = await getUserEventIds(profileId);
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
        console.error("❌ Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [profileId]);

  return (
    <div className="bg-primary border-2 w-full border-primary p-4">
      <h1>View Profile</h1>
      <UserInfo user={user || null} isOwnProfile={false} />
      <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <EventList 
        events={activeTab === "hosting" ? hostedEvents : activeTab === "rsvps" ? attendingEvents : interestedEvents} 
        handleViewProfile={() => {}} 
        handleInterested={() => {}} 
        handleRSVP={() => {}} 
        emptyMessage={`No ${activeTab} events`} 
      />
    </div>
  );
};

export default ViewProfile;
