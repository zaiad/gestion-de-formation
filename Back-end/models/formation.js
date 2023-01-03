const mongoose = require('mongoose')

const formationSchema = mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    date_debut: {
        type: String,
    },
    date_fin: {
        type: String,
    },
    description: {
        type: String,
    }
})

module.exports = mongoose.model('Formation', formationSchema)