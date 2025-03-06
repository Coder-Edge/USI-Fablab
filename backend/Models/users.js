
const mongoose = require("mongoose");
const { Role } = require("../permission/role")


// Définition du schéma
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: [Role.manager, Role.member, Role.student, Role.extern], default: Role.student },
});

// Création du modèle
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
