import { Router } from "express"
import { createCategory ,findAll} from ".././db/actions/categoria.actions.js"

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

 export default router