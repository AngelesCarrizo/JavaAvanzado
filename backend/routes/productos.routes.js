import { Router } from "express"
import { createProd, findAll,findById,findByCategory,updateNameById, deleteById } from "../../db/actions/productos.actions.js"
import { readFile, writeFile } from 'fs/promises'
const file = await readFile('./backend/data/productos.json','utf-8')

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
/* consultar productos */
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
router.post('/agregar',(req,res)=>{
   
    const obj= req.body.id
    const result = prodData.find(e => e.id === obj)
    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json('No encontrado')
    }
})
/*mongo*/
/*crear producto en la base */
router.post('/create',async(req,res)=>{
   const {categoria,nombre, desc, precio,imagen, stock} = req.body
   try{
    const result = await createProd({categoria,nombre, desc, precio,imagen, stock})
    console.log(result)
    res.status(200).json(result)
   
   }
    catch(error){
        res.status(400).json()
    }
    
})
/* consultar productos */
router.get('/allmongo', async(req,res)=>{
    try{
        const result = await findAll()
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
    
})

/* filtrar id */
router.get('/byId/:id', async(req,res)=>{
    const id=req.params.id
    try{
        const result = await findById(id)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
    
})

/* filtrar categoria */
router.get('/cat/:categoria', async(req,res)=>{
    const categoria=req.params.categoria
    try{
        const result = await findByCategory(categoria)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
    
})
router.patch('/updateByName/:id',async(req,res)=>{
    const id = req.params.id
    const {nombre} = req.body
  
    try{
        const result = await updateNameById(nombre, id)
       
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})

router.delete('/deleteById/:id',async(req,res)=>{
    const id = req.params.id
  
    try{
        const result = await deleteById(id)
       
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})
export default router
