"use client"

import { useEffect, useState } from "react";

interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
}

interface Thread {
    id: string;
    participantId: string;
    mostRecentMessage: Message;
}

const Inbox = ({ setReceiver, userId }: { userId: string; setReceiver: (receiver: { id: string; name: string }) => void }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [noMessages, setNoMessages] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const groupMessages = (messages: Message[]): Thread[] => {
      const threadsMap: { [key: string]: Message[] } = {};
  
      messages.forEach((message) => {
        if (message.senderId === userId || message.receiverId === userId) {
          const participantId = message.senderId === userId ? message.receiverId : message.senderId;
  
          if (!threadsMap[participantId]) {
            threadsMap[participantId] = [];
          }
          threadsMap[participantId].push(message);
        }
      });
  
      return Object.entries(threadsMap).map(([participantId, messages]) => {
        const mostRecentMessage = messages.reduce((latest, current) => {
          return new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current;
        });
        return {
          id: participantId,
          participantId,
          mostRecentMessage,
        };
      });
    };

    fetch(`http://localhost:3001/api/messages/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((messages: Message[]) => {
        if (messages.length === 0) {
          setNoMessages(true);
        } else {
          setThreads(groupMessages(messages));
          setNoMessages(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
        setNoMessages(true);
      });
  }, [userId]);

  

  return (
    <div className="flex flex-col border-2 border-primary-color w-fit p-4">
      <h2 className="text-xl font-bold mb-4">Inbox</h2>

      {!userId ? (
        <p className="text-red-500">Not logged in</p>
      ) : noMessages ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="w-full max-w-lg">
          {threads.map((thread) => (
            <div
              key={thread.id}
              onClick={() => setReceiver({ id: thread.participantId, name: `User ${thread.participantId}` })}
              className="border-b py-2"
            >
              <h3 className="text-lg font-semibold">Conversation with {thread.participantId}</h3>
              <p className="text-sm text-gray-700">
                {thread.mostRecentMessage.senderId === userId
                  ? "You: "
                  : "Them: "}
                {thread.mostRecentMessage.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inbox;
