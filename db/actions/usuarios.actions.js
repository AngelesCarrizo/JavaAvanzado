import { connectToDatabase } from "../connection.js"
import Usuarios from "../schemas/usuarios.schemas.js"

export const createUser = async({nombre, apellido, email,contraseña})=>{
    try{
        await connectToDatabase()
        const res = await Usuarios.create({nombre, apellido, email,contraseña})
        
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}