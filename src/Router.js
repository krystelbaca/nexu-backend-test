const express = require('express')

const router = express.Router()

const { 
  listAllBrands,
  addNewBrand,
  addModelToBrand
} = require('./controllers/BrandController')

const { 
  listModelsByBrandId,
  listModels,
  editModel,
} = require('./controllers/ModelController')

router.get('/brands', listAllBrands)

router.get('/brands/:id/models', listModelsByBrandId)

router.post('/brands', addNewBrand)

router.post('/brands/:id/models', addModelToBrand)

router.put('/models/:id', editModel)

router.get('/models', listModels)

module.exports = router