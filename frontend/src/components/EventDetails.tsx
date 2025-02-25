import { FC, useContext } from "react";
import { Event } from "../../../shared-types";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";

interface EventDetailsProps {
  event: Event;
}

const EventDetails: FC<EventDetailsProps> = ({ event }) => {
  const { user } = useContext(UserContext);
  if (!user || ! event) return null;

  const isAttending = event.attendees.some((attendee) => attendee.id === user.id);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Event Header */}
      <div className="relative h-56 w-full rounded-xl overflow-hidden">
        <Image
          src={`http://localhost:3001/${event.image}`}
          alt={event.name}
          layout="fill"
          objectFit="cover"
          className="w-full"
        />
      </div>

      {/* Event Info */}
      <div className="mt-4">
        <h2 className="text-3xl font-bold">{event.name}</h2>
        <p className="text-gray-500">{event.description}</p>
        <p className="text-gray-600 mt-2">
          📅 {new Date(event.date).toLocaleDateString()} | ⏰{" "}
          {new Date(event.startTime).toLocaleTimeString()} -{" "}
          {new Date(event.endTime).toLocaleTimeString()}
        </p>
      </div>

      {/* Host */}
      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl mt-4">
        <Image
          src={`http://localhost:3001/${event.host.profilePic}`}
          alt={event.host.fullName}
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="font-medium">Hosted by {event.host.fullName}</p>
      </div>

      {/* Attendees */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Attendees</h3>
        <div className="flex flex-wrap mt-2 gap-3">
          {event.attendees.length > 0 ? (
            event.attendees.map((attendee) => (
              <div key={attendee.id} className="flex items-center gap-2">
                <Image
                  src={`http://localhost:3001/${attendee.profilePic}`}
                  alt={attendee.fullName}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-300"
                />
                <p>{attendee.fullName}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No attendees yet</p>
          )}
        </div>
      </div>

      {/* Interested People */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Interested</h3>
        <div className="flex flex-wrap mt-2 gap-3">
          {event.interested.length > 0 ? (
            event.interested.map((person) => {
                console.log(person)
              return (
                <div key={person.id} className="flex items-center gap-2">
                <Image
                  src={`http://localhost:3001/${person.profilePic}`}
                  alt={person.fullName}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-300"
                />
                <p>{person.fullName}</p>
              </div>
              )
})
          ) : (
            <p className="text-gray-500">No one interested yet</p>
          )}
        </div>
      </div>

      {/* RSVP Button */}
      {!isAttending && (
        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Join Event
        </button>
      )}
    </div>
  );
};

export default EventDetails;
