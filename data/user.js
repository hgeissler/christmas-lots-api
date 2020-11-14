// /backend/data.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// our database's data structure
const UserSchema = new Schema({
  id: Number,
  name: String,
})

module.exports = mongoose.model('User', UserSchema)

// POSTMAN post:
// headers: content-type: application/json
// body: raw, JSON
// {
// 	"id": 1233,
// 	"name": "ASD"
// }
