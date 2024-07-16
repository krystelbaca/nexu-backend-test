const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  model: {
    type: String,
    required: true,
  },
  averagePrice: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true,
  }
}, { versionKey: false })

const Model = mongoose.model('Model', modelSchema)

module.exports = Model