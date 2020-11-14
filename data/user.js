// /backend/data.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// our database's data structure
const UserSchema = new Schema({
  id: Number,
  name: String,
  password: String,
  drawn: Boolean,
  lotId: String,
})

module.exports = mongoose.model('User', UserSchema)
