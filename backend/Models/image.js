const mongoose = require("mongoose");

// Définition du schéma
const imageSchema = new mongoose.Schema({
    path: { type: String, required: true },
    filename : { type: String, required: true },
});

// Création du modèle
const ImageModel = mongoose.model("Image", imageSchema);

module.exports = ImageModel;
 