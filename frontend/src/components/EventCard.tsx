import { FC } from "react";
import Image from "next/image";
import { Event } from "../../../shared-types";

interface EventCardProps {
  event: Event;
  handleInterested: (eventId: string) => void;
  handleRSVP: (eventId: string) => void;
  handleViewProfile: (userId: string) => void;
}

const EventCard: FC<EventCardProps> = ({ event, handleInterested, handleRSVP, handleViewProfile }) => {

  // Check if the user is already interested or RSVP'd
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
        <div className="flex" onClick={() => handleViewProfile(event.host.id)}>
          <Image className="rounded-full size-8s" src={`http://localhost:3001/${event.host.profilePic}`} width={40} height={40} alt="profile pic" />
          <h2>{event.host.fullName}</h2>
        </div>
        <h2>{event.name}</h2>
        <p>{event.description}</p>
        <p>{new Date(event.date).toLocaleDateString()}</p>
        <p>
          {new Date(event.startTime).toLocaleTimeString()} -{" "}
          {new Date(event.endTime).toLocaleTimeString()}
        </p>
      </div>
      <div className="button-row flex flex-row divide-primary divide-x border-t-1">
        <button className="w-full p-2" onClick={() => handleInterested(event.id)}>
          Interested
        </button>
        <button className="w-full p-2" onClick={() => handleRSVP(event.id)}>
          RSVP
        </button>
        <button className="w-full p-2">Details</button>
      </div>
    </div>
  );
};

export default EventCard;
