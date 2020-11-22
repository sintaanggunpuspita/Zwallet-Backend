require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const router = express.Router()
const PORT = process.env.PORT
const routerUsers = require('./src/routers/users')
const routerPhone = require('./src/routers/phone')
const routerHistory = require('./src/routers/history')
const bodyParser = require('body-parser')


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

//add cors
app.use(cors())

// menenggukan router
app.use('/users', routerUsers)
app.use('/phone', routerPhone)
app.use('/history',routerHistory)

app.listen(PORT, () => console.log(`server is running port ${PORT}`))
