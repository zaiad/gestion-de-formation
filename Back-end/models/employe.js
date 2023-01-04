const mongoose = require('mongoose')

// mongoose.set('strictQuery', false);

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
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
)

module.exports = User