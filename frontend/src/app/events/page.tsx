"use client";

import { FC, useContext } from "react";
import EventList from "@/components/EventList";
import { EventsContext } from "./context/EventsContext";

interface EventsProps {
  handleViewProfile: (userId: string) => void;
}

const Events: FC<EventsProps> = ({ handleViewProfile }) => {
  const { events, loading } = useContext(EventsContext);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="w-full p-4">
      <h1>All Events</h1>
      <div className="events-list gap-4">
        <EventList 
          events={events} 
          handleViewProfile={handleViewProfile} 
          emptyMessage="No events"
        />
      </div>
    </div>
  );
};

export default Events;
