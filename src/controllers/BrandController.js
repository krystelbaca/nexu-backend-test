const { 
  getBrands,
  createBrand,
  createNewModelToBrand
} = require('../services/BrandService')

const listAllBrands = async (req, res) => {
  try {
    const brands = await getBrands()
    res.status(200).json(brands)
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving brands',
      error 
    })
  }
}

const addNewBrand = async (req, res) => {
  try {
    const { body } = req
    const brand = await createBrand(body)

    res.status(201).json(brand)
  } catch (error) {
    res.status(500).json({
      message: 'Error creating a new brand',
      error 
    })
  }
}

const addModelToBrand = async (req, res) => {
  const { id: brandId } = req.params
  const { name, average_price } = req.body

  if (average_price !== undefined && average_price <= 100000) {
    return res.status(400).json({
      message: 'The average price must be greater than 100,000'
    })
  }

  try {
    const response = await createNewModelToBrand(brandId, name, average_price);
    if (response.message) {
      if (response.message === 'Brand not found') {
        return res.status(404).json(response)
      }
      if (response.message === 'Model name already exists for this brand') {
        return res.status(400).json(response)
      }
      return res.status(500).json(response)
    }

    return res.status(201).json(response)
  } catch (error) {
    res.status(500).json({
      message: 'Error adding new model to brand',
      error: error.message
    })
  } 
}

module.exports = {
  listAllBrands,
  addNewBrand,
  addModelToBrand
}