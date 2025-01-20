"use client";
import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import { Trash2 } from "lucide-react";
import { fetchUsers } from "@/shared/Api/dashboard";

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

const socket: Socket = io("http://localhost:8080"); // Replace with your backend URL

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [users, setUsers] = useState<[]>([]);
  const userMessanger = useSelector((state: any) => state?.auth?.user);

  useEffect(() => {
    socket.on("chat:initial", (initialMessages: Message[]) => {
      setMessages(initialMessages);
    });

    socket.on("chat:newMessage", (message: Message) => {
      setMessages((prevMessages) => [message, ...prevMessages.slice(0, 9)]);
    });

    socket.on("messageRemoved", (messageId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
    });

    return () => {
      socket.off("chat:initial");
      socket.off("chat:newMessage");
    };
  }, []);

  console.log(users)

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      // console.log("fetchedUsers:  ",fetchedUsers)
      setUsers(fetchedUsers);
    };

    getUsers();
  }, []);

  const handleEmojiClick = (emojiObject: any) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setNewMessage(input);
    setCursorPosition(e.target.selectionStart || 0);
  
    // Show dropdown if '@' is typed
    const lastAtIndex = input.lastIndexOf("@");
    if (lastAtIndex !== -1 && lastAtIndex >= input.lastIndexOf(" ")) {
      const searchTerm = input.slice(lastAtIndex + 1);
      if (searchTerm) {
        const matchedUsers = users
          .filter((user: any) =>
            user.userName.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
          .map((user: any) => user.userName); // Extract userName only
        setFilteredUsers(matchedUsers);
        setShowDropdown(true);
      } else {
        const allUserNames = users.map((user: any) => user.userName); // Extract all userNames
        setFilteredUsers(allUserNames);
        setShowDropdown(true);
      }
    } else {
      setShowDropdown(false);
    }
  };
  

  const handleUserSelect = (selectedUser: string) => {
    const inputBeforeCursor = newMessage.slice(0, cursorPosition);
    const inputAfterCursor = newMessage.slice(cursorPosition);
  
    const lastAtIndex = inputBeforeCursor.lastIndexOf("@");
    const updatedMessage =
      inputBeforeCursor.slice(0, lastAtIndex + 1) +
      selectedUser +
      " " +
      inputAfterCursor;
  
    setNewMessage(updatedMessage);
    setShowDropdown(false);
  };
  

  const removeMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
    socket.emit("removeMessage", messageId);
  };

  const sendMessage = () => {
    if (newMessage.trim() && userMessanger?.userName.trim()) {
      const messageData: Message = {
        id: uuidv4(),
        username: userMessanger?.userName,
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
                  <span>
                    {message.content.split(/(\s+)/).map((word, i) =>
                      word.startsWith("@") ? (
                        <span key={i} className="text-purple-500 font-semibold">
                          {word}
                        </span>
                      ) : (
                        word
                      )
                    )}
                  </span>
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {userMessanger?.admin && (
                <button
                  onClick={() => removeMessage(message.id)}
                  className="text-red-500 hover:text-red-700 text-xs ml-2"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-xl"
            >
              😊
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
          {showDropdown && (
            <ul className="absolute bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-40 overflow-y-auto shadow-lg z-10">
              {filteredUsers.map((username, idx) => (
                <li
                  key={idx}
                  onClick={() => handleUserSelect(username)}
                  className="px-4 py-2 hover:bg-gray-900 cursor-pointer"
                >
                  {username}
                </li>
              ))}
            </ul>
          )}
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-32 left-80">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
