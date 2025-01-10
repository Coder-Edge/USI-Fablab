const express = require("express");
const connectDB = require("./db.cjs");
const itemModel = require("./Models/items.cjs");
const userModel = require("./Models/users.cjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", async (req, res) => {
  const response = await itemModel.find();
  return res.json({ items: response });
});

// Route pour récupérer les utilisateurs
app.get("/users/", async (req, res) => {
  try {
    const users = await userModel.find();
    return res.json({ user: users });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
  }
});

app.post('/registre/', async (req,res) => {
  const usersToInsert = req.body; // Les utilisateurs envoyés dans la requête POST

  try {

    for (const user of usersToInsert) {
      // Vérifie si l'utilisateur existe déjà par son email
      const existingUser = await userModel.findOne({ email: user.email });

      if (existingUser) {
        console.log(`L'utilisateur avec l'email ${user.email} existe déjà.`);
      } else {
        // Insère l'utilisateur s'il n'existe pas
        const insertedUser = await userModel.create(user);
        console.log("Utilisateur inséré avec succès :", insertedUser);
      }
    }

    res.status(200).json({ message: "Opération terminée", results });
  } catch (error) {
    console.error("Erreur lors de l'insertion des utilisateurs :", error);
    res.status(500).json({ message: "Erreur lors de l'insertion des utilisateurs", error });
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
