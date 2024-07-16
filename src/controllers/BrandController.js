const { 
  getBrands,
  createBrand
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

module.exports = {
  listAllBrands,
  addNewBrand
}