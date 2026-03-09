const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('successfully connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'name should be at least 3 characters long'],
  },
  number: {
    type: String,
    minLength: [8, 'number should be at least 8 characters long'],
    validate: {
      validator: (v) => /^\d{2,3}-\d+$/.test(v),
      message: 'number must be of format XX-XXXXXXX or XXX-XXXXXXX',
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
