import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import { createUser } from "../../db/actions/usuarios.actions.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
/*import { decodeToken } from "./middleware.js"*/
import { verifyToken } from "./middleware.js"
const file = await readFile('./backend/data/usuarios.json','utf-8')

const SECRET = "D9HeJsfngORdA_vjNWV8Y77K_8tBlqoYvVQ4oL0SAw4NG9EhmQu1IzRRjLnfrtfV";
const userData = JSON.parse(file)
const router = Router()

/*ACTIVIDAD GET*/
/* consultar usuarios */
router.get('/all',(req,res)=>{
    res.status(200).json(userData)
})


/*ACTIVIDAD POST*/
/*consulta con datos sensibles como contraseña*/
router.post('/uspost',(req,res)=>{
   
    const obj= req.body.objeto
    const result = userData.find(e => e.nombre === obj)
    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json('No encontrado')
    }

    
})
 /*crear nuevo usuario*/
 router.post('/nuevouspost',async (req,res)=>{
    const {nombre,apellido,email,contraseña} = req.body

if (!await verifyToken(token)){
        return res.status(400).json({status: false})
} 
  try{
  const hashedPass = bcrypt.hashSync(contraseña, 8);
  console.log(hashedPass)
  const id = userData.length > 0 ? userData[userData.length-1].id +1 :1
  userData.push({id,nombre,apellido,email,contraseña:hashedPass})
  writeFile('./backend/data/usuarios.json', JSON.stringify(userData,null,2))
   res.status(200).json({status:true})
  }
  catch(error){
  console,log(error)
  res.status(400).json({status:false})
}
    
})

/*ACTIVIDAD PUT*/
 


/* eliminar usuario*/ 
router.put('/usuarioput/delete/:id',(req,res)=>{
    const id = req.params.id
    
    try{
        const index = userData.findIndex(e => e.id == id)
        if(index != -1){
            userData.splice(index,1) 
            writeFile('./usuarios.json', JSON.stringify(userData,null,2));
            res.status(200).json('usuario eliminado')
        }else{
            res.status(400).json(' el id no existe')
        }
    }catch(error){
        res.send(500).json('error al eliminar usuario')
    }
   
})
router.post('/login', (req, res)=>{
    const nombre = req.body.nombre
    const contraseña = req.body.contraseña

    const result = userData.find(e => e.nombre === nombre)
    
    if(!result){
        return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    const controlPass = bcrypt.compareSync(contraseña,result.contraseña)
    console.log(controlPass)
    if(!controlPass){
        return res.status(401).send({ message: 'Contraseña incorrecta' });
    }
    
    const token = jwt.sign({ ...result}, SECRET , { expiresIn: 86400 })
        
        res.status(200).json({ token })
   
})
router.post('/decodeToken',async (req,res)=>{
    const token = req.body.token

    const result = await decodeToken(token)
    console.log(result)
    res.status(200).json(result)
})
/*Mogo */
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
export default router