const mongoose = require("mongoose");

// Définition du schéma
const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  image: 
  [
    { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
  ],
  device: { type: String, enum: ["$", "CDF"], default: "$", required: true },
  description: { type: String, required: true },
});

// Création du modèle
const ArticleModel = mongoose.model("Article", articleSchema);

module.exports = ArticleModel;
