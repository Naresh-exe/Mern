import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './config/db.js'
import routes from './Routes/product.route.js'
const app=express()
dotenv.config()
app.use(express.json())
app.use("/api/products",routes)

app.listen(4000,()=>{
    connectDB()
    console.log("Server started at http://localhost:4000")
})
