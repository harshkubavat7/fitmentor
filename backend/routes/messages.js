const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ✅ Send a new message
router.post("/send", async (req, res) => {
  try {
    const { senderId, senderName, receiverId, text } = req.body;

    // ✅ Check if all fields are present
    if (!senderId || !senderName || !receiverId || !text) {
      return res.status(400).json({ error: "All fields (senderId, senderName, receiverId, text) are required!" });
    }

    // ✅ Create a new message entry
    const newMessage = new Message({ senderId, senderName, receiverId, text, timestamp: new Date() });
    await newMessage.save();

    res.status(201).json({ message: "✅ Message sent successfully!", newMessage });
  } catch (error) {
    console.error("❌ Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});




// ✅ Fetch messages between two users
router.get("/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await Message.find({
      $or: [{ senderId: user1, receiverId: user2 }, { senderId: user2, receiverId: user1 }],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});


module.exports = router;
