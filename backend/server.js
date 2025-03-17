const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const Message = require("./models/Message"); // ✅ Import Message model

const app = express();
const server = http.createServer(app);

// ✅ Enable CORS
app.use(cors({ 
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());

// ✅ Initialize WebSocket Server
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"], credentials: true },
});

const users = {}; // Store active users

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("joinChat", (userId) => {
    users[userId] = socket.id;
    console.log(`👤 User ${userId} joined with socket ID: ${socket.id}`);
  });

  socket.on("sendMessage", async (messageData) => {
    console.log("📩 New Message Sent:", messageData);

    if (!messageData.senderId || !messageData.senderName || !messageData.receiverId || !messageData.text) {
      console.log("❌ Message data missing:", messageData);
      return;
    }

    // ✅ Save message in MongoDB
    const newMessage = new Message(messageData);
    await newMessage.save();

    // ✅ Send message to both sender and receiver
    io.to(socket.id).emit("receiveMessage", newMessage);
    if (users[messageData.receiverId]) {
      io.to(users[messageData.receiverId]).emit("receiveMessage", newMessage);
    }
  });

  socket.on("disconnect", () => {
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        console.log("❌ User Disconnected:", userId);
        break;
      }
    }
  });
});

// ✅ Register API Routes
const authRoutes = require("./routes/auth");
const performanceRoutes = require("./routes/performance");
const messageRoutes = require("./routes/messages");

app.use("/api/auth", authRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
