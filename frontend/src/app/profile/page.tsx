import { useContext, useState, FC } from "react";
import { UserContext } from "../../context/UserContext";
import Image from "next/image";
import EventCard from "@/components/EventCard";
import { Event } from "../../../../shared-types";

interface ProfileProps {
  handleInterested: (eventId: string) => void;
  handleRSVP: (eventId: string) => void;
  hostedEvents: Event[];
  attendingEvents: Event[];
  interestedEvents: Event[];
}

const Profile: FC<ProfileProps> = ({handleInterested, handleRSVP, hostedEvents, attendingEvents, interestedEvents}) => {
  const { user, setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState<"hosting" | "rsvps" | "interested">("hosting");

  // Fetch event details for Hosting, RSVPs, and Interested events  
  const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
        setUser(prevUser => prevUser && { ...prevUser, profilePic: data.profilePicUrl });
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  if (!user) return <div className="border-2 border-primary p-4">Not logged in</div>;

  return (
    <div className="bg-primary border-2 w-full border-primary p-4">
      <h1>My Profile</h1>
      <div className="p-10 flex flex-row gap-4">
        {user.profilePic !== "/uploads/undefined" ? (
          <Image
            src={`http://localhost:3001/${user.profilePic}`}
            alt="Profile Picture"
            width={200}
            height={200}
            className="w-50 h-50 rounded-full cursor-pointer object-cover"
            onClick={() => document.getElementById("profilePicInput")?.click()}
          />
        ) : (
          <p>No profile picture</p>
        )}
        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePicChange}
        />
        <div className="space-y-1">
          <p>{user.fullName}</p>
          <p>{user.email}</p>
        </div>
      </div>

      {/* Tabs for Hosting, RSVPs, Interested */}
      <div className="user-events w-full mx-auto max-w-[800px] border-1 rounded-lg overflow-hidden">
        <div className="divide-x flex flex-row border-b-1">
          <button
            className={`w-full p-2 ${activeTab === "hosting" ? "bg-gray-300" : ""}`}
            onClick={() => setActiveTab("hosting")}
          >
            Hosting
          </button>
          <button
            className={`w-full p-2 ${activeTab === "rsvps" ? "bg-gray-300" : ""}`}
            onClick={() => setActiveTab("rsvps")}
          >
            RSVPs
          </button>
          <button
            className={`w-full p-2 ${activeTab === "interested" ? "bg-gray-300" : ""}`}
            onClick={() => setActiveTab("interested")}
          >
            Interested
          </button>
        </div>

       {/* Display Events Based on Active Tab */}
<div className="event-display min-h-50 p-4">
  {activeTab === "hosting" &&
    (hostedEvents.length ? (
      hostedEvents.map((event) => (
        <EventCard handleInterested={handleInterested} handleRSVP={handleRSVP} key={event.id || `${event.name}-${crypto.randomUUID()}`} event={event} />
      ))
    ) : (
      <p>No events hosted</p>
    ))}

  {activeTab === "rsvps" &&
    (attendingEvents.length ? (
      attendingEvents.map((event) => (
        <EventCard handleInterested={handleInterested} handleRSVP={handleRSVP} key={event.id || `${event.name}-${crypto.randomUUID()}`} event={event} />
      ))
    ) : (
      <p>No RSVPs</p>
    ))}

  {activeTab === "interested" &&
    (interestedEvents.length ? (
      interestedEvents.map((event) => (
        <EventCard handleInterested={handleInterested} handleRSVP={handleRSVP} key={event.id || `${event.name}-${crypto.randomUUID()}`} event={event} />
      ))
    ) : (
      <p>No interested events</p>
    ))}
</div>

      </div>
    </div>
  );
}

export default Profile;