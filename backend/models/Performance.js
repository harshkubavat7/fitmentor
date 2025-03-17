const mongoose = require("mongoose");

const PerformanceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  benchPress: { type: Number, required: true },
  squats: { type: Number, required: true },
  deadlifts: { type: Number, required: true },
  speed: { type: Number, required: true },
  stamina: { type: Number, required: true },
  strength: { type: Number, required: true },
  agility: { type: Number, required: true },
  endurance: { type: Number, required: true },
  performance_score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Performance", PerformanceSchema);
