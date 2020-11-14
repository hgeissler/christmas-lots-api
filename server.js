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
      let db = mongoose.connection
      db.once('open', (err) => console.log('connectected to database', err))
      db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    }
  }
)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

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
router.post('/drawLot', async (req, res) => {
  const { drawer } = req.body

  let found = false

  let random = Math.floor(Math.random() * 8)
  User.findOne()
    .skip(random)
    .exec(function (err, result) {
      if (result.drawn == false && result.name != drawer.name) {
        found = true
        if (found == false || err)
          return res.json({ success: false, error: 'no lot found' })
        return result
      }
      return 'SCHEISSE'
    })
    .then((result) => console.log('RESSSSSSSSSULT:', result))

  await User.findByIdAndUpdate(lot._id, { drawn: true }, (err) => {
    if (err) return res.json({ success: false, error: err })
  })

  await User.findByIdAndUpdate(drawer._id, { lotId: lot._id }, (err) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

app.use('/api', router)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`))
