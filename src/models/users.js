const connection = require('../configs/db')

const users = {
    insertUsers: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllUsers: (sort) => {
        return new Promise((resolve, reject) => {
            if (sort) {
                connection.query('SELECT * FROM users ORDER BY ??', sort, (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else {
                connection.query('SELECT * FROM users', (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            }
        })
    },
    searchUsersName: (username) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users where username LIKE '%${username}%'`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    pageUsersName: (page, limit) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${(page - 1) * limit}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getUsersById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT users.*, phone.namePhone FROM users INNER JOIN phone ON users.idPhone =phone.id WHERE users.id = ?', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateUsers: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteUsers: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}

module.exports = users
