const connection = require('../configs/db')

const history = {
    inserthistory: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO history SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllhistory: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM history ORDER BY id DESC', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    gethistoryById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM history where id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updatehistory: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE history SET ? WHERE id = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deletehistory: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM history WHERE id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}

module.exports = history
