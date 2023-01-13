const mongoose = require('mongoose')

const organismeSchema = mongoose.Schema({
    name : {
        type: String
    },
    ville : {
        type: String
    },
    address : {
        type: String
    },
    phone : {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Organisme', organismeSchema)