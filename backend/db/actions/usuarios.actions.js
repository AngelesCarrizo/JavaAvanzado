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
export const findUserByName = async (nombre) => {
    try {
        await connectToDatabase();
        const res = await Usuarios.findOne({ nombre });
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const findAllUsuarios = async () => {
    try {
        await connectToDatabase();
        const usuarios = await Usuarios.find(); 
        return usuarios;
    } catch (error) {
        console.error(error);
        throw new Error('Error al buscar todos los usuarios');
    }
};