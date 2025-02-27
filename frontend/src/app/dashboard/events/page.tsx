'use client';
import Link from "next/link";
import { FC, useContext } from "react";
import EventList from "@/components/EventList";
import { EventsContext } from "../../../context/EventsContext";

const Events: FC = () => {
  const { events, loading } = useContext(EventsContext);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="w-full p-4">
      <h1>All Events</h1>
      <Link href="/dashboard/events/create" className="btn">
        Host New Event
      </Link>
      <div className="events-list gap-4">
        <EventList events={events} emptyMessage="No events" />
      </div>
    </div>
  );
};

export default Events;
