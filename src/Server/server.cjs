const express = require('express')
const connectDB = require('./db.cjs')
const itemModel = require("./Models/items.cjs")
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

connectDB() 


app.get("/", async(req, res) => {
    const response = await itemModel.find()
    return res.json({items : response})
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})