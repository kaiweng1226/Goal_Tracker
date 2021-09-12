const mongoose = require('mongoose')

require('dotenv').config()

const conn = process.env.DB_STRING

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    userID: Number
})

const User = connection.model('User', UserSchema)

module.exports = connection