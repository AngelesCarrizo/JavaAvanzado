import { connectToDatabase } from "../connection.js"
import Ventas from "../schemas/ventas.schemas.js"

export const createVentas = async({usuario, total,direccion,productos})=>{
    try{
        await connectToDatabase()
        const res = await Ventas.create({usuario, total,direccion,productos})

        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}
export const findById = async(id)=>{
    try{
        await connectToDatabase()
        const res = await Ventas.findById(id).populate({path:"productos"})

        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const findAll = async()=>{
    try{
        await connectToDatabase()
        const res = await Ventas.find().populate({path:"productos"})

        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}