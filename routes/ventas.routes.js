import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
const file = await readFile('./data/ventas.json','utf-8')

const venData = JSON.parse(file)
const router = Router()






export default router