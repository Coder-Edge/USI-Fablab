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
const CommandModel = require("./Models/command.js");
const TaskModel = require("./Models/task.js");
const ArticleModel = require("./Models/article.js");

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

// Delete products
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
      { path: "user", select: "name firstName email" }, // Récupérer le nom et l'email de l'utilisateur
    ]);

    const formattedBorrows = borrows.map((borrow, index) => ({
      id: borrow.id,
      user: `${borrows[index].user.name + " " + borrows[index].user.firstName}`, // Nom de l'emprunteur
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

// Récupérer un emprunt spécifique par ID
app.get("/get/borrows/:id", async (req, res) => {
  try {
    const borrow = await BorrowModel.findById(req.params.id).populate([
      { path: "user", select: "name firstName email" }
    ]);

    if (!borrow) {
      return res.status(404).json({ error: "Emprunt non trouvé" });
    }

    const formattedBorrow = {
      user: `${borrow.user.name} ${borrow.user.firstName}`,
      startDate: borrow.startDate,
      endDate: borrow.endDate,
      motif: borrow.motif,
      Listborrow: borrow.Listborrow,
      status: borrow.status,
      // Ajoutez d'autres champs si nécessaire
    };

    res.json(formattedBorrow);
  } catch (error) {
    res.status(500).json({ 
      error: "Échec de la récupération de l'emprunt",
      details: error.message 
    });
  }
});

// Récupérer tous les emprunts acceptés
app.get("/borrows/accept", async (req, res) => {
  try {
    const borrows = await BorrowModel.find({ status: "accepté" }).populate([
      { path: "user", select: "name firstName email" }, // Récupérer le nom et l'email de l'utilisateur
    ]);

    const formattedBorrows = borrows.map((borrow, index) => ({
      // id: borrow._id,
      user: `${borrows[index].user.name + " " + borrows[index].user.firstName}`, // Nom de l'emprunteur
      startDate: borrow.startDate,
      endDate: borrow.endDate,
      motif: borrow.motif,
      Listborrow: borrow.Listborrow,
      status: borrow.status,
    }));
    res.json(formattedBorrows);
  } catch (error) {
    res.status(500).json({ error: "Échec de la récupération des emprunts acceptés" });
  }
});

// Récupérer tous les emprunts rejetés
app.get("/borrows/reject", async (req, res) => {
  try {
    const borrows = await BorrowModel.find({ status: "rejeté" }).populate([
      { path: "user", select: "name firstName email" }, // Récupérer le nom et l'email de l'utilisateur
    ]);

    const formattedBorrows = borrows.map((borrow, index) => ({
      // id: borrow._id,
      user: `${borrows[index].user.name + " " + borrows[index].user.firstName}`, // Nom de l'emprunteur
      startDate: borrow.startDate,
      endDate: borrow.endDate,
      motif: borrow.motif,
      Listborrow: borrow.Listborrow,
      status: borrow.status,
    }));
    res.json(formattedBorrows);
  } catch (error) {
    res.status(500).json({ error: "Échec de la récupération des emprunts rejetés" });
  }
});

// Accepter un emprunt
app.patch("/borrows/:id/accept", async (req, res) => {
  try {
    const borrow = await BorrowModel.findById(req.params.id);
    if (!borrow) return res.status(404).json({ error: "Emprunt non trouvé" });

    // si l'emprunt a déjà été accepté ou rejeté
    if (borrow.status === "accepté" || borrow.status === "rejeté") {
      return res.status(400).json({ error: `Cet emprunt a déjà été ${borrow.status}`});
    }

    borrow.status = "accepté";
    await borrow.save();

    res.json({ 
      success: true,
      message: "Emprunt accepté avec succès",
      newStatus: borrow.status
    });
  } catch (error) {
    res.status(500).json({
      error: "Échec de l'acceptation",
      details: error.message
    });
  }
});

// Refuser un emprunt
app.patch("/borrows/:id/reject", async (req, res) => {
  try {
    const borrow = await BorrowModel.findById(req.params.id);
    if (!borrow) return res.status(404).json({ error: "Emprunt non trouvé" });

    borrow.status = "rejeté";
    await borrow.save();

    res.json({ 
      success: true,
      message: "Emprunt rejeté avec succès",
      newStatus: borrow.status
    });
  } catch (error) {
    res.status(500).json({
      error: "Échec du rejet",
      details: error.message
    });
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
    const { email, salary, role, device } = req.body;

    // Vérifier si l'utilisateur existe dans UserModel
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (existingUser.userType === "Extern") {
      return res.status(400).json({
        message: "Cet utilisateur est un extern et ne peut devenir un membre",
      });
    }

    if (existingUser.userType === "Manager") {
      return res.status(400).json({
        message: "Cet utilisateur est un manager et ne peut devenir un membre",
      });
    }

    // Vérifier si l'utilisateur est déjà un membre
    const existingMember = await MemberModel.findOne({
      member: existingUser._id,
    });
    if (existingMember) {
      return res
        .status(400)
        .json({ message: "Cet utilisateur est déjà membre" });
    }

    // Mettre à jour userType en "membre"
    existingUser.userType = "Member";
    await existingUser.save();

    // Ajouter le nouvel utilisateur dans MemberModel
    const newMember = new MemberModel({
      member: existingUser._id,
      role,
      salary,
      device,
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
});

// Route pour supprimer un membre
app.delete("/remove_member/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;

    // Vérifier si le membre existe
    const member = await MemberModel.findOne({ member: memberId });

    if (!member) {
      return res.status(404).json({ error: "Membre non trouvé" });
    }

    // Suppression du membre dans MemberModel
    await MemberModel.findByIdAndDelete(member._id);

    // Mise à jour du usertype dans UserModel
    await UserModel.updateOne({ _id: member.member }, { userType: "Student" });

    res.json({
      message: "Membre supprimé et utilisateur mis à jour avec succès",
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Récupérer toutes les commandes du user connecté
app.get("/get_commands", async (req, res) => {
  try {

    // Récupérer toutes les commandes 
    const commands = await CommandModel.find()
      .populate("user", "name email") // infos utilisateur
      .populate("ListCommand.product_id"); // pour avoir les infos produits

    res.status(200).json(commands);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Route pour ajouter une commande
app.post("/add_command", async (req, res) => {
  // console.log(req.body);

  const Listproduct = [];

  try {
    const { date, listproduct } = req.body;

    console.log(listproduct, date);

    for (let i = 0; i < listproduct.length; i++) {
      Listproduct.push({
        product_id: listproduct[i]._id,
        quantity: listproduct[i].quantity,
      });
    }
    console.log(Listproduct);

    // Validation des champs
    if (!date || !listproduct) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Récupération de l'utilisateur pour valider qu'il existe
    const cookie = req.cookies.jwt;
    const data = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);

    // Liste de produits : Vérification si chaque produit existe et la quantité
    for (let item of listproduct) {
      const product = await ProductModel.findById(item._id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item._id} not found` });
      }
    }

    // Création de la commande
    const command = new CommandModel({
      user: data._id,
      startDate: date,
      ListCommand: Listproduct,
      status: "en attente",
    });

    console.log(command);

    // Sauvegarde dans la base de données
    await command.save();

    // Réponse de succès
    res
      .status(201)
      .json({ message: "Command registered successfully", command });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route pour supprimer les commandes
app.delete("/delete_command/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la commande existe
    const command = await CommandModel.findById(id);
    if (!command) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    // Supprimer la commande
    await CommandModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la commande :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour accepter les commandes
app.put("/command/accept/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la commande existe
    const command = await CommandModel.findById(id);
    if (!command) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    // Vérifier si la commande est déjà acceptée
    if (command.status === "accepté") {
      return res
        .status(400)
        .json({ message: "Cette commande est déjà acceptée" });
    }

    // Mettre à jour la quantité de chaque produit en stock
    for (let item of command.listproduct) {
      const product = await ProductModel.findById(item.product_id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Produit avec ID ${item.product_id} introuvable` });
      }

      product.quantity += item.quantity; // Augmenter la quantité en stock
      await product.save();
    }

    // Mettre à jour le statut de la commande en "accepté"
    command.status = "accepté";
    await command.save();

    res
      .status(200)
      .json({
        message: "Commande acceptée avec succès et stock mis à jour",
        command,
      });
  } catch (error) {
    console.error("Erreur lors de l'acceptation de la commande :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour rejeter les commandes
app.put("/command/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la commande existe
    const command = await CommandModel.findById(id);
    if (!command) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    // Mettre à jour le statut en "rejeté"
    command.status = "rejeté";
    await command.save();

    res.status(200).json({ message: "Commande rejetée avec succès", command });
  } catch (error) {
    console.error("Erreur lors du rejet de la commande :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { email, title, description, startDate, endDate } = req.body;

    // Vérifier que tous les champs requis sont présents
    if (!email || !title || !description || !startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    // Vérifier si l'utilisateur existe via son email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Créer une nouvelle tâche avec l'ID de l'utilisateur trouvé
    const newTask = new TaskModel({
      user: user._id, // Récupération de l'ID du User
      title,
      description,
      startDate,
      endDate,
    });

    // Sauvegarder la tâche en base de données
    await newTask.save();

    res
      .status(201)
      .json({ message: "Tâche ajoutée avec succès", task: newTask });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Modifier le statut à "fait"
app.put("/tasks/:id/done", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Chercher la tâche par son ID
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    // Mettre à jour le statut à "fait"
    task.status = "terminé";
    await task.save();

    res.status(200).json({ message: "Tâche marquée comme faite", task });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Modifier le statut à "non fait"
app.put("/tasks/:id/not-done", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Chercher la tâche par son ID
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    // Mettre à jour le statut à "non fait"
    task.status = "non fait";
    await task.save();

    res.status(200).json({ message: "Tâche marquée comme non faite", task });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Ajouter un article
app.post("/add_article", upload.array("images", 4), async (req, res) => {
  const { name, type, quantity, description, price, device } = req.body;
  const images = req.files;
  let ListImage = [];

  // console.log(images);

  if (!name || !type || !quantity || !description || !price || !device) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (images.length < 1) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  try {
    for (let i = 0; i < images.length; i++) {
      const savedImage = await new ImageModel({
        path: images[i].path,
        filename: images[i].filename,
      }).save();
      ListImage.push(savedImage._id);
    }

    console.log(ListImage);

    const article = new ArticleModel({
      name,
      type,
      quantity,
      description,
      price,
      device,
      image: ListImage,
    });

    const savedArticle = await article.save();

    res
      .status(201)
      .json({ message: "Article ajouté avec succès", savedArticle });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'article :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour recupérer les articles
app.get("/get_articles", async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    // console.log(articles);
    res.json(articles);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

app.put("/update_article/:id", upload.array("images", 4), async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'article depuis l'URL
  const { name, type, quantity, description, price, device } = req.body;
  const images = req.files;
  console.log(images);
  let ListImage = [];

  try {
    // Vérifier si l'article existe
    const existingArticle = await ArticleModel.findById(id);
    if (!existingArticle) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    for (let i = 0; i < images.length; i++) {
      if (i in existingArticle.image) {
        console.log(i + "in existingArticle.image");
    }
  }
    // Gérer les nouvelles images si fournies
    // if (images.length > 0) {
    //   for (let i = 0; i < images.length; i++) {

    //     const savedImage = await new ImageModel({
    //       path: images[i].path,
    //       filename: images[i].filename,
    //     }).save();
    //     ListImage.push(savedImage._id);
    //   }
    // } else {
    //   ListImage = existingArticle.image; // Garder les anciennes images
    // }
  
    // Mettre à jour l'article
    existingArticle.name = name || existingArticle.name;
    existingArticle.type = type || existingArticle.type;
    existingArticle.quantity = quantity || existingArticle.quantity;
    existingArticle.description = description || existingArticle.description;
    existingArticle.price = price || existingArticle.price;
    existingArticle.device = device || existingArticle.device;
    existingArticle.image = ListImage;

    console.log(existingArticle);

    // const updatedArticle = await existingArticle.save();

    res.status(200).json({ message: "Article modifié avec succès" });
  } catch (error) {
    console.error("Erreur lors de la modification de l'article :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// Route pour recupérer les emprunts et les afficher sur le calandrier
app.get("/calendar", async (req, res) => {
  try {
    const borrows = await BorrowModel.find().populate("user");
    const formattedBorrows = borrows.map((borrow) => ({
      id: borrow._id,
      title: `Emprunt de : ${borrow.user.name + " " + borrow.user.firstName}`, // Nom de l'emprunteur
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
