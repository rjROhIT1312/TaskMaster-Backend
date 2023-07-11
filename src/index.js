const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const route = require('./route/route')
const app = express()

app.use(cors());
app.use(express.json())


mongoose.set('strictQuery', true)

mongoose.connect('mongodb+srv://rjrohit13:DK5kJCqUIXc68mFC@cluster0.0zq8uvw.mongodb.net/todo', { useNewUrlParser: true })
    .then(() => { console.log('MongoDB is connected') })
    .catch((error) => { console.log(error) })

app.use('/', route) 

app.listen(9000, function () {
    console.log('Express app running on port ' + 9000)
})