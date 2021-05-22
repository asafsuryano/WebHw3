require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
var connectionString="mongodb://127.0.0.1:27017";
mongoose.connect(connectionString, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', (error) => console.error('Connected to Database'))

app.use(express.json())

const sitesRouter = require('./routes/sites')
app.use('/sites', sitesRouter)
app.use(express.static('uploads'))
app.listen(4000, () => console.log('Server Started'))