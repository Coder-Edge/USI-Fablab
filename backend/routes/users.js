const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/users");
const {
  authentification,
  unknownPermission,
} = require("../permission/permission");
const { config } = require("dotenv");
const { Role } = require("../permission/role");
config();

router.post("/login", unknownPermission, async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "Email incorrect", email: true });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Mot de passe incorrect", password: true });
  }

  const accessToken = jwt.sign(
    { _id: user._id.toString(), email: user.email, name: user.name, role: user.userType },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", accessToken, {
    httpOnly: true,
    sameSite: "lax", // ou "none" si HTTPS
    secure: false,   // true si HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  const { name, userType } = user;

  res.status(200).json({ message: "success", user: { name, email, userType } });
});

router.post("/logout", authentification, (req, res) => {
  res.clearCookie("jwt", { httpOnly: true });
  res.json({ message: "Cookie deleted" });
});

router.post("/registre", unknownPermission, async (req, res) => {
  const usersToInsert = req.body; // Les utilisateurs envoyés dans la requête POST

  try {
    // Vérifie si l'utilisateur existe déjà par son email
    const existingUser = await userModel.findOne({
      email: usersToInsert.email,
    });

    if (existingUser) {
      return res.status(401).json({ message: "Cet email est déjà utilisé" });
    }

    usersToInsert.password = await bcrypt.hash(
      usersToInsert.password,
      parseInt(process.env.DECRIPT_SALT)
    );

    // set role
    const emailRegex =
      /^(?:<)?([a-zA-Z.-]+)@(\d{4})\.(icam\.fr|ulc-icam\.com)(?:>)?$/;

    if (emailRegex.test(usersToInsert.email)) {
      usersToInsert.userType = Role.student; // L'e-mail est valide
    } else {
      usersToInsert.userType = Role.extern; // L'e-mail est invalide
    }

    // Insère l'utilisateur s'il n'existe pas
    await userModel.create(usersToInsert);

    res.status(200).json({ message: "Utilisateur enregistré" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'insertion des utilisateurs", error });
  }
});

router.get("/user", authentification, async (req, res) => {
  try {
    user = await userModel.findById(req.user);
    const { id, name, firstName, email, userType } = user;

    res
      .status(200)
      .json({ message: "Success", user: { id, name, firstName, email, userType } });
  } catch (err) {
    return res.status(404).json({ message: "No user with that id" });
  }
});

router.get("/userauth", async (req, res) => {

  const cookie = req.cookies.jwt
  if (!cookie) return res.status(404).json({ message: "No user found", user: null, success: false, code: 404 })

  try {
    const data = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET,)
    user = await userModel.findById(data._id);
    const { name, email, userType } = user;
    res
      .status(200)
      .json({ message: "Success", user: { name, email, userType }, success: true, code: 200 });

  } catch (err) {
    return res.status(401).json({ message: "Token expired ou invalide", user: null, success: false, code: 401 })
  }
});

module.exports = router;
