const Brand = require('../models/Brand')
const Model = require('../models/Model')

const getBrands = async () => {
  try {
    const pricesByBrand = await calculateBrandAveragePrice()

    return pricesByBrand.map((brand) => ({
      'id': brand.id,
      'name': brand.name,
      'average_price': brand.average_price
    }))
  } catch (error) {
    return error.message
  }
}

const calculateBrandAveragePrice = async () => {
  return Model.aggregate([
    {
      $lookup: {
        from: 'brands',
        localField: 'brand',
        foreignField: '_id',
        as: 'brandDetails'
      }
    },
    { $unwind: '$brandDetails' },
    {
      $group: {
        _id: '$brand',
        name: { $first: '$brandDetails.name' },
        averagePrice: { $avg: '$averagePrice' }
      }
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
        average_price: { $round: ['$averagePrice', 0] }
      }
    },
    {
      $sort: { name: 1 }
    }
  ])
}

const createBrand = async (body) => {
  try {
    return Brand.create(body)
  } catch (error) {
    return error.message
  }
}

module.exports = {
  getBrands,
  createBrand
}