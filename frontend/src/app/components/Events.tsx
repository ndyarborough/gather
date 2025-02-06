"use client";

import { useEffect, useState } from "react";

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

interface UserProps {
  userId: number;
}

export default function Events({userId}: UserProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
  
        const data = await response.json();
        // Convert IDs to numbers
        const parsedEvents = data.map((event: any) => ({
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
  


  const handleSayHi = async (senderId: number, receiverId: number, eventId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/messages/hi/${senderId}/${receiverId}/${eventId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, receiverId, eventId }),
      });

      if (!response.ok) throw new Error("Failed to send message");
      alert("Message sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border-2 border-primary-color w-fit p-4">
      <h1>All Events</h1>
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card my-8 border-2 border-primary-color p-4 rounded">
            {event.image && <img src={`http://localhost:3001/${event.image}`} alt={event.name} className="event-image w-60" />}
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Start Time:</strong> {new Date(event.startTime).toLocaleTimeString()}</p>
            <p><strong>End Time:</strong> {new Date(event.endTime).toLocaleTimeString()}</p>
            <p><strong>Host ID:</strong> {event.hostId}</p>
            <button
              onClick={() => handleSayHi(userId, event.hostId, event.id)}
              className="btn"
            >
              Say Hi
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
