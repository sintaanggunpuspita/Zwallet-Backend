const express = require('express')
const routerUsers = require('./users')
const routerPhone = require('./phone')
const routerHistory = require('./history')
const router = express.Router()

router
    .use('/users', routerUsers)
    .use('/phone', routerPhone)
    .use('/history', routerHistory)

module.exports = router
