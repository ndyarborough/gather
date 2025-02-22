const MessageInput = ({
    messageContent,
    setMessageContent,
    handleSendMessage,
  }: {
    messageContent: string;
    setMessageContent: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: () => void;
  }) => (
    <div className="flex flex-col">
      <textarea
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        rows={3}
        className="border-2 p-2 mb-4 w-full rounded-lg"
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage} className="btn bg-primary p-2 w-full">
        Send Message
      </button>
    </div>
  );

  export default MessageInput;