const connection = require('../configs/db')

const phonenumber = {
    insertphonenumber: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO phone_number SET ?', data, (err, result) => {
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
            connection.query('SELECT * FROM phonenumber ORDER BY date DESC', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllphonenumber: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM phonenumber', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getphonenumberById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM phone_number where id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updatephonenumber: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE phone_number SET ? WHERE id = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deletephonenumber: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM phone_number WHERE id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}

module.exports = phonenumber
