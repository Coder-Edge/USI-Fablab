require("dotenv").config()
const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.LOCAL_DB_URI); // Changer 'LOCAL_DB_URI'(offline) par 'ATLAS_URI'(online) ou inverse suivant le type de base des données utilisé
        console.log(`MongoDB Connected!`)

    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB