const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// 🔹 Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use!" });

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();

    console.log("✅ Signup successful!");
    res.status(201).json({ message: "Signup successful! Please login." });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ error: "Signup failed!" });
  }
});


// 🔹 Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔍 Checking email:", email);

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found!");
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    console.log("✅ User found:", user);

    // ✅ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch!");
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    console.log("🔑 Generating JWT Token...");

    // ✅ Generate JWT Token
    if (!process.env.JWT_SECRET) {
      console.error("❌ ERROR: JWT_SECRET is missing in .env!");
      return res.status(500).json({ error: "Server misconfiguration!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    console.log("✅ Login successful!");
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Internal Server Error. Check logs." });
  }
});


router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("_id name email"); // ✅ Ensure _id is included
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});



module.exports = router;
