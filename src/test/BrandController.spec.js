const { 
  listAllBrands,
  addNewBrand, 
  addModelToBrand 
} = require('../controllers/BrandController')
const brandService = require('../services/BrandService')
const { mockRequest, mockResponse } = require('jest-mock-req-res')

jest.mock('../services/BrandService')

describe('BrandController', () => {
  let req, res, next

  beforeEach(() => {
    req = mockRequest()
    res = mockResponse()
    next = jest.fn()
  })

  describe('listAllBrands', () => {
    it('should return all brands', async () => {
      const brands = [
        { id: 1, name: 'Brand1' },
        { id: 2, name: 'Brand2' }
      ]
      brandService.getBrands.mockResolvedValue(brands)

      await listAllBrands(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(brands)
    })

    it('should handle errors', async () => {
      const errorMessage = 'Error retrieving brands'
      brandService.getBrands.mockRejectedValue(new Error(errorMessage))

      await listAllBrands(req, res, next)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error retrieving brands',
        error: expect.any(Error)
      })
    })
  })

  describe('addNewBrand', () => {
    it('should create a new brand', async () => {
      const brand = { id: 1, name: 'NewBrand' }
      req.body = { name: 'NewBrand' }
      brandService.createBrand.mockResolvedValue(brand)

      await addNewBrand(req, res, next)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(brand)
    })

    it('should handle errors', async () => {
      const errorMessage = 'Error creating a new brand'
      req.body = { name: 'NewBrand' }
      brandService.createBrand.mockRejectedValue(new Error(errorMessage))

      await addNewBrand(req, res, next)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error creating a new brand',
        error: expect.any(Error)
      })
    })
  })

  describe('addModelToBrand', () => {
    it('should return 400 if the average price is less than or equal to 100,000', async () => {
      req.params.id = '1'
      req.body = { name: 'Model1', average_price: 100000 }
      await addModelToBrand(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: 'The average price must be greater than 100,000'
      })
    })

    it('should return 404 if the brand is not found', async () => {
      req.params.id = '1'
      req.body = { name: 'Model1', average_price: 150000 }
      const response = { message: 'Brand not found' }
      brandService.createNewModelToBrand.mockResolvedValue(response)

      await addModelToBrand(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith(response)
    })

    it('should return 400 if the model name already exists for the brand', async () => {
      req.params.id = '1'
      req.body = { name: 'Model1', average_price: 150000 }
      const response = { message: 'Model name already exists for this brand' }
      brandService.createNewModelToBrand.mockResolvedValue(response)

      await addModelToBrand(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(response)
    })

    it('should create a new model for the brand', async () => {
      req.params.id = '1'
      req.body = { name: 'Model1', average_price: 150000 }
      const newModel = { id: 1, name: 'Model1', average_price: 150000 }
      brandService.createNewModelToBrand.mockResolvedValue(newModel)

      await addModelToBrand(req, res, next)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(newModel)
    })

    it('should handle errors', async () => {
      req.params.id = '1'
      req.body = { name: 'Model1', average_price: 150000 }
      const errorMessage = 'Error adding new model to brand'
      brandService.createNewModelToBrand.mockRejectedValue(new Error(errorMessage))

      await addModelToBrand(req, res, next)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error adding new model to brand',
        error: errorMessage
      })
    })
  })
})
