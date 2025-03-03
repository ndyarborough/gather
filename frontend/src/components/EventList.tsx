import { FC } from "react";
import EventCard from "@/components/EventCard";
import { Event } from "../../../shared-types";

interface EventListProps {
  events: Event[];
  emptyMessage: string;
}

const EventList: FC<EventListProps> = ({ events, emptyMessage }) => {
  if(!events) return;  
  return (
    <div className="event-display grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 min-h-50 py-4">
      {events.length ? (
        events.map((event) => (
          <EventCard
            key={event.id || `${event.name}-${crypto.randomUUID()}`}
            event={event}
          />
        ))
      ) : (
        <p>{emptyMessage}</p>
      )}
    </div>
  );
};

export default EventList;
