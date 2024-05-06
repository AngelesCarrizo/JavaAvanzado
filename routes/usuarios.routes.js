import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
const file = await readFile('./data/usuarios.json','utf-8')

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
 router.post('/nuevouspost',(req,res)=>{
    const obj= req.body.id
    const result = userData.find(e => e.id != obj)
    userData.push();
    writeFile('./usuarios.json',JSON.stringify(userData,null,2));
    if(result){
        res.status(200).json('usuario creado')
    }else{
        res.status(400).json('error al crear')
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

export default router