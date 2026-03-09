const mongoose = require('mongoose')

const password = process.argv[2]

if (!password) {
  console.log('Please provide the password as an argument')
  process.exit(1)
}

const url = `mongodb+srv://muhammadainx:${password}@cluster0.ad16zd5.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

if (name && number) {
  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (!name && !number) {
  Person.find({}).then((persons) => {
    console.log('Phonebook:')
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
