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
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
subSchema.plugin(uniqueValidator)

subSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Sub', subSchema)
