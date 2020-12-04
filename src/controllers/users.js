const usersModel = require('../models/users')
const helper = require('../helpers/helpers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const users = {
  registerUsers: (req, res) => {
    console.log('register controller')
    const id = uuidv4()
    const {
      email,
      password,
      username
    } = req.body

    usersModel.checkUser(email)
      .then((result) => {
        console.log()
        if (result.length > 0) return helper.response(res, null, 401, { error: 'email sudah ada' })

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            const data = {
              id,
              email,
              password: hash,
              username
            }
            usersModel.insertUsers(data)
              .then((result) => {
                return helper.response(res, { message: 'register berhasil' }, 201, null)
              })
          });
        });

      })
  },
  loginUsers: (req, res) => {
    const { email, password } = req.body
    usersModel.checkUser(email)
      .then((result) => {
        const user = result[0]
        bcrypt.compare(password, user.password, function (err, resCheck) {
          if (!resCheck) return helper.response(res, null, 401, { error: 'password wrong !!' })
          delete user.password
          jwt.sign({ userID: user.id, email: user.email, roleID: user.role_id }, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, token) {
            user.token = token
            return helper.response(res, user, 200, null)
          });
        });
      })

  },

  insertUsers: (req, res, next) => {
    const { firstName, lastName, username, phone, email, image, password, pin, balance } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashpassword = bcrypt.hashSync(password,salt)
    usersModel.insertUsers({
      firstName,
      lastName,
      username,
      phone,
      email,
      image: `http://localhost:5000/upload/${req.file.filename}`,
      password:hashpassword,
      pin,
      balance
    })
      .then(result => {
        const resultUsers = result
        // eror handling
        if (resultUsers.affectedRows === 0) {
          const err = new Error('cant add data')
          err.status = 404
          return next(err)
        } else {
          helper.response(res, { message: 'successfull add data' }, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllUsers: (req, res) => {
    const username = req.query.username
    // const sort = req.query.sort
    const page = req.query.page
    const limit = req.query.limit

    if (username) {
      usersModel.searchUsersName(username)
        .then((result) => {
          const resultUsers = result
          // error handling
          if (resultUsers.length === 0) {
            helper.response(res, { message: 'cant search name' }, 404, null)
          } else {
            helper.response(res, resultUsers, 200, null)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (page || limit) {
      usersModel.pageUsersName(page, limit)
        .then((result) => {
          const resultUsers = result
          helper.response(res, resultUsers, 200, null)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      usersModel.getAllUsers()
        .then((result) => {
          const resultUsers = result
          // eror handling
          if (resultUsers.length === 0) {
            return helper.response(res, { message: 'cant get data' }, 404, null)
          } else {
            helper.response(res, resultUsers, 200, null)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  getUsersById: (req, res) => {
    const id = req.params.id
    usersModel.getUsersById(id)
      .then((result) => {
        const resultUsers = result
        // eror handling
        if (resultUsers.length === 0) {
          return helper.response(res, { message: 'id not found' }, 404, null)
        } else {
          helper.response(res, resultUsers, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateUsers: (req, res) => {
    const id = req.params.id
    const { firstName, lastName, username, phone, email, image, password, pin, balance } = req.body
    const data = {
      firstName,
      lastName,
      username,
      phone,
      email,
      image,
      password,
      pin,
      balance
    }
    usersModel.updateUsers(id, data)
      .then((result) => {
        const resultUsers = result
        // eror handling
        if (resultUsers.affectedRows === 0) {
          return helper.response(res, { message: 'cant update data' }, 404, null)
        } else {
          helper.response(res, { message: 'successfull update data' }, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteUsers: (req, res) => {
    const id = req.params.id
    usersModel.deleteUsers(id)
      .then((result) => {
        const resultUsers = result
        // eror handling
        if (resultUsers.affectedRows === 0) {
          return helper.response(res, { message: 'cant delete data' }, 404, null)
        } else {
          helper.response(res, resultUsers, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = users
