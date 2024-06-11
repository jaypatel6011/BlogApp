const express = require("express");
const cors = require("cors")
require("dotenv").config()
const dbConnect = require("./config/dataBase")
const blogRouter = require("./routes/blog")
const cookieParser = require("cookie-parser")

PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
   
  }))

  app.use("/api/v1", blogRouter)

  app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
  })

  dbConnect()

  app.get("/",(req,res)=>{
    res.send({
      message:"app start"
    })
  })
