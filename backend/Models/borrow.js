const mongoose = require("mongoose");

// Définition du schéma
const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  motif: { type: String, required: true },
  Listborrow: [
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
    enum: ["en attente", "accepté", "rejeté", "en cours", "terminé"],
    default: "en attente",
  },
});

// Création du modèle
const BorrowModel = mongoose.model("Borrow", borrowSchema);

module.exports = BorrowModel;
