const mongoose = require("mongoose");

// Définition du schéma
const memberSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: [], default: "gestionnaire", required: true },
  salary: { type: Number, default: 0, required: true},
});

// Création du modèle
const MemberModel = mongoose.model("Member", memberSchema);

module.exports = MemberModel;
