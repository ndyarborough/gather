"use client";

import { useState, useEffect } from "react";
import { Message, SafeUser } from "../../../shared-types";
import { getMessageHistory } from "@/api/api";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const SendMessage = ({ id, receiver }: { id: string; receiver: SafeUser }) => {
  const [messageContent, setMessageContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !receiver) return;

    const fetchThreadHistory = async () => {
      const messageData = await getMessageHistory(id, receiver.id);
      const messageJson = await messageData.json();
      setMessages(messageJson);
    };

    fetchThreadHistory();
  }, [id, receiver]);

  const handleSendMessage = () => {
    if (!messageContent.trim()) {
      setError("Please enter a message.");
      return;
    }

    const messageData = {
      senderId: id,
      receiverId: receiver.id,
      content: messageContent,
    };

    fetch(
      `http://localhost:3001/api/messages/${messageData.senderId}/${messageData.receiverId}/${messageData.content}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send message.");
        return res.json();
      })
      .then((newMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessageContent(""); // Clear input
        setError(null);
      })
      .catch((err) => {
        console.error("Error sending message:", err);
        setError("Failed to send message.");
      });
  };

  return (
    <div className="flex flex-col w-full h-full p-4">
  <h2 className="text-xl font-bold mb-4">
    {receiver ? `Message Thread with ${receiver.fullName}` : "Send Message"}
  </h2>

  {!receiver ? (
    <p className="text-gray-500">No thread selected</p>
  ) : (
    <>
      {error && <p className="text-red-500">{error}</p>}

      {/* Main content container with flex-grow to stretch the message list */}
      <div className="flex flex-col gap-2 flex-1 overflow-hidden">
        <MessageList messages={messages} userId={id} />

        <MessageInput
          messageContent={messageContent}
          setMessageContent={setMessageContent}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </>
  )}
</div>

  );
};

export default SendMessage;
