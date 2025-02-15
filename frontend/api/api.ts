import { Message } from "../../shared-types";

const API_URL = "http://localhost:3001/api"

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
        console.log(error)
        return {message: `Incorrect Username/Password`};
      }    
} 

export const getThreadsForUser = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/messages/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch messages");

    const messages: Message[] = await response.json();

    // Map to store messages grouped by participantId
    const threadsMap = new Map<string, Message[]>();

    messages.forEach((message) => {
      const participant = message.senderId === userId ? message.receiver : message.sender;

      if (!threadsMap.has(participant.id)) {
        threadsMap.set(participant.id, []);
      }
      threadsMap.get(participant.id)?.push(message);
    });

    // Convert map to an array of thread objects
    return Array.from(threadsMap.entries()).map(([participantId, messages]) => {
      const sortedMessages = messages.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return {
        id: participantId,
        participant: {
          id: sortedMessages[0].senderId === userId ? sortedMessages[0].receiver.id : sortedMessages[0].sender.id,
          email: sortedMessages[0].senderId === userId ? sortedMessages[0].receiver.email : sortedMessages[0].sender.email,
          fullName: sortedMessages[0].senderId === userId ? sortedMessages[0].receiver.fullName : sortedMessages[0].sender.fullName,
          profilePic: sortedMessages[0].senderId === userId ? sortedMessages[0].receiver.profilePic : sortedMessages[0].sender.profilePic,
        },
        messages: sortedMessages, // Full conversation in descending order
      };
    });
  } catch (error) {
    console.error("Error fetching user threads:", error);
    return [];
  }
};