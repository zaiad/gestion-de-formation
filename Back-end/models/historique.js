const mongoose = require('mongoose')

const historiqueSchema = mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
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