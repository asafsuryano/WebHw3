require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', (error) => console.error('Connected to Database'))

app.use(express.json())


app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

const sitesRouter = require('./routes/sites')
app.use('/sites', sitesRouter)
app.use(express.static('uploads'))
app.listen(4000, () => console.log('Server Started'))