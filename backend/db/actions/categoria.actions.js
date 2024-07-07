import { connectToDatabase } from "../connection.js"
import Product from "../schemas/productos.schemas.js"
import Category from "../schemas/categoria.schemas.js"

export const createCategory = async(nombre)=>{
    try{
        await connectToDatabase()
        const res = await Category.create({nombre})
        
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const findAll = async()=>{
    try{
        await connectToDatabase()
        const res = await Category.find()
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}