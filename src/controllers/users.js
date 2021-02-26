const usersModel = require('../models/users')
const helper = require('../helpers/helpers')
const {sendEmail} = require('../helpers/email')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const redis = require("redis");
const helpers = require('../helpers/helpers')
const client = redis.createClient(6379);
const {pagination} = require('../middlewares/pagination')

const users = {
  registerUsers: (req, res) => {
    console.log('register controller')
    const id = uuidv4()
    const {
      username,
      email,
      password
    } = req.body

    usersModel.checkUser(email)
      .then((result) => {
        console.log()
        if (result.length > 0) return helper.response(res, null, 401, { error: 'email sudah ada' })
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            const data = {
              id,
              role_Id: 1,
              firstName: ' ',
              lastName: ' ',
              username,
              phone: ' ',
              email,
              image: `http://localhost:5000/upload/jesicaken.png`,
              password:hash,
              pin: ' ',
              balance: 0
            }
            usersModel.insertUsers(data)
              .then(() => {
                return helper.response(res, { message: 'register berhasil' }, 201, null)
              })
              .catch((err) => {
                return helper.response(res, null, 500, {message: err })
              })
          })
        })
      })
  },
  loginUsers: (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
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
      .catch((err) => {
        return helper.response(res, null, 500, {
          message: 'error send email'
        })
      })
  },
  sendEmail : (req, res) => {
    const email = req.body.email
    const message = req.body.message
    sendEmail(email, message)
      .then(() => {
        // console.log()
        // return helper.response(res, { id: res.messageId}, 200, null)
        return helper.response(res, { message: 'send email success' }, 200, null)
      })
      .catch((err) => {
        return helper.response(res, null, 500, {
          message: 'error send email'
        })
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

          client.setex("getallUsers", 60 * 60 * 12, JSON.stringify(resultUsers))
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
        } 
          return helper.response(res, resultUsers, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getFriendsById: (req, res) => {
    const id = req.params.id
    usersModel.getFriendsById(id)
      .then((result) => {
        const resultUsers = result
        // eror handling
        if (resultUsers.length === 0) {
          return helper.response(res, { message: 'id not found' }, 404, null)
        }  
        return helper.response(res, resultUsers, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // getallPrice: (req, res) => {
  //   const id = req.params.id
  //   userModel.getallPrice(id)
  //   .then((result) => {
  //     const resultUsers = result 
  //   })
  // },
  updateProfile: (req, res) => {
    const id = req.params.id
    const { firstName, lastName, username, email, phone, password, pin, balance} = req.body
    let image = null
    if (req.file) {
      image= `http://localhost:5000/upload/${req.file.filename}`
    }
    const data = {}
    if (firstName) {
      data.firstName = firstName
    }
    if(lastName) {
      data.lastName = lastName
    }
    if(username) {
      data.username = username
    }
    if(email) {
      data.email = email
    }
    if(phone) {
      data.phone = phone
    }
    if(image) {
      data.image = image
    }
    if(password) {
      data.password = password
    }
    if(pin) {
      data.pin = pin
    }
    if(balance) {
      data.balance = balance
    }
    // const data = {
    //   firstName,
    //   lastName,
    //   email,
    //   phone,
    //   image: `http://localhost:5000/upload/${req.file.filename}`,
    // }
    usersModel.updateProfile(id, data)
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
  getAlltransferusers: (req, res) => {
    const sortdata = req.query.sort || 'id';
    const typeSort = req.query.typesort || 'ASC' 
    const search = req.query.search
    usersModels.getAlltransferusers({sortdata,typeSort, search})
    .then((result) => {
      resulttransferusers = result

      // res.json(resultBooks);
      client.setex('getalltransferusers', 60*60*12 , JSON.stringify(resulttransferusers))
      hellper.renponse(res, resultProducts, 200, null, req.paginations)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  getFriends: async(req, res, next) => {
    const id = req.params.id
    const firstName = req.query.firstName || '' //SEARCH
    const sort = req.query.sort || 'ASC' //SEARCH
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit
    const setPagination = await pagination(id, firstName, limit, page)
    usersModel.getFriends(id, firstName, sort, limit, offset)
    .then(result => {
      const resultUsers =result
      if (resultUsers.length === 0) {
        return helpers.response(res,{users: [], pagination:setPagination}, 200, null)
      }
      helpers.response( res, {users: resultUsers, pagination: setPagination}, 200, null)
    })
    .catch((err) => {
      return helpers.response(res, null, 500, { message: 'error database'})
    })
  },

updateUsers: (req, res) => {
    const id = req.params.id
    const { firstName, lastName, username, phone, email, password, pin, balance } = req.body
    const data = {
      firstName,
      lastName,
      username,
      phone,
      email,
      image: `http://localhost:5000/upload/${req.file.filename}`,
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
