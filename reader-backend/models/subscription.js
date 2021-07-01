const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const subSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  url: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  }
})
subSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Sub', subSchema)
