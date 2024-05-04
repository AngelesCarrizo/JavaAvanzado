import express, { json } from 'express'
import { readFile, writeFile } from 'fs/promises'


const app = express()
const port = 3000
app.use(express.json())

app.listen(port,()=>{
    console.log(`Servidor levantado en el puerto ${port}`)
})
const file = await readFile('./usuarios.json','utf-8')

const file2 = await readFile('./productos.json','utf-8')

const userData = JSON.parse(file)
const prodData = JSON.parse(file2)
/*ACTIVIDAD GET*/
/* consultar usuarios */
app.get('/users/all',(req,res)=>{
    res.status(200).json(userData)
})
/*Descripcion de un producto seleccionado por nombre*/ 
app.get('/productos/:nombre',(req,res)=>{
    const nom= req.params.nombre
    const result = prodData.find(e => e.nombre === nom)
    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json('No encontrado')
    }
   
})

/*ACTIVIDAD POST*/
/*consulta con datos sensibles como contraseña*/
app.post('/uspost',(req,res)=>{
   
    const obj= req.body.objeto
    const result = userData.find(e => e.nombre === obj)
    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json('No encontrado')
    }

    
})
 /*crear nuevo usuario*/
app.post('/nuevouspost',(req,res)=>{
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
/* actualizar stock*/ 
app.put('/prodput/stock/update/:id',(req,res)=>{
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

/* eliminar usuario*/ 
app.put('/usuarioput/delete/:id',(req,res)=>{
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


