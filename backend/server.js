const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser")
const ImageModel = require("./Models/image.js");
const itemModel = require("./Models/items.js");
const userModel = require("./Models/users.js");
const { authentification, typePermission, Role } = require("./permission/permission")
const userRoute = require("./routes/users")

const app = express();

connectDB();

// authorisation de source
const corsOption = {
  credentials: true,
  origin: ["http://localhost:5173"]
}

app.use(cookieParser())
app.use(cors(corsOption))
app.use(express.json())

app.use("/users", userRoute)

// S'execute avant chaque requette autre que ceux de login et register

app.get("/", async (req, res) => {
  const response = await itemModel.find();
  return res.json({ items: response });
});

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

//image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/single/", upload.single("image"), async (req, res) => {
  try {
    const { path, filename } = req.file;
    const image = await ImageModel({ path, filename });
    await image.save();
    res.send({ msg: "Image Uploaded" });
  } catch (error) {
    res.send({ error: "Error while uploading image" });
  }
});

app.use((req, res) => {
  res.status(404).json({message: "The url doesn't exist"})
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
