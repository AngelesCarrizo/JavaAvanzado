import { Router } from "express"
import { createProd, findAll,findById,findByCategory,updateNameById, deleteById } from ".././db/actions/productos.actions.js"


const router = Router()


// Agregar producto al carrito por ID
router.post('/agregar', async (req, res) => {
    try {
        const productId = req.body._id; 
        console.log('Received product ID:', productId);

        // Validar que el ID sea válido
        if (!productId) {
            return res.status(400).json({ message: 'ID de producto no proporcionado' });
        }

        // Buscar el producto por su ID
        const product = await findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Enviar el producto encontrado como respuesta
        res.status(200).json(product);
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
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
router.get('/allprod', async(req,res)=>{
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
    const category=req.params.categoria
    try{
        const result = await findByCategory(category)
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
/* eliminar producto  */

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
