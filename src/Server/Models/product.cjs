const mongoose = require("mongoose");

// Définition du schéma
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price : { type: Number, required: true },
    quantity : { type: Number, required: true },
    type : { type: String, required: true },
    is_available : { type: Boolean, required: true },
    image : { type: String, required: true },
});

// Création du modèle
const ProductModel = mongoose.model("User", productSchema);

module.exports = ProductModel;
