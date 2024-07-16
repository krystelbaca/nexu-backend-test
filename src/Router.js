const express = require('express')

const router = express.Router()

const { 
  getAllBrands,
  getModelsByBrand,
  createNewBrand
} = require('./controllers/BrandController')

router.get('/brands', getAllBrands)

router.get('/brands/:brand/models', getModelsByBrand)

router.post('/brands', createNewBrand)

router.post('/brands/:id/models')

router.put('/models/:id')

router.get('/models')

module.exports = router