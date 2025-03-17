const express = require("express");
const router = express.Router();
const Performance = require("../models/Performance");

// 📌 Save Performance Data
router.post("/save", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    if (!req.body.userId || !req.body.benchPress || !req.body.squats || !req.body.deadlifts) {
      return res.status(400).json({ error: "❌ Missing required fields" });
    }

    const newPerformance = new Performance({
      userId: req.body.userId,
      benchPress: Number(req.body.benchPress),
      squats: Number(req.body.squats),
      deadlifts: Number(req.body.deadlifts),
      speed: req.body.speed || 0,
      stamina: req.body.stamina || 0,
      strength: req.body.strength || 0,
      agility: req.body.agility || 0,
      endurance: req.body.endurance || 0,
      performance_score: req.body.performance_score || 0,
    });

    await newPerformance.save();
    res.status(201).json({ message: "✅ Performance data saved!" });
  } catch (error) {
    console.error("❌ Error saving performance data:", error.message);
    res.status(500).json({ error: "Failed to save performance data" });
  }
});

// 📌 Get User Performance Data
router.get("/:userId", async (req, res) => {
  try {
    const performances = await Performance.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json(performances);
  } catch (error) {
    console.error("❌ Error fetching performance data:", error.message);
    res.status(500).json({ error: "Failed to fetch performance data" });
  }
});

module.exports = router;
