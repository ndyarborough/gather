import { FC } from "react";
import EventCard from "@/components/EventCard";
import { Event } from "../../../shared-types";

interface EventListProps {
  events: Event[];
  handleViewProfile: (userId: string) => void;
  handleInterested: (eventId: string) => void;
  handleRSVP: (eventId: string) => void;
  emptyMessage: string;
}

const EventList: FC<EventListProps> = ({ events, handleViewProfile, handleInterested, handleRSVP, emptyMessage }) => {
  return (
    <div className="event-display min-h-50 p-4">
      {events.length ? (
        events.map((event) => (
          <EventCard
            key={event.id || `${event.name}-${crypto.randomUUID()}`}
            event={event}
            handleViewProfile={handleViewProfile}
            handleInterested={handleInterested}
            handleRSVP={handleRSVP}
          />
        ))
      ) : (
        <p>{emptyMessage}</p>
      )}
    </div>
  );
};

export default EventList;
