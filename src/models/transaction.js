const connection = require('../configs/db')

const transaction = {
  inserttransaction: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO transaction SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatesendersbalance: (amount, id) => {
      return new Promise((resolve,reject) => {
        connection.query('UPDATE users SET  balance = balance - ? WHERE id = ?', [amount, id], (err, result)  => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
      })
  },
  updatereceiverbalance: (amount, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET balance = balance + ? WHERE id = ?', [amount, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAlltransaction: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM transaction trans INNER JOIN users u ON (u.id=trans.senderId) INNER JOIN users us ON (us.id=trans.receiverId) ORDER BY date DESC', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAlltransactionhistory: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT users.firstName, users.lastName, users.image, transaction.amount FROM transaction INNER JOIN users ON transaction.receiverId = users.id WHERE transaction.senderId = ?', userId, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  gettransactionById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM transaction where id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatetransaction: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE transaction SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deletetransaction: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM transaction WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = transaction
