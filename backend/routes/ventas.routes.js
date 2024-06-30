import { Router } from "express"
import { createVentas,findById,findAll } from "../../db/actions/ventas.actions.js"
import { readFile, writeFile } from 'fs/promises'
const file = await readFile('./backend/data/ventas.json','utf-8')

const venData = JSON.parse(file)
const router = Router()


/* Crear una nueva venta */
router.post('/nueva', async (req, res) => {
    const { id_usuario, direccion, productos } = req.body
    if (!direccion || !productos || productos.length === 0) {
        return res.status(400).json('La dirección y los productos son requeridos')
    }

    const total = productos.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
    const nuevaVenta = {
        id: venData.length + 1,
        id_usuario,
        fecha: new Date().toISOString().split('T')[0],
        total,
        direccion,
        productos
    }
    
    venData.push(nuevaVenta)
    
    try {
        await writeFile('./backend/data/ventas.json', JSON.stringify(venData, null, 2))
        res.status(201).json(nuevaVenta)
    } catch (error) {
        res.status(500).json('Error al crear la venta')
    }
})
/*mongo */
router.post('/create',async(req,res)=>{
    const {usuario, total,direccion,productos} = req.body
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

