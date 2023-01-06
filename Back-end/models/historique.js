const mongoose = require('mongoose')

const historiqueSchema = mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    organisme: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisme"
        }
    ],

    formation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Formation"
        }
    ]
})

module.exports = mongoose.model('Historique', historiqueSchema)