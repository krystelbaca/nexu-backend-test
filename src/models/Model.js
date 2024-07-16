const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },
  model: {
    type: String,
    required: true,
  },
  averagePrice: {
    type: Number,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  }
}, { versionKey: false })

const Model = mongoose.model('Model', modelSchema)

module.exports = Model