import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"], // ✅ Ensure WebSocket works
  withCredentials: true, // ✅ Fix CORS issue
});

const Messages = () => {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [newMessage, setNewMessage] = useState(""); // Input field state
  const [receiverId, setReceiverId] = useState(localStorage.getItem("receiverId") || ""); // ✅ Ensure receiverId is stored
  const userId = localStorage.getItem("userId"); // Get logged-in user ID
  const username = localStorage.getItem("username"); // Get logged-in username

  useEffect(() => {
    if (userId) {
      socket.emit("joinChat", userId);
    }

    socket.on("receiveMessage", (message) => {
      console.log("📩 New message received:", message);
      setMessages((prev) => [...prev, message]); // ✅ Append new message
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId]);

  const fetchMessages = async () => {
    if (!receiverId) {
      console.warn("⚠️ Cannot fetch messages. Please select a user to chat with.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/messages/${userId}/${receiverId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      console.log("📜 Fetched messages:", data);
      setMessages(data); // ✅ Load messages into state
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (receiverId) {
      fetchMessages();
    }
  }, [receiverId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !userId || !receiverId || !username) {
      console.error("❌ Error: Missing message data!", { userId, username, receiverId, newMessage });
      return;
    }

    const messageData = { senderId: userId, senderName: username, receiverId, text: newMessage };

    try {
      const response = await fetch("http://localhost:5000/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send message");

      socket.emit("sendMessage", messageData);
      setNewMessage(""); // Clear input field
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      {/* Select User to Chat With */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Select Receiver:</label>
        <select
          value={receiverId}
          onChange={(e) => {
            const selectedId = e.target.value;
            setReceiverId(selectedId);
            localStorage.setItem("receiverId", selectedId); // ✅ Store selected user
          }}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select a user --</option>
          <option value="67d590450640bee4f033643e">User 1</option>
          <option value="67d6722302d492b22742ecbe">User 2</option>
        </select>
      </div>

      {/* Chat Window */}
      <div className="bg-gray-100 p-4 h-80 overflow-y-auto rounded">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`mb-2 p-2 rounded ${msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              <p><strong>{msg.senderName}</strong>: {msg.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>

      {/* Input Field */}
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
