'use client';
import { useContext, useState } from "react";
import UserInfo from "@/components/UserInfo";
import UserTabs from "@/components/UserTabs";
import EventList from "@/components/EventList";
import { UserContext } from "@/context/UserContext";
import { uploadUserProfilePic } from "@/api/api";

const MyProfilePage = () => {
  const { user, updateProfilePic, hostedEvents, attendingEvents, interestedEvents } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState<"hosting" | "rsvps" | "interested">("hosting");
  
  // Example usage in a React component
const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files?.length && user) {
    try {
      const result = await uploadUserProfilePic(user.id, files[0]); // where '123' is the userId
      if (result.success) {
        console.log('Profile picture updated:', result);
        updateProfilePic(result.profilePicUrl)
        // Update UI or state here
      } else {
        console.error('Failed to upload:', result.message);
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  }
};

  if (!user) return <div>Loading...</div>;

  return (
    <div className="w-full p-4 border-primary">
      <h1>My Profile</h1>

      <UserInfo user={user} isOwnProfile handleProfilePicChange={handleProfilePicChange} />

      <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <EventList
        events={activeTab === "hosting" ? hostedEvents : activeTab === "rsvps" ? attendingEvents : interestedEvents}
        emptyMessage={`No ${activeTab} events`}
      />
    </div>
  );
};

export default MyProfilePage;
