const mongoose = require('mongoose')

const fs = require('fs')
const path = require('path')

const Model = require('../models/Model')
const Brand = require('../models/Brand')

const mongoURI = 'mongodb://localhost:27017/nexu-cars'

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log('Connected to MongoDB')

    await Model.deleteMany({})
    await Brand.deleteMany({});
    console.log('Existing data cleared')

    const dataPath = path.join(__dirname, 'models.json')
    const data = fs.readFileSync(dataPath, 'utf8')
    const cars = JSON.parse(data)

    const brands = [...new Set(cars.map(car => car.brand_name))]

    const brandDocuments = brands.map(brand => ({ name: brand }))
    
    const insertedBrands = await Brand.insertMany(brandDocuments)
    console.log('Brands imported successfully');

    const brandMap = insertedBrands.reduce((acc, brand) => {
      acc[brand.name] = brand._id
      return acc
    }, {})

    const modelDocuments = cars.map(car => ({
      id: car.id,
      model: car.name,
      averagePrice: car.average_price,
      brand: brandMap[car.brand_name],
    }))

    await Model.insertMany(modelDocuments)
    console.log('Data imported successfully')

    mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    mongoose.disconnect()
  }
}

seedDatabase()
