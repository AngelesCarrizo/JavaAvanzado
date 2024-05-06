import express  from 'express'
import { readFile, writeFile } from 'fs/promises'
import userRouter from './routes/usuarios.routes.js'
import prodRouter from './routes/productos.routes.js'
import venRouter from './routes/productos.routes.js'

const app = express()
const port = 3000
app.use(express.json())

app.use('/user', userRouter)
app.use('/prod', prodRouter)
app.use('/ven', venRouter)

app.listen(port,()=>{
    console.log(`Servidor levantado en el puerto ${port}`)
})









