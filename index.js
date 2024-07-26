import express  from 'express'
import { readFile, writeFile } from 'fs/promises'
import userRouter from './backend/routes/usuarios.routes.js'
import prodRouter from './backend/routes/productos.routes.js'
import venRouter from './backend/routes/ventas.routes.js'
import catRouter from './backend/routes/categoria.routes.js'

import 'dotenv/config'

const app = express()
const port = process.env.PORT 
app.use(express.json())

app.use('/cat', catRouter)
app.use('/user', userRouter)
app.use('/prod', prodRouter)
app.use('/ven', venRouter)
app.use('/imagenes', express.static('./frontend/imagenes'));
app.use(express.static('./frontend/pages/productos'))
app.use('/api',express.static('./frontend/api'))
app.use('/styles', express.static('./frontend/styles'));
app.use( express.static('./frontend/pages/historial'));
app.use( express.static('./frontend/pages/admin'));
app.use(express.static('./frontend/pages/login'))
app.use(express.static('./backend/db'))

    app.listen(port, () => {
        console.log(`Servidor levantado en el puerto ${port}`);
    });










