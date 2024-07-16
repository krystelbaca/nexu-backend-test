const {
  getModelsByBrandId,
  getModels,
  updateModel
} = require('../services/ModelService')

const listModelsByBrandId = async (req, res) => {
  const { brandId } = req.params
  try {
    const models = await getModelsByBrandId(brandId)
    res.status(200).json(models.map(model => ({
      id: model.id,
      name: model.model,
      average_price: model.averagePrice,
    })))
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving models',
      error: error.message
    })
  }
}

const listModels = async (req, res) => {
  const { greater, lower } = req.query
  try {
    const models = await getModels(greater, lower)
    res.status(200).json(models)
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving models',
      error: error.message
    })
  }
}

const editModel = async (req, res) => {
  const { id } = req.params

  try {
    const response = await updateModel(id, body)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({
      message: 'Error editing model',
      error: error.message
    })
  }
}

module.exports = {
  listModelsByBrandId,
  listModels,
  editModel
}