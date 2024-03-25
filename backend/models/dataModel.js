const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dataSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  bill: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Data', dataSchema)