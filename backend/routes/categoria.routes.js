import { Router } from "express"
import { createCategory ,findAll} from "../../db/actions/categoria.actions.js"
import { readFile, writeFile } from 'fs/promises'
const file = await readFile('./backend/data/productos.json','utf-8')


const router = Router()
/*mongo*/

router.get('/all',async(req,res)=>{
    try{
        const result  =await findAll()
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})
/*crear categoria en la base */
router.post('/create',async(req,res)=>{
    const {nombre} = req.body;
    try{
        const result = await createCategory(nombre)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})
router.get('/allmongo', async(req,res)=>{
    try{
        const result = await findAll()
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
    
})
 export default router