import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "./firebase/useAuth";
import useChat from "./firebase/useChat";
import Header from "./Header";

const bubbleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const { user, handleSignOut } = useAuth();
  const { messages, handleSendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleChat = () => {
    if (!newMessage.trim()) return;
    handleSendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-dvh bg-teal-900 text-white">
      {/* Header */}
      <header className="p-4 bg-teal-700 flex justify-between items-center shadow">
        <Header />
        <button
          onClick={handleSignOut}
          className="px-3 py-1 rounded !bg-amber-500 text-white hover:bg-amber-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => {
          const isCurrentUser = msg?.userId === user?.uid;
          return (
            <motion.div
              key={msg.id}
              initial="hidden"
              animate="visible"
              variants={bubbleVariants}
              className={`flex mb-3 ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl shadow-md transition break-words
                  ${
                    isCurrentUser
                      ? "bg-amber-500 text-white"
                      : "bg-teal-600 text-white"
                  }
                `}
              >
                <p className="text-xs font-semibold opacity-80 mb-1">
                  {msg?.userName || "Anon"}
                </p>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="p-3 bg-teal-800 flex items-center gap-2 shadow-inner">
        <input
          value={newMessage}
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full outline-none bg-white text-gray-900"
          onKeyDown={(e) => e.key === "Enter" && handleChat()}
        />
        <button
          onClick={handleChat}
          className="px-4 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
