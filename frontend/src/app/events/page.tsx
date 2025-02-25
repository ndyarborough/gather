
import { FC, useContext } from "react";
import EventList from "@/components/EventList";
import { EventsContext } from "./context/EventsContext";
import { Event } from "../../../../shared-types";

interface EventsProps {
  handleViewProfile: (userId: string) => void;
  handleViewEventDetails: (event: Event) => void;
  setActivePage: (page: "Profile" | "Inbox" | "CreateEvent" | "Events" | 'SendMessage' ) => void;
}

const Events: FC<EventsProps> = ({ handleViewProfile, handleViewEventDetails, setActivePage }) => {
  const { events, loading } = useContext(EventsContext);

  if (loading) return <p>Loading events...</p>;
  const handleCreateEvent = () => {
    setActivePage('CreateEvent');
  }
  return (
    <div className="w-full p-4">
      <h1>All Events</h1>
      <button className="btn" onClick={handleCreateEvent}>Host New Event</button>
      <div className="events-list gap-4">
        <EventList 
          events={events} 
          handleViewProfile={handleViewProfile}
          handleViewEventDetails={handleViewEventDetails}
          emptyMessage="No events"
        />
      </div>
    </div>
  );
};

export default Events;
