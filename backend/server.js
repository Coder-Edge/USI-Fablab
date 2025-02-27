const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const userRoute = require("./routes/users");
const ImageModel = require("./Models/image.js");
const UserModel = require("./Models/users.js");
const ProductModel = require("./Models/product.js");
const BorrowModel = require("./Models/borrow.js");
const MemberModel = require("./Models/member.js");

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
    const users = await UserModel.find();
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
    const user = await UserModel.findById(id).select("name email"); // Recherche de l'utilisateur par ID

    if (!user) {
      return res.status(404).json({ error: "User not found" }); // Si l'utilisateur n'existe pas
    }

    res.json(user); // Retourner l'utilisateur trouvé
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" }); // Gérer les erreurs
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

app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Vérifier si le produit existe
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Supprimer l'image associée
    await ImageModel.findByIdAndDelete(product.image);

    // Supprimer le produit
    await ProductModel.findByIdAndDelete(productId);

    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression du produit",
      details: error.message,
    });
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
    const borrows = await BorrowModel.find().populate([
      { path: "user", select: "name email" }, // Récupérer le nom et l'email de l'utilisateur
    ]);

    const formattedBorrows = borrows.map((borrow, index) => ({
      user: borrows[index].user.name,
      startDate: borrow.startDate,
      endDate: borrow.endDate,
      motif: borrow.motif,
      Listborrow: borrow.Listborrow,
      status: borrow.status,
    }));
    res.json(formattedBorrows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch borrows" });
  }
});

// Get a product by ID
app.get("/get/products/:id", async (req, res) => {
  const { id } = req.params; // Récupérer l'ID depuis les paramètres de l'URL

  try {
    const product = await ProductModel.findById(id); // Recherche par ID
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the Product" });
  }
});

// Route pour ajouter un membre
app.post("/add_member", async (req, res) => {
  try {
    const { user, salary, role } = req.body;

    // Vérifier si l'utilisateur existe dans UserModel
    const existingUser = await UserModel.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (existingUser.userType === "Extern") {
      return res.status(400).json({ message: "Cet utilisateur est un extern et ne peut devenir un membre" });
    }

    // Vérifier si l'utilisateur est déjà un membre
    const existingMember = await MemberModel.findOne({ member: user });
    if (existingMember) {
      return res.status(400).json({ message: "Cet utilisateur est déjà membre" });
    }

    // Mettre à jour userType en "membre"
    existingUser.userType = "Member";
    await existingUser.save();

    // Ajouter le nouvel utilisateur dans MemberModel
    const newMember = new MemberModel({
      member: user,
      role,
      salary,
    });

    await newMember.save();

    res.status(201).json({ 
      message: "Utilisateur ajouté comme membre avec succès", 
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout du membre",
      error: error.message,
    });
  }
});

// Route pour récupérer les membres
app.get("/get_members", async (req, res) => {
  try {
    const members = await MemberModel.find().populate([
      { path: "member", select: "name firstName email" }, // Récupérer le nom et l'email de l'utilisateur
    ]);
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch members" });
  }
}
);

// Route pour mettre à jour un membre
app.delete("/remove_member/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;

    // Vérifier si le membre existe
    const member = await MemberModel.findOne({member:memberId});
    
    if (!member) {
      return res.status(404).json({ error: "Membre non trouvé" });
    }

    // Suppression du membre dans MemberModel
    await MemberModel.findByIdAndDelete(member._id);

    // Mise à jour du usertype dans UserModel
    await UserModel.updateOne({_id: member.member}, { userType: "Student" });

    res.json({ message: "Membre supprimé et utilisateur mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});


app.get("/calendar", async (req, res) => {
  try {
    const borrows = await BorrowModel.find().populate("user");
    const formattedBorrows = borrows.map((borrow) => ({
      id: borrow._id,
      title: `Emprunt de : ${borrow.user.name}`, // Nom de l'emprunteur
      start: borrow.startDate, // Date formatée en YYYY-MM-DD
      end: borrow.endDate,
      motif: borrow.motif,
      description: borrow.Listborrow.map(
        (item) => `${item.product_name} (x${item.quantity})`
      ) // Liste des items avec leur quantité
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
