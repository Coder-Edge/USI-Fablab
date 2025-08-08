const mongoose = require("mongoose");

// Définition du schéma
const taskSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["en cours", "non fait", "terminé"],
    default: "en cours",
  },
});

// Création du modèle
const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
