require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
// const router = express.Router()
const PORT = process.env.PORT
const routerUsers = require('./src/routers/users')
const routerTransaction = require('./src/routers/transaction')
const routerTransfer = require('./src/routers/transfer')
const routerPhonenumber = require('./src/routers/phonenumber')
const bodyParser = require('body-parser')
const helpers = require('./src/helpers/helpers')

// membuat middleware
const mymiddleware = (req, res, next) => {
  console.log('menjalankan my middleware')
  // res.send('mymiddleware')
  next()
}

// use middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// add morgan
app.use(morgan('dev'))

// add mymiddleware
app.use(mymiddleware)

// add cors
app.use(cors())

// menenggukan router
app.use('/users', routerUsers)
app.use('/transaction', routerTransaction)
app.use('/transfer',routerTransfer)
app.use('/phonenumber',routerPhonenumber)


// eror handling
// app.use((err, req, res, next) => {
//   helpers.response(res, null, err.status, { message: err.message })
// })
// app.use('*', (req, res) => {
//   helpers.response(res, null, 404, { message: 'URL Not Found' })
// })

app.listen(PORT, () => console.log(`server is running port ${PORT}`))
