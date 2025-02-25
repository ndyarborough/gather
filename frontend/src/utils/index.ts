import { Message } from "../../../shared-types";

export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase(); // Ensures "am/pm" is lowercase
};

export const getThreads = (messages: Message[], userId: string) => {
  // Map to store messages grouped by participantId
  const threadsMap = new Map<string, Message[]>();

  messages.forEach((message) => {
    const participant =
      message.senderId === userId ? message.receiver : message.sender;

    if (!threadsMap.has(participant.id)) {
      threadsMap.set(participant.id, []);
    }
    threadsMap.get(participant.id)?.push(message);
  });

  // Convert map to an array of thread objects
  return Array.from(threadsMap.entries()).map(([participantId, messages]) => {
    const sortedMessages = messages.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return {
      id: participantId,
      participant: {
        id:
          sortedMessages[0].senderId === userId
            ? sortedMessages[0].receiver.id
            : sortedMessages[0].sender.id,
        email:
          sortedMessages[0].senderId === userId
            ? sortedMessages[0].receiver.email
            : sortedMessages[0].sender.email,
        fullName:
          sortedMessages[0].senderId === userId
            ? sortedMessages[0].receiver.fullName
            : sortedMessages[0].sender.fullName,
        profilePic:
          sortedMessages[0].senderId === userId
            ? sortedMessages[0].receiver.profilePic
            : sortedMessages[0].sender.profilePic,
      },
      messages: sortedMessages, // Full conversation in descending order
    };
  });
};
