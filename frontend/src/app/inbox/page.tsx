import { useEffect, useState, useContext } from "react";
import { SafeUser, Message } from "../../../../shared-types";
import { getThreadsForUser } from "../../api/api";
import { UserContext } from "@/context/UserContext";
import { formatTime } from "@/utils";
import Image from "next/image";

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
    <div className="flex flex-col w-full p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Inbox</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading messages...</p>
      ) : noMessages ? (
        <p className="text-gray-500 text-center">No messages yet.</p>
      ) : (
        <div>
          {threads.map((thread) => {
            const mostRecentMessage = thread.messages[0];
            const isSender = mostRecentMessage.senderId === user.id;
            const formattedTime = formatTime(mostRecentMessage.createdAt.toString());

            return (
              <div
                key={thread.id}
                className="flex min-w-[100%] items-center gap-3 p-3 border-b hover:bg-gray-100 rounded-lg transition cursor-pointer"
                onClick={() => onThreadClick(thread.participant)}
              >
                {/* Profile Picture */}
                <Image
                  src={`http://localhost:3001/${thread.participant.profilePic}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                  width={40}
                  height={40}
                />

                {/* Message Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{thread.participant.fullName}</h3>
                  <p className="text-sm text-gray-700 truncate">
                    {isSender ? "You: " : "Them: "}
                    {mostRecentMessage.content}
                  </p>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-gray-500">{formattedTime}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Inbox;
