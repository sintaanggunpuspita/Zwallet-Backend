const connection = require("../configs/db");

const users = {
  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        email,
        (error, results) => {
          if (!error) {
            resolve(results);
          } else {
            reject(error);
          }
        }
      );
    });
  },
  insertUsers: (data) => {
    // console.log(data)
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO users SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getallPrice: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM PRICE where id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  updateProfile: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE id = ?",
        [data, id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  searchUsersName: (username) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users where username LIKE '%${username}%'`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  searchUsersName: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT users.id, users.firstName, phonenumber.phone_number FROM users INNER JOIN phonenumber ON users.id = phonenumber.id`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  pageUsersName: (page, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  getUsersById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getFriendsById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE id != ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  updateUsers: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE id = ?",
        [data, id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getFriends: (id, firstName, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      if (firstName) {
        connection.query(
          `SELECT users.* FROM users WHERE NOT users.id = ? AND users.firstName LIKE ? ORDER BY users.firstName ${sort} LIMIT ${limit} OFFSET ${offset}`,
          [id, `%${firstName}%`],
          (error, results) => {
            if (!error) {
              resolve(results);
            } else {
              reject(error);
            }
          }
        );
      } else {
        connection.query(
          `select users.* FROM users WHERE NOT users.id = ? ORDER BY users.firstName ${sort} LIMIT ${limit} OFFSET ${offset}`,
          [id],
          (error, results) => {
            if (!error) {
              resolve(results);
            } else {
              reject(error);
            }
          }
        );
      }
    });
  },
  countFriends: (id, firstName)=>{
    return new Promise((resolve, reject) => {
      if (firstName) {
        connection.query('SELECT COUNT(*) AS totalData FROM users WHERE users.id != ? AND users.firstName LIKE ?', [id, `%${firstName}%`], (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query('SELECT COUNT(*) AS totalData FROM users WHERE users.id != ?', [id], (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      }
    })
  },
  deleteUsers: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};

module.exports = users;
