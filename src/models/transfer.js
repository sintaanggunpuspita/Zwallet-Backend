const connection = require('../configs/db')

const transfer = {
    inserttransfer: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO transfer SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAlltransfer: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM transfer ORDER BY date DESC', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    gettransferById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM transfer where id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updatetransfer: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE transfer SET ? WHERE id = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deletetransfer: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM transfer WHERE id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}

module.exports = transfer
