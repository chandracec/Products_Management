const express = require("express")
const route = require("./routes/route")
const mongoose = require("mongoose")
const multer = require("multer")
const app = express()

app.use(express.json())
app.use(multer().any())

mongoose.connect("mongodb+srv://chandrakant91550:85A3tszzv0FScC1w@cluster0.lcv0ktb.mongodb.net/Products_Management",
   {useNewUrlParser : true}
)
.then(()=>console.log("mongoDB Is connected"))
.catch((err)=>console.log(err))

app.use("/",route)

app.listen(process.env.Port || 3000 ,()=>{
    console.log("Express app running on Port",(process.env.Port || 3000) )
})