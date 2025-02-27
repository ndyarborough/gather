import { getThreads } from "@/utils";

const API_URL = "http://localhost:3001/api";

interface SafeUser {
  id: string;
  email: string;
  fullName: string;
  profilePic?: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  eventId?: string;
  sender: SafeUser;
  receiver: SafeUser;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Invalid credentials");

    const data = await response.json();
    return data;
  } catch (error) {
    return { message: `Incorrect Username/Password: ${error}` };
  }
};

export const getThreadsForUser = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/messages/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch messages");

    const messages: Message[] = await response.json();
    return getThreads(messages, userId);
  } catch (error) {
    console.error("Error fetching user threads:", error);
    return [];
  }
};

export const changeInterest = async (userId: string, eventId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/privateData`);
  const data = await response.json();
  const isInterested = await data.interests.includes(eventId.toString());

  if (isInterested) {
    // remove from interested list
    const res = await fetch(
      `${API_URL}/events/${eventId}/uninterest/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  } else {
    // add to interested list
    const res = await fetch(`${API_URL}/events/${eventId}/interest/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }
};

export const changeRSVP = async (userId: string, eventId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/privateData`);
  const data = await response.json();
  const isAttending = await data.rsvps.includes(eventId.toString());

  if (isAttending) {
    // remove from Attending list
    const res = await fetch(`${API_URL}/events/${eventId}/unrsvp/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } else {
    // add to Attending list
    const res = await fetch(`${API_URL}/events/${eventId}/rsvp/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }
};

export const getEvents = async () => {
  const response = await fetch(`${API_URL}/events/`);
  const data = await response.json();
  return data;
}

export const getUserEventIds = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/privateData`);
  const data = await response.json();
  return data;
}

export const findEventById = async (eventId: string) => {
  const response = await fetch(`${API_URL}/events/${eventId}`);
  const data = await response.json();
  return data;
}

export const getUserById = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  const data = await response.json();
  return data;
}

export const getMessageHistory = async (senderId: string, receiverId: string) => {
  const response = await fetch(`${API_URL}/messages/${senderId}/${receiverId}`);
  return response;
}

export const getUserInterests = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/interested/${userId}`);
  const data = response.json();
  return data;
}

export const getUserRsvps = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/rsvps/${userId}`);
  const data = response.json();
  return data;
}

export const uploadUserProfilePic = async (userId: string, file: File) => {
  const formData = new FormData();
  formData.append('profilePic', file);

  const response = await fetch(`${API_URL}/users/${userId}/uploadProfilePic`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data;
}