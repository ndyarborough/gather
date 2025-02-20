import { FC, useContext } from "react";
import Image from "next/image";
import { Event } from "../../../shared-types";
import { UserContext } from "@/context/UserContext";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const { user } = useContext(UserContext); // Get the logged-in user

  const handleInterested = async () => {
    console.log("Interested clicked");
    if (!user) {
      console.log("You must be logged in to mark interest.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/events/${event.id}/interest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) throw new Error("Failed to mark interest");

      console.log("Marked as interested!");
    } catch (error) {
      console.error("Error marking interest:", error);
      console.log("Failed to mark interest.");
    }
  };

  const handleRSVP = async () => {
    console.log("RSVP clicked");
    if (!user) {
      console.log("You must be logged in to RSVP.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/events/${event.id}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) throw new Error("Failed to RSVP");

      console.log("RSVP confirmed!");
    } catch (error) {
      console.error("Error RSVPing:", error);
      console.log("Failed to RSVP.");
    }
  };

  return (
    <div className="event-card flex flex-col justify-between my-8 border-2 bg-primary opacity-95 border-primary rounded-sm">
      {event.image && (
        <Image
          src={`http://localhost:3001/${event.image}`}
          width={200}
          height={350}
          alt={event.name}
          className="event-image w-full object-cover h-80"
        />
      )}
      <div className="p-2 truncate">
        <h2>{event.name}</h2>
        <p>{event.description}</p>
        <p>{new Date(event.date).toLocaleDateString()}</p>
        <p>
          {new Date(event.startTime).toLocaleTimeString()} -{" "}
          {new Date(event.endTime).toLocaleTimeString()}
        </p>
      </div>
      <div className="button-row flex flex-row divide-primary divide-x border-t-1">
        <button className="w-full p-2" onClick={handleInterested}>
          Interested
        </button>
        <button className="w-full p-2" onClick={handleRSVP}>
          RSVP
        </button>
        <button className="w-full p-2">Details</button>
      </div>
    </div>
  );
};

export default EventCard;
