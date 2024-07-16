const { listBrand, listModelsByBrand } = require('../services/BrandService')
const getAllBrands = async (req, res) => {
  try {
    const brands = await listBrand()
    res.status(200).json(brands)
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving brands',
      error 
    })
  }
}

const getModelsByBrand = async (req, res) => {
  /**
   * The requirement says by brandId, 
   * but to use the data provided I changed for brand name
   */
  try {
    const { brand } = req.params

    const models = await listModelsByBrand(brand)

    res.status(200).json(models)
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving models',
      error 
    })
  }
}

module.exports = {
  getAllBrands,
  getModelsByBrand
}