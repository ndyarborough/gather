import { useEffect, useRef } from "react";
import { formatTime } from "@/utils";
import { Message } from "../../../shared-types";
import Image from "next/image";

const MessageList = ({
  messages,
  userId,
}: {
  messages: Message[];
  userId: string;
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the latest message when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0)
    return (
      <p className="text-gray-500 text-center mt-4">No message history yet.</p>
    );

  return (
    <div className="flex-1 overflow-y-auto p-4 pb-1 border-b bg-gray-100 rounded-lg shadow-inner flex flex-col-reverse">
      <div ref={messagesEndRef} />
      {messages.slice().reverse().map((message) => { // Reverse messages order
        const isSender = message.senderId === userId;

        return (
          <div
            key={message.id}
            className={`flex ${
              isSender ? "justify-end" : "justify-start"
            } mb-3`}
          >
            {!isSender && (
              <Image
                src={`http://localhost:3001/${message.sender.profilePic}`}
                alt="profile icon"
                width={40}
                height={40}
                className="rounded-full object-cover mr-2"
              />
            )}

            <div
              className={`max-w-[75%] min-w-[20%] p-3 rounded-xl ${
                isSender
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-900 shadow-md"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs text-right text-gray-300">
                {formatTime(message.createdAt.toString())}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
