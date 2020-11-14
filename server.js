const mongoose = require('mongoose')
const express = require('express')
let cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const User = require('./data/user')

const app = express()
app.use(cors())
const router = express.Router()

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log('mongo db connection, error: ', err)
    if (!err) {
      // res.send('connected')

      let db = mongoose.connection

      db.once('open', (err) => console.log('connectected to database', err))
      db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    }
  }
)

router.get('/', (req, res) => {
  res.send('HEy MAN')
})

router.get('/getUsers', (req, res) => {
  User.find((err, users) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true, users: users })
  })
})

// update method
router.post('/drawLot', (req, res) => {
  const { drawer, lot } = req.body
  User.findByIdAndUpdate(drawer._id, drawer, (err) => {
    if (err) return res.json({ success: false, error: err })
  }).then(() => {
    User.findByIdAndUpdate(lot._id, lot, (err) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true })
    })
  })
})

app.use('/api', router)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`))
