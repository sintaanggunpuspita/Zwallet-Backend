const connection = require('../configs/db')

const phone = {
    insertphone: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO phone SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllphone: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM phone', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getphoneById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM phone where id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updatephone: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE phone SET ? WHERE id = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deletephone: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM phone WHERE id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}

module.exports = phone
