import express from 'express'
import mongoose from 'mongoose'
import {v4 as uuidv4} from "uuid"

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()

mongoose.connect('mongodb://root:password@mongo_project:27017/miapp?authSource=admin')

const getAnimales = async () => await Animal.find()

app.get('/', async (_req, res) => {
  const animales = await getAnimales()
  console.log('listando... chanchitos...')
  const uuidKey = uuidv4()
  console.log ("desde adentro del contenedor, uuid: ", uuidKey)
  console.log ("desde compose")
  return res.json({
    cantidad: animales.length,
    animales
  })
})
app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' })
  return res.send('ok')
})

app.listen(3000, () => console.log('listening...'))
