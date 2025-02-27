'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import UserInfo from "@/components/UserInfo";
// import UserTabs from "@/components/UserTabs";
// import EventList from "@/components/EventList";
// import Link from "next/link";
import { SafeUser } from "../../../../../../shared-types";
import { getUserById } from "@/api/api";

const ProfilePage = () => {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure userId is always a string

  const [user, setUser] = useState<SafeUser | null>(null);
  // const [hostedEvents, setHostedEvents] = useState<Event[]>([]);
  // const [attendingEvents, setAttendingEvents] = useState<Event[]>([]);
  // const [interestedEvents, setInterestedEvents] = useState<Event[]>([]);
  // const [activeTab, setActiveTab] = useState<"hosting" | "rsvps" | "interested">("hosting");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserById(userId);
        console.log("Fetched User Data:", data);

        if (data) {
          setUser(data);
          // setHostedEvents(data.hostedEvents);
          // setAttendingEvents(data.attendingEvents);
          // setInterestedEvents(data.interestedEvents);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Profile not found</div>;

  return (
    <div className="w-full p-4 border-primary">
      <h1>View Profile</h1>

      <UserInfo user={user} isOwnProfile={false} />
      {/* <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}

      {/* <EventList
        events={activeTab === "hosting" ? hostedEvents : activeTab === "rsvps" ? attendingEvents : interestedEvents}
        emptyMessage={`No ${activeTab} events`}
      /> */}
    </div>
  );
};

export default ProfilePage;
