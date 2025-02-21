"use client";

import { UserContext } from "@/context/UserContext";
import { useState, useContext } from "react";

interface EventFormData {
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  image?: File | null;
}

export default function CreateEvent() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!user) {
      console.error("You must be logged in to create an event.");
      return;
    }
  
    // Convert startTime and endTime to proper ISO strings
    const formattedStartTime = new Date(`${formData.date}T${formData.startTime}:00`).toISOString();
    const formattedEndTime = new Date(`${formData.date}T${formData.endTime}:00`).toISOString();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", new Date(formData.date).toISOString());
    formDataToSend.append("startTime", formattedStartTime);
    formDataToSend.append("endTime", formattedEndTime);
    formDataToSend.append("hostId", user.id.toString());
  
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (!response.ok) throw new Error("Failed to create event");
  
      const createdEvent = await response.json(); // Get the newly created event data
  
      return createdEvent;
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <div className="w-full p-4 border-2 border-primary">
        <h1>Create Event</h1>
      <form
        className="max-w-[700px] p-10 mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        {!user ? (
          <p className="text-red-500">
            You must be logged in to create an event.
          </p>
        ) : (
          <>
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="font-medium">
                Event Name
              </label>
              <input
                className="rounded-sm p-2 border border-gray-300"
                type="text"
                id="name"
                name="name"
                placeholder="Enter event name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="description" className="font-medium">
                Description
              </label>
              <textarea
                className="rounded-sm p-2 border h-40 border-gray-300"
                id="description"
                name="description"
                placeholder="What should people know about your event?"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="date" className="font-medium">
                Date
              </label>
              <input
                className="rounded-sm w-fit p-2 border border-gray-300"
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="startTime" className="font-medium">
                Start Time
              </label>
              <input
                className="rounded-sm w-fit p-2 border border-gray-300"
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="endTime" className="font-medium">
                End Time
              </label>
              <input
                className="rounded-sm w-fit p-2 border border-gray-300"
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="image" className="font-medium">
                Event Image (Optional)
              </label>
              <input
                className="rounded-sm p-2 border border-gray-300 w-fit"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="btn">
              Create Event
            </button>
          </>
        )}
      </form>
    </div>
  );
}
