"use client";

import { useState } from "react";

interface EventFormData {
  name: string;
  description: string;
  date: string; // Date for the event
  startTime: string; // Start time
  endTime: string; // End time
  image?: File | null; // Event image
}

interface CreateEventProps {
  user: { userId: number } | null;
}

export default function CreateEvent({ user }: CreateEventProps) {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date); // Add event date
    formDataToSend.append("startTime", formData.startTime); // Add start time
    formDataToSend.append("endTime", formData.endTime); // Add end time
    formDataToSend.append("hostId", user.userId.toString()); // Add hostId behind the scenes
  
    if (formData.image) {
      formDataToSend.append("image", formData.image); // Add image
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (!response.ok) throw new Error("Failed to create event");
  
      console.log("Event created successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <form className="border-2 border-primary-color w-fit p-4" onSubmit={handleSubmit}>
      <h1>Create Event</h1>
      {!user ? (
        <p className="text-red-500">You must be logged in to create an event.</p>
      ) : (
        <>
          <input
            className="rounded p-2 my-2 block"
            type="text"
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            className="rounded p-2 my-2 block"
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            className="rounded p-2 my-2 block"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            className="rounded p-2 my-2 block"
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
          <input
            className="rounded p-2 my-2 block"
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
          <input
            className="rounded p-2 my-2 block"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="submit" className="btn">
            Create Event
          </button>
        </>
      )}
    </form>
  );
}