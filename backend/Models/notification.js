const mongoose = require("mongoose");

// Définition du schéma
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  notification: [
    {
      from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      title: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: Date, required: true },
      status: {
        type: String,
        enum: ["non vu", "vu"],
        default: "non vu",
      },
    },
  ],
});

// Création du modèle
const NotificationModel = mongoose.model("Task", notificationSchema);

module.exports = NotificationModel;
