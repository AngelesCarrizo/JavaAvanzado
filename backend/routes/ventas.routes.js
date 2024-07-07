import { Router } from "express"
import { createVentas,findById,findAll } from "../db/actions/ventas.actions.js"

const router = Router()

/*mongo */
router.post('/create',async(req,res)=>{
    const {usuario, total, direccion,productos} = req.body
    try{
        const result = await createVentas({usuario, total,direccion,productos})
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})


router.get('/allmongo',async(req,res)=>{
    try{
        const result = await findAll()
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})
router.get('/byId/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const result = await findById(id)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})

export default router


