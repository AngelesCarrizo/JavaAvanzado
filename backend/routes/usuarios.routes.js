import { Router } from "express"
import { createUser,findUserByName , findAllUsuarios} from "../db/actions/usuarios.actions.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

import { verifyToken } from "../utils/middleware.js"
import 'dotenv/config';


const SECRET = "D9HeJsfngORdA_vjNWV8Y77K_8tBlqoYvVQ4oL0SAw4NG9EhmQu1IzRRjLnfrtfV";
const router = Router()



/*crear usuario en la base */
router.post('/create',async(req,res)=>{
    const {nombre, apellido, email,contraseña} = req.body
    try{
     const result = await createUser({nombre, apellido, email,contraseña})
     console.log(result)
     res.status(200).json(result)
    
    }
     catch(error){
         res.status(400).json()
     }
     
 })
 router.get('/all', async(req,res)=>{
    try{
        const result = await findAllUsuarios()
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
    
})

/*consulta con datos sensibles como contraseña en la base*/
router.post('/uspost',async(req,res)=>{
   
    const obj= req.body.objeto
    const result = await findUserByName(e => e.nombre === obj)
    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json('No encontrado')
    }
})



router.post('/login', async (req, res) => {
    const { nombre, contraseña } = req.body;

    try {
        const result = await findUserByName(nombre);

        if (!result) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        const controlPass = bcrypt.compareSync(contraseña, result.contraseña);
        console.log(controlPass);

        if (!controlPass) {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ ...result }, SECRET, { expiresIn: 86400 });

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error en el servidor' });
    }
});

export default router