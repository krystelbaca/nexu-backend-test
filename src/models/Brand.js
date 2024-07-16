const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, { versionKey: false })

const Brand = mongoose.model('Brand', brandSchema)

module.exports = Car