const mongoose = require('mongoose')

const fs = require('fs')
const path = require('path')

const Car = require('../models/')

const mongoURI = 'mongodb://localhost:27017/nexu-cars'

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log('Connected to MongoDB')

    await Car.deleteMany({})
    console.log('Existing data cleared')

    const dataPath = path.join(__dirname, 'models.json')
    const data = fs.readFileSync(dataPath, 'utf8')
    const cars = JSON.parse(data)

    const carDocuments = cars.map(car => ({
      id: car.id,
      model: car.name,
      averagePrice: car.average_price,
      brand: car.brand_name,
    }))

    await Car.insertMany(carDocuments)
    console.log('Data imported successfully')
    mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    mongoose.disconnect()
  }
}

seedDatabase()
