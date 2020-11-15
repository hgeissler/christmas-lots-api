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

router.options('/drawLot', (req, res) => {
  return res.status(200)
})
router.options('/resetAll', (req, res) => {
  return res.status(200)
})

// update method
router.post('/drawLot', async (req, res) => {
  if (!req.body.name)
    return res.json({ success: false, error: 'no name given' })
  const drawer = req.body

  const drawerDoc = await User.findOne({ name: drawer.name })
  if (drawerDoc.lotId) {
    lotDoc = await User.findById(drawerDoc.lotID)
    return res.status(200).json({ name: lotDoc.name })
  }

  let filter = {
    drawn: false,
    name: { $ne: drawer.name },
    pair: { $ne: drawer.name },
  }
  let lot

  User.findOneAndUpdate(filter, { drawn: true }, (err, result) => {
    if (err) return res.json({ success: false, error: err })
    lot = result
    User.findOneAndUpdate(
      { name: drawer.name },
      { lotId: lot._id },
      (err, result) => {
        if (err) return res.json({ success: false, error: err })
        return res.status(200).json(lot)
      }
    )
  })
})

// reset all
router.post('/resetAll', async (req, res) => {
  try {
    await User.updateMany({}, { $set: { drawn: false, lotId: '' } })
  } catch (e) {
    return res.json({ success: false, error: e })
  }
  return res.json({ success: true })
})

app.use('/api', router)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`))
