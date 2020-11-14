const mongoose = require('mongoose')
const express = require('express')
let cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
// const Data = require('./data')

const API_PORT = 3001
const app = express()
app.use(cors())
const router = express.Router()

router.get('/', (req, res) => {
  res.send('HEy MAN')
})

app.use('/api', router)
app.listen(5000, () => console.log(`LISTENING ON PORT `))
