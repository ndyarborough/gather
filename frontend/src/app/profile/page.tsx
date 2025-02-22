import { useContext, useState, FC } from "react";
import { UserContext } from "../../context/UserContext";
import { SafeUser } from "../../../../shared-types";
import UserInfo from "@/components/UserInfo";
import UserTabs from "@/components/UserTabs";
import EventList from "@/components/EventList";

interface ProfileProps {
  handleViewProfile: (userId: string) => void;
  setActivePage: (
    page: "Profile" | "Inbox" | "CreateEvent" | "Events" | "SendMessage"
  ) => void;
  setSelectedReceiver: (user: SafeUser) => void;
}

const Profile: FC<ProfileProps> = ({
  handleViewProfile,
  setActivePage,
  setSelectedReceiver,
}) => {
  const { user, setUser, hostedEvents, attendingEvents, interestedEvents } =
  useContext(UserContext);
  const [activeTab, setActiveTab] = useState<
    "hosting" | "rsvps" | "interested"
  >("hosting");

  const handleProfilePicChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    const formData = new FormData();
    formData.append("profilePic", file);
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${user.id}/uploadProfilePic`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok && data.profilePicUrl) {
        setUser(
          (prevUser) =>
            prevUser && { ...prevUser, profilePic: data.profilePicUrl }
        );
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  if (!user)
    return <div className="border-2 border-primary p-4">Not logged in</div>;

  return (
    <div className="w-full border-primary p-4">
      <h1>My Profile</h1>
      <UserInfo
        user={user}
        isOwnProfile={true}
        handleProfilePicChange={handleProfilePicChange}
        setActivePage={setActivePage}
        setSelectedReceiver={setSelectedReceiver}
      />
      <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <EventList
        events={
          activeTab === "hosting"
            ? hostedEvents
            : activeTab === "rsvps"
            ? attendingEvents
            : interestedEvents
        }
        handleViewProfile={handleViewProfile}
        emptyMessage={`No ${activeTab} events`}
      />
    </div>
  );
};

export default Profile;
