const Model = require('../models/Model')

const getModelsByBrandId = async (brandId) => {
  try {
    return Model.find({
      brand: brandId
    }).select('id model averagePrice -_id')
  } catch (error) {
    return error.message
  }
}

const getModels = async (greater, lower) => {
  try {
    let filter = {};

    if (greater) {
      filter.averagePrice = {
        ...filter.averagePrice,
        $gt: Number(greater) 
      }
    }

    if (lower) {
      filter.averagePrice = { 
        ...filter.averagePrice,
        $lt: Number(lower) 
      }
    }

    const models = await Model.find(filter).select('id model averagePrice -_id')

    const formattedModels = models.map(model => ({
      id: model.id,
      name: model.model,
      average_price: model.averagePrice
    }))  

  return formattedModels
  } catch (error) {
    return error.message
  }
}

const updateModel = async (id, newPrice) => {
  try {
    const updatedModel = await Model.findOneAndUpdate(
      { id: id },
      { averagePrice: newPrice },
      { new: true }
    )

    if (!updatedModel) {
      return {
        message: 'Model not found'
      }
    }

    return updatedModel
  } catch (error) {
    error.message
  }
}

module.exports = {
  getModelsByBrandId,
  getModels,
  updateModel
}