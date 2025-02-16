"use client";

import { useEffect, useState, useContext } from "react";
import { SafeUser, Message } from "../../../../shared-types";
import { getThreadsForUser } from "../../../api/api";
import { UserContext } from "@/context/UserContext";

interface Thread {
  id: string;
  participant: SafeUser;
  messages: Message[];
}

const Inbox = ({ onThreadClick }: { onThreadClick: (receiver: SafeUser) => void }) => {
  const { user } = useContext(UserContext);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [noMessages, setNoMessages] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchThreads = async () => {
      setLoading(true);
      try {
        const threads = await getThreadsForUser(user.id);
        setThreads(threads);
        setNoMessages(threads.length === 0);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, [user?.id]);

  if (!user) return <p className="text-red-500">Not logged in</p>;

  return (
    <div className="flex flex-col border-2 border-primary w-full p-4">
      <h2 className="text-xl font-bold mb-4">Inbox</h2>

      {loading ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : noMessages ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="w-full max-w-lg">
          {threads.map((thread) => {
            const mostRecentMessage = thread.messages[0];

            return (
              <div
                key={thread.id}
                className="border-b py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => onThreadClick(thread.participant)}
              >
                <h3 className="text-lg font-semibold">{thread.participant.fullName}</h3>
                <p className="text-sm text-gray-700">
                  {mostRecentMessage.senderId === user.id ? "You: " : "Them: "}
                  {mostRecentMessage.content}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Inbox;
