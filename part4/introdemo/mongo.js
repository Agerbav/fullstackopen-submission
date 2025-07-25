require('dotenv').config()
const mongoose = require("mongoose")

if(process.argv.length<3){
  console.log("give password as argument");
  process.exit
}

const password = process.argv[2]

const url = `mongodb+srv://agerbav:${password}@fullstack.b8sjyh1.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fullstack`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})