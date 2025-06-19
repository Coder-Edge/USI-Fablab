const mongoose = require("mongoose");

// Définition du schéma
const rateSchema = new mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  star: {
    type: [
      { average: Number, min: 0, max: 5, required: true },
      { vote: Number, required: true },
    ],
    required: true,
  },
//   sold: { type: Number, required: true },
  avis: { type: [{ type: String, required: true }], required: null },
});

// Création du modèle
const RateModel = mongoose.model("Rate", rateSchema);

module.exports = RateModel;
