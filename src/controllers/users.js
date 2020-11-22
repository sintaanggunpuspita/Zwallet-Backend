const usersModel = require('../models/users')
const helper = require('../helpers/helpers')

const users = {
    insertUsers: (req, res) => {
        const { firstName, lastName, username, email, image, password, pin, balance } = req.body
        const data = {
            firstName,
            lastName,
            username,
            email,
            image,
            password,
            pin,
            balance
        }
        usersModel.insertUsers(data)
            .then((result) => {
                const resultUsers = result
                console.log(result)
                helper.response(res, resultUsers, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getAllUsers: (req, res) => {
        const username = req.query.username
        const sort = req.query.sort
        const page = req.query.page
        const limit = req.query.limit

        if (username) {
            usersModel.searchUsersName(username)
                .then((result) => {
                    const resultUsers = result
                    // error handling
                    if (resultUsers.length > 1) {
                        helper.response(res, resultUsers, 200, null)
                    } else {
                        helper.response(res, resultUsers, 404, 'Data Tidak Ada')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else if (sort) {
            usersModel.getAllUsers(sort)
                .then((result) => {
                    const resultUsers = result
                    helper.response(res, resultUsers, 200, null)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else if (page, limit) {
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
                    helper.response(res, resultUsers, 200, null)
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
                // res.json(resultProducts)
                helper.response(res, resultUsers, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    updateUsers: (req, res) => {
        const id = req.params.id
        const { firstName, lastName, username, email, image, password, pin, balance  } = req.body
        const data = {
            firstName,
            lastName,
            username,
            email,
            image,
            password,
            pin,
            balance
        }
        usersModel.updateUsers(id, data)
            .then((result) => {
                const resultUsers = result
                console.log(result)
                helper.response(res, resultUsers, 200, null)
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
                helper.response(res, resultUsers, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = users
