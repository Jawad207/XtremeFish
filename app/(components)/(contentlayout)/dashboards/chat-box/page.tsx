"use client"
import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import EmojiPicker from 'emoji-picker-react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { v4 as uuidv4 } from 'uuid';
import { Trash2 } from "lucide-react";

interface Message {
  id:string;
  username: string;
  content: string;
  timestamp: string;
}

const socket: Socket = io("http://localhost:8080"); // Replace with your backend URL

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const user = useSelector((state: any) => state?.auth?.user);
  // Handle incoming messages
  useEffect(() => {
    // Receive initial messages
    socket.on("chat:initial", (initialMessages: Message[]) => {
      setMessages(initialMessages);
    });

    // Receive new messages
    socket.on("chat:newMessage", (message: Message) => {
      setMessages((prevMessages) => [message, ...prevMessages.slice(0, 9)]); // Ensure the limit of 10 messages
    });

    // Listen for a message removal event
    socket.on('messageRemoved', (messageId) => {
        // Remove the message from the local state
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== messageId)
        );
      });

    return () => {
      socket.off("chat:initial");
      socket.off("chat:newMessage");
    };
  }, []);

  const handleEmojiClick = (emojiObject:any) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false); // Close the emoji picker after selecting an emoji
  };

  // Function to handle message removal
  const removeMessage = (messageId: string) => {
    // Optimistically remove the message from the UI
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  
    // Emit the removeMessage event to the server
    socket.emit("removeMessage", messageId);
  };

  // Send a new message
  const sendMessage = () => {
    if (newMessage.trim() && user?.userName.trim()) {
      const messageData: Message = {
        id:uuidv4(),
        username:user?.userName,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      socket.emit("chat:message", messageData);
      setNewMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#19191c]">
      <div className="w-full bg-[#19191c] rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-center mb-4">Chat Box</h2>
        <div className="h-2/3 overflow-y-auto border border-gray-300 rounded-lg p-3 mb-4 bg-[#19191c]">
            {messages.map((message, index) => (
                <div key={index} className="mb-2 flex items-center justify-between">
                <div>
                    <p className="text-sm">
                    <span className="font-semibold text-blue-500">{message.username}</span>:{" "}
                    <span>{message.content}</span>
                    </p>
                    <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                </div>
                {user?.admin&&
                (
                    <button
                    onClick={() => removeMessage(message.id)} // Assuming removeMessage is defined to handle message removal
                    className="text-red-500 hover:text-red-700 text-xs ml-2"
                    >
                        <Trash2/>
                    </button>
                )}
                </div>
            ))}
            </div>
        <div className="flex items-center space-x-3">
            {/* Emoji button */}
            <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-xl"
            >
                😊
            </button>

            {/* Input field */}
            <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Send button */}
            <button
                onClick={sendMessage}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
                <PaperAirplaneIcon className="w-5 h-5" />
            </button>

            {/* Optional: Emoji picker */}
            {showEmojiPicker && (
                <div className="absolute bottom-32 left-80">
                    <EmojiPicker className="bg-black" onEmojiClick={handleEmojiClick}/>
                </div>
            )}
            </div>
      </div>
    </div>
  );
};

export default Chat;
