const mongoose = require("mongoose");

// Définition du schéma
const commandSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  ListCommand: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["en attente", "accepté", "rejeté"],
    default: "en attente",
  },
});

// Création du modèle
const CommandModel = mongoose.model("Command", commandSchema);

module.exports = CommandModel;
