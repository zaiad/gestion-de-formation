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
})

module.exports = mongoose.model('Organisme', organismeSchema)