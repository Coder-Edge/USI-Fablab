const mongoose = require("mongoose");

// Définition du schéma
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['Manager','Member', 'Student', 'Extern'], default: 'user' }
});

// Création du modèle
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
