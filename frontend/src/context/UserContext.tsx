"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { SafeUser, Event } from "../../../shared-types";
import { changeInterest, changeRSVP, findEventById, getUserEventIds } from "@/api/api";
import { ToastContext } from "./ToastContext";
import { EventsContext } from "./EventsContext";

interface UserContextType {
  user: SafeUser | null;
  setUser: React.Dispatch<React.SetStateAction<SafeUser | null>>;
  hostedEvents: Event[];
  attendingEvents: Event[];
  handleAttending: (eventId: string) => void;
  interestedEvents: Event[];
  handleInterested: (eventId: string) => void;
  updateProfilePic: (profilePic: string) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  hostedEvents: [],
  attendingEvents: [],
  handleAttending: () => {},
  interestedEvents: [],
  handleInterested: () => {},
  updateProfilePic: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { refreshEvents } = useContext(EventsContext); // Get refreshEvents
  const [user, setUser] = useState<SafeUser | null>(null);
  const [hostedEvents, setHostedEvents] = useState<Event[]>([]);
  const [attendingEvents, setAttendingEvents] = useState<Event[]>([]);
  const [interestedEvents, setInterestedEvents] = useState<Event[]>([]);

  const toast = useContext(ToastContext);

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user) return;
      try {
        const hostedEventData = await getUserEventIds(user.id);
        const { events, interests, rsvps } = hostedEventData;

        const [hosted, attending, interested] = await Promise.all([
          Promise.all(events.map(findEventById)),
          Promise.all(rsvps.map(findEventById)),
          Promise.all(interests.map(findEventById)),
        ]);

        setHostedEvents(hosted);
        setAttendingEvents(attending);
        setInterestedEvents(interested);
      } catch (error) {
        console.error("❌ Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, [user]);



  const handleSetUser = (userData: SafeUser | null | ((prevUser: SafeUser | null) => SafeUser | null)) => {
    setUser((prevUser) => {
      const newUser = typeof userData === "function" ? userData(prevUser) : userData;
      if (newUser) {
        // localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        // localStorage.removeItem("user");
      }
      return newUser;
    });
  };

  const handleInterested = async (eventId: string) => {
    if (!user) return;
    try {
      const updatedUser = await changeInterest(user.id, eventId);
      if (updatedUser) {
        setUser((prev) => prev ? { ...prev, interestedEvents: updatedUser.interestedEvents } : prev);
        await refreshEvents(); // Refresh events after updating interest
        toast?.setToast('updated interested!', 'success')
      }
    } catch (error) {
      console.error("❌ Error updating interested events:", error);
    }
  };

  const handleAttending = async (eventId: string) => {
    if (!user) return;
    try {
      const updatedUser = await changeRSVP(user.id, eventId);
      if (updatedUser) {
        setUser((prev) => prev ? { ...prev, attendingEvents: updatedUser.attendingEvents } : prev);
        await refreshEvents(); // Refresh events after updating RSVP
      }
    } catch (error) {
      console.error("❌ Error updating RSVPs:", error);
    }
  };

  const updateProfilePic = (profilePic: string) => {
    setUser((prev) => prev ? { ...prev, profilePic } : null);
    console.log('i am her')
  };
  
  

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, updateProfilePic, hostedEvents, interestedEvents, attendingEvents, handleInterested, handleAttending }}>
      {children}
    </UserContext.Provider>
  );
};