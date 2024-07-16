const {
  getModelsByBrandId,
  getModels,
  updateModel
} = require('../services/ModelService')

const listModelsByBrandId = async (req, res) => {
  const { id } = req.params
  try {
    const models = await getModelsByBrandId(id)

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
  const { average_price } = req.body

  try {
    if (average_price <= 100000) {
      return res.status(400).json({
        message: 'The new price must be greater than 100,000'
      })
    }

    const response = await updateModel(id, average_price)

    if (response.message === 'Model not found') {
      return res.status(404).json(response);
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({
      message: 'Error updating model price',
      error: error.message
    })
  }
}

module.exports = {
  listModelsByBrandId,
  listModels,
  editModel
}