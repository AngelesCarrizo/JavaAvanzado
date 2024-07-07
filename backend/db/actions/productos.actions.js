import { connectToDatabase } from "../connection.js"
import Product from "../schemas/productos.schemas.js"

export const createProd = async({categoria,nombre, desc, precio,imagen, stock})=>{
    try{
        await connectToDatabase()
        const res = await Product.create({categoria,nombre, desc, precio,imagen, stock})
        
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const findAll = async()=>{
    try{
        await connectToDatabase()
        const res = await Product.find().populate({path:"categoria"})
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const findById = async(id)=>{
    try{
        await connectToDatabase()
        const res = await Product.findById(id).populate({path:"categoria"})
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const findByCategory = async(categoria)=>{
    try{
        await connectToDatabase()
        const res = await Product.find({categoria}).populate({path:"categoria"})
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const updateNameById = async(nombre, id)=>{
    try{
        await connectToDatabase()
        const res = await Product.findByIdAndUpdate(id,{nombre})
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const deleteById = async(id)=>{
    try{
        await connectToDatabase()
        const res = await Product.findByIdAndDelete(id)
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}


