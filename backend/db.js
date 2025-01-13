const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(
            "mongodb+srv://Usi:UsiMongoDb@cluster0.fzhql.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0", 
            );

            console.log(`MongoDB Connected!`)

    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB
