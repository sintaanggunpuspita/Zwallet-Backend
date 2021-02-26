const express = require('express')
const routers = express.Router()
const routerUsers = require('./users')
const routerTransaction = require('./transaction')
const routerTransfer = require('./transfer')
const routerPhonenumber = require('./phonenumber')


routers.use('/users', routerUsers)
routers.use('/transaction', routerTransaction)
routers.use('/transfer', routerTransfer)
routers.use('/phonenumber', routerPhonenumber)

module.exports = routers