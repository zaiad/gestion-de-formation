const mongoose = require('mongoose')
const Schema = mongoose.Schema
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
        organisme_id: [
            {
                type: Schema.Types.ObjectId,
                ref: "Organisme",
                required: true,
            }
        ],
        status: {
            type: Boolean,
            default: true
        }
    })
)

module.exports = User