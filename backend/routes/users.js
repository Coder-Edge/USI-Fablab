const router = require("express").Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../Models/users");
const { authentification, typePermission, Role, unknownPermission }= require("../permission/permission")
const { config } = require("dotenv");
config()

router.post("/login", unknownPermission, async (req, res) => {
    const { email, password } = req.body    
    const user = await userModel.findOne({ email: email })

    if (!user) {
        return res.status(400).json({ message: "Request fail" })
    }

    if (! await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: "fail"})
    }

    const accessToken = jwt.sign({ _id: user._id.toString() }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 2 })

    res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({ message: "success" })

});

router.get("/protected", authentification, typePermission([Role.student]), async (req, res) => {
    let type
    try {
        const cookies = req.cookies
        const data = jwt.verify(cookies.jwt, process.env.ACCESS_TOKEN_SECRET)

        res.json({message: "Merci beaucoup"})
       
    } catch(err) {
        return res.status(401).json({message: "Request fail"})
    }
})

router.post("/logout", (req, res) => {
    res.clearCookie("jwt", { httpOnly: true})
    console.log(req.cookies.jwt);
    
    res.json({ message: "Cookie deleted" })
})

router.post("/registre", async (req, res) => {
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



module.exports = router