"use client";

import { useEffect, useState } from "react";
import { SafeUser, Message } from "../../../../shared-types";
import { getThreadsForUser } from "../../../api/api";

interface Thread {
  id: string;
  participant: SafeUser;
  messages: Message[]; // Full conversation history
}

interface InboxProps {
  setReceiver: (receiver: SafeUser) => void;
  id: string;
}

const Inbox = ({ setReceiver, id }: InboxProps) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [noMessages, setNoMessages] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchThreads = async () => {
      setLoading(true);
      const threads = await getThreadsForUser(id);
      setThreads(threads);
      setNoMessages(threads.length === 0);
      setLoading(false);
    };

    fetchThreads();
  }, [id]);

  return (
    <div className="flex flex-col border-2 border-primary-color w-fit p-4">
      <h2 className="text-xl font-bold mb-4">Inbox</h2>

      {!id ? (
        <p className="text-red-500">Not logged in</p>
      ) : loading ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : noMessages ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="w-full max-w-lg">
          {threads.map((thread) => {
            const mostRecentMessage = thread.messages[0]; // Get latest message

            return (
              <div
                key={thread.id}
                onClick={() => setReceiver(thread.participant)}
                className="border-b py-2 cursor-pointer hover:bg-gray-200"
              >
                <h3 className="text-lg font-semibold">{thread.participant.fullName}</h3>
                <p className="text-sm text-gray-700">
                  {mostRecentMessage.senderId === id ? "You: " : "Them: "}
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
