const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/authRoutes")
const cors = require("cors")
const blogRoute = require("./routes/blogRoutes")

app.use(cors())
dotenv.config()
app.use(express.json())
app.use("/auth",authRoute)
app.use("/blog",blogRoute)

mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("Database Connected")).catch((err)=>console.log(err))


app.listen(process.env.PORT,()=>{
console.log(`listening from port ${process.env.PORT}`)
})

app.get("/",(req,res)=>{
res.send("Welcome to the other side")
})

