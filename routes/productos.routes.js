import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
const file = await readFile('./data/productos.json','utf-8')

const prodData = JSON.parse(file)
const router = Router()

/*Descripcion de un producto seleccionado por nombre*/ 
router.get('/productos/:nombre',(req,res)=>{
    const nom= req.params.nombre
    const result = prodData.find(e => e.nombre === nom)
    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json('No encontrado')
    }
   
})

/*ACTIVIDAD GET*/
/* consultar usuarios */
router.get('/allprod',(req,res)=>{
    res.status(200).json(prodData)
})

/*ACTIVIDAD PUT*/
/* actualizar stock*/ 
router.put('/prodput/stock/update/:id',(req,res)=>{
    const id = req.params.id
    const nuevostock= req.body.stock
    try{
        const index = prodData.findIndex(e => e.id == id)
        if(index != -1){
            prodData[index].stock = nuevostock
            writeFile('./productos.json', JSON.stringify(prodData));
            res.status(200).json('stock actualizado')
        }else{
            res.status(400).json(' el id no existe')
        }
    }catch(error){
        res.send(500).json('error al actualizar datos')
    }
   
})

export default router