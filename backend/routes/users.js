const router = require("express").Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../Models/users");
const { authentification, unknownPermission } = require("../permission/permission")
const { config } = require("dotenv");
config()

router.post("/login", unknownPermission, async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email: email })

    if (!user) {
        return res.status(400).json({ message: "Bad email" })
    }

    if (! await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: "Bad password" })
    }

    const accessToken = jwt.sign({ _id: user._id.toString() }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" })

    res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    const {name, userType} = user

    res.status(200).json({ message: "success", user: {name, email,userType}})

});

router.post("/logout", authentification, (req, res) => {
    res.clearCookie("jwt", { httpOnly: true })
    res.json({ message: "Cookie deleted" })
})

router.post("/registre", unknownPermission, async (req, res) => {
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
            usersToInsert.password = await bcrypt.hash(usersToInsert.password, parseInt(process.env.DECRIPT_SALT));
            // Insère l'utilisateur s'il n'existe pas
            const insertedUser = await userModel.create(usersToInsert);
        }

        res.status(200).json({ message: "Opération terminée" });
    } catch (error) {
        console.error("Erreur lors de l'insertion des utilisateurs :", error);
        res
            .status(500)
            .json({ message: "Erreur lors de l'insertion des utilisateurs", error });
    }
});

router.get("/user", authentification,async (req, res) => {
    try {
        user = await userModel.findById(req.user)
        const { name, email, userType } = user
        res.status(200).json({ message: "Success", user: { name, email, userType }})

    } catch (err) { return res.status(404).json({ message: "No user with that id" }) }
})

module.exports = router