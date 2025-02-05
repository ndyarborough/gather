"use client";

import { useEffect, useState } from "react";

// Define a TypeScript interface for an Event
interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  image?: string | null;
  hostId: number;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from your API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events"); // Change this URL if necessary
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data); // Assuming the API returns a list of events
      } catch (err) {
        setError("Failed to fetch events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array to fetch once on page load

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="border-2 border-primary-color w-fit p-4">
      <h1>All Events</h1>
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card my-8 border-2 border-primary-color p-4 rounded">
            {event.image && <img src={event.image} alt={event.name} className="event-image" />}
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
            {/* Optional: Display the host */}
            <p>
              <strong>Host ID:</strong> {event.hostId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
