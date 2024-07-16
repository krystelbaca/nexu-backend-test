const express = require('express')

const mongoose = require('mongoose')

const app = express()

const router = require('./Router')

const PORT = 3002

const mongoURI = 'mongodb://localhost:27017/nexu-cars'
mongoose.connect(mongoURI)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'))
db.once('open', () => {
  console.log('Service connected to MongoDB successfully')
})

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Service running at port ${PORT}`)
})

module.exports = app