"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { getEvents } from "@/api/api";
import { Event } from "../../../../../shared-types";

interface EventsContextType {
  events: Event[];
  loading: boolean;
  refreshEvents: () => Promise<void>;
}

export const EventsContext = createContext<EventsContextType>({
  events: [],
  loading: true,
  refreshEvents: async () => {},
});

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error("❌ Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events, loading, refreshEvents: fetchEvents }}>
      {children}
    </EventsContext.Provider>
  );
};
