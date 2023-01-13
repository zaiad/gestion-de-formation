const mongoose = require('mongoose')

const formationSchema = mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: Array,
        require: true,
        trim: true
    },
    date_debut: {
        type: String,
    },
    date_fin: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Formation', formationSchema)