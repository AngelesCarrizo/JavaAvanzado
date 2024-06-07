import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
const file = await readFile('./backend/data/ventas.json','utf-8')

const venData = JSON.parse(file)
const router = Router()

/* Crear una nueva venta */
router.post('/nueva', async (req, res) => {
    const { id_usuario, direccion, productos } = req.body
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


export default router

