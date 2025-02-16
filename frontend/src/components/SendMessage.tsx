"use client" 

import { useState, useEffect } from "react";
import { SafeUser } from "../../../shared-types";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

const SendMessage = ({
    id,
    receiver,
  }: {
    id: string;
    receiver: SafeUser;  // Accept the full receiver object
  }) => {
    const [messageContent, setMessageContent] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    // Fetch the message history when component mounts or when receiver changes
    useEffect(() => {
      if (!id || !receiver) return;
  
      fetch(`http://localhost:3001/api/messages/${id}/${receiver.id}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then((data: Message[]) => {
          setMessages(data);
        })
        .catch((err) => {
          console.error("Error fetching message history:", err);
          setError("Failed to load message history.");
        });
    }, [id, receiver]);
  
    const handleSendMessage = () => {
      if (!messageContent.trim()) {
        setError("Please enter a message.");
        return;
      }
  
      const messageData = {
        senderId: id,
        receiverId: receiver?.id,
        content: messageContent,
      };
  
      fetch(`http://localhost:3001/api/messages/${messageData.senderId}/${messageData.receiverId}/${messageData.content}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to send message.`);
          return res.json();
        })
        .then((newMessage: Message) => {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setMessageContent(""); // Clear the input
          setError(null); // Clear error if any
        })
        .catch((err) => {
          console.error("Error sending message:", err);
          setError("Failed to send message.");
        });
    };
  
    return (
      <div className="flex flex-col border-2 border-primary w-full p-4">
        <h2 className="text-xl font-bold mb-4">
          {receiver ? `Message Thread with ${receiver.fullName}` : "Send Message"}
        </h2>
  
        {!receiver ? (
          <p className="text-gray-500">No thread selected</p>
        ) : (
          <>
            {error && <p className="text-red-500">{error}</p>}
  
            <div className="mb-4 max-h-96 overflow-y-auto p-2 border-b">
              {messages.length === 0 ? (
                <p className="text-gray-500">No message history yet.</p>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`py-1 ${message.senderId === id ? "text-blue-600" : "text-gray-700"}`}
                  >
                    <strong>{message.senderId === id ? "You" : "Them"}:</strong> {message.content}
                  </div>
                ))
              )}
            </div>
  
            <div className="flex flex-col">
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={3}
                className="border-2 p-2 mb-4 w-full"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="btn bg-primary p-2 w-full"
              >
                Send Message
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default SendMessage;
  