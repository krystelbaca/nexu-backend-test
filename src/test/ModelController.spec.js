const { 
  listModelsByBrandId,
  listModels,
  editModel 
} = require('../controllers/ModelController')
const modelService = require('../services/ModelService')

const { mockRequest, mockResponse } = require('jest-mock-req-res')

jest.mock('../services/ModelService')

describe('ModelController', () => {
  let req, res, next

  beforeEach(() => {
    req = mockRequest()
    res = mockResponse()
    next = jest.fn()
  })

  describe('listModelsByBrandId', () => {
    it('should return models for a specific brand', async () => {
      req.params.brandId = '1'
      const models = [
        { id: 1, model: 'Model1', averagePrice: 200000 },
        { id: 2, model: 'Model2', averagePrice: 300000 }
      ];
      modelService.getModelsByBrandId.mockResolvedValue(models)

      await listModelsByBrandId(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(models.map(model => ({
        id: model.id,
        name: model.model,
        average_price: model.averagePrice
      })))
    })

    it('should handle errors', async () => {
      req.params.brandId = '1';
      const errorMessage = 'Error retrieving models';
      modelService.getModelsByBrandId.mockRejectedValue(new Error(errorMessage))

      await listModelsByBrandId(req, res, next)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error retrieving models',
        error: errorMessage
      })
    })
  })

  describe('listModels', () => {
    it('should return models based on query parameters', async () => {
      req.query = { greater: 100000, lower: 500000 };
      const models = [
        { id: 1, model: 'Model1', averagePrice: 200000 },
        { id: 2, model: 'Model2', averagePrice: 300000 }
      ];
      modelService.getModels.mockResolvedValue(models)

      await listModels(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(models)
    })

    it('should handle errors', async () => {
      req.query = { greater: 100000, lower: 500000 }
      const errorMessage = 'Error retrieving models'
      modelService.getModels.mockRejectedValue(new Error(errorMessage))

      await listModels(req, res, next)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error retrieving models',
        error: errorMessage
      })
    })
  })

  describe('editModel', () => {
    it('should return 400 if the new price is less than or equal to 100,000', async () => {
      req.params.id = '1';
      req.body.average_price = 100000;

      await editModel(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: 'The new price must be greater than 100,000'
      })
    })

    it('should update the model price', async () => {
      req.params.id = '1';
      req.body.average_price = 150000;
      const updatedModel = { id: '1', model: 'Model1', averagePrice: 150000 }
      modelService.updateModel.mockResolvedValue(updatedModel)

      await editModel(req, res, next)

      expect(modelService.updateModel).toHaveBeenCalledWith('1', 150000)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(updatedModel)
    })

    it('should return 404 if the model is not found', async () => {
      req.params.id = '1'
      req.body.average_price = 150000
      const notFoundResponse = { message: 'Model not found' }
      modelService.updateModel.mockResolvedValue(notFoundResponse)

      await editModel(req, res, next)

      expect(modelService.updateModel).toHaveBeenCalledWith('1', 150000)
      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith(notFoundResponse)
    })

    it('should handle errors', async () => {
      req.params.id = '1'
      req.body.average_price = 150000
      const errorMessage = 'Error updating model price'
      modelService.updateModel.mockRejectedValue(new Error(errorMessage))

      await editModel(req, res, next)

      expect(modelService.updateModel).toHaveBeenCalledWith('1', 150000)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error updating model price',
        error: errorMessage
      })
    })
  })
})
