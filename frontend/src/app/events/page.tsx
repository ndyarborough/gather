"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { UserContext } from "../../context/UserContext";
import { Event } from "../../../../shared-types";

export default function Events() {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(user)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        // Convert IDs to numbers
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
    <div className="border-2 border-primary-color w-full p-4">
      <h1>All Events</h1>
      <div className="events-list grid grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="event-card my-8 border-2 bg-primary-color opacity-95 border-primary-color rounded">
            {event.image && (
              <Image
                src={`http://localhost:3001/${event.image}`}
                width={200}
                height={350}
                alt={event.name}
                className="event-image w-60"
              />
            )}
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Start Time:</strong> {new Date(event.startTime).toLocaleTimeString()}
            </p>
            <p>
              <strong>End Time:</strong> {new Date(event.endTime).toLocaleTimeString()}
            </p>
            <p>
              <strong>Host ID:</strong> {event.hostId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
