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
  getAlltransactionhistory: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT users.firstName, transaction.amount, transfer.status FROM transaction INNER JOIN users ON transaction.senderId = users.id INNER JOIN transfer ON transaction.senderId = transfer.id_delivery_transactions', (err, result) => {
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
