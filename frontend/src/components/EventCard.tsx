import { FC, useContext } from "react";
import Image from "next/image";
import { Event } from "../../../shared-types";
import { UserContext } from "@/context/UserContext";
import { formatTime } from "@/utils";
import Details from '../imgs/details.png';
import RSVP from '../imgs/rsvp.png';
import Heart from '../imgs/heart.png';
import FilledHeart from '../imgs/filled_heart.png';

interface EventCardProps {
  event: Event;
  handleViewProfile: (userId: string) => void;
}

const EventCard: FC<EventCardProps> = ({ event, handleViewProfile }) => {
  const { user, handleInterested, handleAttending } = useContext(UserContext);
  if (!event || !user) return;
  const isUserInterested = event.interested?.some(
    (interestedUser) => user.id === interestedUser.id
  );
  const isUserAttending = event.attendees?.some(
    (attendee) => user.id === attendee.id
  );
  // Check if the user is already interested or RSVP'd
  return (
    <div className="event-card flex flex-col justify-between my-8 shadow-md shadow-primary rounded-xl overflow-clip">
      <div className="flex flex-row justify-between">
        <div
          className="flex flex-row items-center gap-1 p-1"
          onClick={() => handleViewProfile(event.host.id)}
        >
          <Image
            className="rounded-full size-8 object-cover"
            src={`http://localhost:3001/${event.host.profilePic}`}
            width={40}
            height={40}
            alt="profile pic"
          />
          <h2>{event.host.fullName}</h2>
        </div>
        <button className="p-2"><Image src={Details} alt="details" width={40} height={40} className="size-5"/></button>
      </div>
      {event.image && (
        <Image
          src={`http://localhost:3001/${event.image}`}
          width={200}
          height={350}
          alt={event.name}
          className="event-image w-full object-cover h-40"
        />
      )}
      <div className="p-2 truncate">
        <h2>{event.name}</h2>
        <p>{event.description}</p>
        <p>{new Date(event.date).toLocaleDateString()}</p>
        <p>
          {formatTime(event.startTime)} - {formatTime(event.endTime)}
        </p>
      </div>
      <div className="button-row flex flex-row justify-between">
        <button
          className="p-2"
          onClick={() => handleInterested(event.id)}
        >
          {isUserInterested
            ? <Image src={FilledHeart} alt='remove from interested' width={40} height={40} className="size-5"/>
            : <Image src={Heart} alt='Interested' width={40} height={40} className="size-5"/>}
        </button>
        <button
          className="p-2"
          onClick={() => handleAttending(event.id)}
        >
          {isUserAttending ? "❌ Cancel RSVP" : <Image src={RSVP} alt='rsvp' width={40} height={40} className="size-5"/>}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
