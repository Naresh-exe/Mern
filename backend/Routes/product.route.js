import express from"express"
import Product from "../models/product.model.js"
const routes=express.Router()
routes.get("/",async(req,res)=>{
    try{
        const products=await Product.find({})
        res.status(200).json({success:true,data:products})
    }
    catch(error){
        res.status(500).json({success:false,message:"server Error"})
    }
})
routes.post("/",async(req,res)=>{
    const product=req.body
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success:false, message:"Please provide all fields"})
    }
    const newProduct=new Product(product)
    try{
        await newProduct.save()
        res.status(201).json({ success:true,data:newProduct})

    }
    catch(error){
        console.error("Error in creating product:",error.message)
        res.status(500).json({success:false,message:"Server Error"})

    }
})
routes.put("/:id",async(req,res)=>{
    const {id}=req.params
    const product=req.body
    try{
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true,message:"Successfully updated",data:updatedProduct})
    }
    catch(error){
        res.status(500).json({success:false,message:"Cannot find the id"})
    }
})
routes.delete("/:id",async(req,res)=>{
    const {id}=req.params
    try{
        await Product.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Product deleted"})
    }
    catch(error){
        res.status(500).json({success:false,message:"Product not found"})
    }
})

export default routes