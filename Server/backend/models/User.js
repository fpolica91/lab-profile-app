const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        enum: ["Madrid", "Miami", "Barcelona", "Paris", "Berlin", "Amsterdam", "Mexico", "Sao Paolo", "Mexico", "Lisbon"]
    },
    course: {
        type: String,
        enum: ["Web Dev", "UI/UX", "Data Analytics"]
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User