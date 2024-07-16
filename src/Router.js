const express = require('express')

const router = express.Router()

const { 
  listAllBrands,
  addNewBrand
} = require('./controllers/BrandController')

const { 
  listModelsByBrandId,
  listModels,
  editModel 
} = require('./controllers/ModelController')

router.get('/brands', listAllBrands)

router.get('/brands/:id/models', listModelsByBrandId)

router.post('/brands', addNewBrand)

router.post('/brands/:id/models')

router.put('/models/:id', editModel)

router.get('/models', listModels)

module.exports = router