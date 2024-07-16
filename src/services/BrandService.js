const Car = require('../models/')

const listBrand = async () => {
  try {
    return Car.distinct('brand')
  } catch (error) {
    return error.message
  }
}

const listModelsByBrand = async (brand) => {
  try {
    return Car.find({ brand }).select('id model averagePrice -_id')
  } catch (error) {
    return error.message
  }
}

const createBrand = async () => {
  try {

  } catch (error) {

  }
}

module.exports = {
  listBrand,
  listModelsByBrand,
  createBrand
}