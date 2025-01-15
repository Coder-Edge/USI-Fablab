const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const multer = require("multer"); 
const bcrypt = require("bcrypt");
const path = require("path")
const ImageModel = require("./Models/image.js");
const itemModel = require("./Models/items.js");
const userModel = require("./Models/users.js");
const ProductModel = require("./Models/product.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"))

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
    return res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error,
    });
  }
});

app.post("/registre/", async (req, res) => {
  const usersToInsert = req.body; // Les utilisateurs envoyés dans la requête POST

  try {
    // Vérifie si l'utilisateur existe déjà par son email
    const existingUser = await userModel.findOne({
      email: usersToInsert.email,
    });

    if (existingUser) {
      console.log(
        `L'utilisateur avec l'email ${usersToInsert.email} existe déjà.`
      );
    } else {
      usersToInsert.password = await bcrypt.hash(usersToInsert.password, 10);
      // Insère l'utilisateur s'il n'existe pas
      const insertedUser = await userModel.create(usersToInsert);
      console.log("Utilisateur inséré avec succès :", insertedUser);
    }

    res.status(200).json({ message: "Opération terminée" });
  } catch (error) {
    console.error("Erreur lors de l'insertion des utilisateurs :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'insertion des utilisateurs", error });
  }
});

//Save the image in db
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route pour enregistrer un produit avec une image
app.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, type, is_available } = req.body;
    const { path: imagePath, filename } = req.file;

    // Sauvegarder l'image dans la base de données
    const savedImage = await new ImageModel({ path: imagePath, filename }).save();

    // Sauvegarder le produit avec l'ID de l'image
    const product = new ProductModel({
      name,
      price,
      quantity,
      type,
      is_available,
      image: savedImage._id,
    });

    const savedProduct = await product.save();

    res.status(201).json({ message: "Produit enregistré avec succès", product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'enregistrement du produit", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
