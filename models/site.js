const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Site', siteSchema)