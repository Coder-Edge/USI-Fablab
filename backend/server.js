const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const {
  authentification,
  typePermission,
  Role,
} = require("./permission/permission");
const userRoute = require("./routes/users");
const ImageModel = require("./Models/image.js");
const userModel = require("./Models/users.js");
const ProductModel = require("./Models/product.js");
const BorrowModel = require("./Models/borrow.js");

const app = express();
app.use(express.static("uploads"));

connectDB();

// authorisation de source
const corsOption = {
  credentials: true,
  origin: ["http://localhost:5173"],
};

app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json());

app.use("/users", userRoute);

// Route pour récupérer les utilisateurs
app.get("/users", async (req, res) => {
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

// Route pour récupérer un utilisateur par son id
app.get("/get/users/:id", async (req, res) => {
  const { id } = req.params; // Récupérer l'ID depuis l'URL

  try {
    const user = await userModel.findById(id).select("name email");; // Recherche de l'utilisateur par ID

    if (!user) {
      return res.status(404).json({ error: "User not found" }); // Si l'utilisateur n'existe pas
    }
    
    res.json(user); // Retourner l'utilisateur trouvé
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" }); // Gérer les erreurs
  }
});


app.post("/registre/", async (req, res) => {
  const usersToInsert = req.body; // Les informations de l'utilisateur envoyées dans la requête POST

  try {
    // Vérifie si un utilisateur avec l'email existe déjà
    const existingUser = await userModel.findOne({
      email: usersToInsert.email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: `L'utilisateur avec l'email ${usersToInsert.email} existe déjà.`,
      });
    }

    // Si le rôle est "manager", vérifie s'il y a déjà un manager existant
    if (usersToInsert.userType.toLowerCase() === Role.manager.toLowerCase()) {
      console.log(
        "Nonnnnnnnnnnnnnnnnnnn bordelllllllllllllllllllllllll marcheeeeeeeeeeee"
      );
      const existingManager = await userModel.findOne({
        userType: Role.manager,
      });
      if (existingManager) {
        return res.status(400).json({
          message:
            "Un manager existe déjà. Vous ne pouvez pas en créer un autre.",
        });
      }
    }

    // Hash du mot de passe avant de créer l'utilisateur
    usersToInsert.password = await bcrypt.hash(usersToInsert.password, 10);

    // Crée le nouvel utilisateur
    const insertedUser = await userModel.create(usersToInsert);
    console.log("Utilisateur inséré avec succès :", insertedUser);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: insertedUser,
    });
  } catch (error) {
    console.error("Erreur lors de l'insertion des utilisateurs :", error);
    res.status(500).json({
      message: "Erreur lors de l'insertion des utilisateurs",
      error,
    });
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
    const savedImage = await new ImageModel({
      path: imagePath,
      filename,
    }).save();

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

    res.status(201).json({
      message: "Produit enregistré avec succès",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de l'enregistrement du produit",
      details: error.message,
    });
  }
});

// Get all products
app.get("/get/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get images
app.get("/img/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const image = await ImageModel.findById(id);
    if (!image) return res.status(404).send({ msg: "Image Not Found" });

    const imagePath = path.join(__dirname, "uploads", image.filename);
    res.sendFile(imagePath);
  } catch (error) {
    res.status(500).send({ error: "Unable to get image" });
  }
});

//borrow product
app.post("/borrow", async (req, res) => {
  productList = [];

  try {
    const { startDate, endDate, motif, borrowList } = req.body;
    // console.log(req.body);
    // Validation des champs
    if (!startDate || !endDate || !motif || !borrowList) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Récupération de l'utilisateur pour valider qu'il existe
    const cookie = req.cookies.jwt;
    const data = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);

    for (let i = 0; i < borrowList.length; i++) {
      productList.push({
        product_id: borrowList[i].product._id,
        product_name: borrowList[i].product.name,
        product_image: borrowList[i].product.image,
        quantity: borrowList[i].quantity,
      });
    }

    // // Liste de produits : Vérification si chaque produit existe et la quantité
    for (let item of productList) {
      const product = await ProductModel.findById(item.product_id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product.id} not found` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for product ID ${item.product.id}`,
        });
      }
    }

    // Création de l'emprunt
    const borrow = new BorrowModel({
      user: data._id,
      startDate,
      endDate,
      motif,
      Listborrow: productList,
      status: "en attente",
    });

    // Sauvegarde dans la base de données
    await borrow.save();

    // Réponse de succès
    res.status(201).json({ message: "Borrow registered successfully", borrow });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all borrows
app.get("/get/borrows", async (req, res) => {
  try {
    const borrows = await BorrowModel.find();
    res.json(borrows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch borrows" });
  }
});

// app.get("/get/products/:id", async (req, res) => {
//   const { id } = req.params; // Récupérer l'ID depuis les paramètres de l'URL

//   try {
//     const product = await ProductModel.findById(id); // Recherche par ID
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch the Product" });
//   }
// });

app.get("/calendar", async (req, res) => {
  try {
    const borrows = await BorrowModel.find().populate("user"); 
    
    const formattedBorrows = borrows.map((borrow) => ({
      id: borrow._id,
      title: borrow.user.name, // Nom de l'emprunteur
      start: borrow.startDate,   // Date formatée en YYYY-MM-DD
      end: borrow.endDate,
      description: borrow.Listborrow
        .map((item) => `${item.product_name} (x${item.quantity})`) // Liste des items avec leur quantité
        .join(", "),
    }));

    res.json(formattedBorrows);
  } catch (error) {
    console.error("Erreur lors de la récupération des emprunts :", error);
    res.status(500).json({ error: "Failed to fetch borrows" });
  }
});



app.use((req, res) => {
  res.status(404).json({ message: "The url doesn't exist" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
