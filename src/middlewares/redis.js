const redis = require('redis')
const client = redis.createClient(6379)
const {response} = require('../helpers/helpers')
module.exports = {
    cacheGetAllUsers: (req, res, next) => {
        client.get('getallUsers', (err, data) => {
            // if (err) throw err
            if (data !== null) {
                const result = JSON.parse(data)
            return response(res, result,200, null)
            } else {
                next()
            }
        })
    },
    clearGetAllusers: (req, res, next) => {
        client.del('getallUsers')
        next()
    }
}