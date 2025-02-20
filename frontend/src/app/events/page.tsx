"use client";

import { FC, useEffect, useState } from "react";
import { Event } from "../../../../shared-types";
import EventCard from "@/components/EventCard";
import { getEvents } from "@/api/api";

interface EventsProps {
  handleInterested: (eventId: string) => void;
  handleRSVP: (eventId: string) => void
}

const Events: FC<EventsProps> = ({handleInterested, handleRSVP}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
      setLoading(false)
    }

    fetchEvents();
  }, [])
  
  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border-2 border-primary w-full p-4">
      <h1>All Events</h1>
      <div className="events-list grid grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard handleInterested={handleInterested} handleRSVP={handleRSVP} key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Events;