const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String
    }
})

module.exports = mongoose.model('Role', userSchema)