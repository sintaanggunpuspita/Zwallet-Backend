const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/helpers')
module.exports = {
    cacheGetAllUsers: (req, res, next) => {
        client.get('getallusers', (err, data) => {
            if (err) throw err
            if (data !== null) {
                helper.response(res, JSON.parse(data), 200)
            } else {
                next()
            }
        })
    },
    clearGetAllusers: (req, res, next) => {
        client.del('getallusers')
        next()
    }
}