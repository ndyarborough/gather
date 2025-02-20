"use client";

import { useEffect, useState } from "react";
import { Event } from "../../../../shared-types";
import EventCard from "@/components/EventCard";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        const parsedEvents = data.map((event: Event) => ({
          ...event,
          id: Number(event.id),
          hostId: Number(event.hostId),
        }));

        setEvents(parsedEvents);
      } catch (err) {
        setError("Failed to fetch events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border-2 border-primary w-full p-4">
      <h1>All Events</h1>
      <div className="events-list grid grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
