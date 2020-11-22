const phoneModel = require('../models/phone')
const helper = require('../helpers/helpers')

const phone = {
  insertphone: (req, res) => {
    const { phoneNumber, userId } = req.body
    const data = {
      phoneNumber,
      userId
    }
    phoneModel.insertphone(data)
      .then((result) => {
        const resultphone = result
        console.log(result)
        helper.response(res, resultphone, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllphone: (req, res) => {
    phoneModel.getAllphone()
      .then((result) => {
        const resultphone = result
        helper.response(res, resultphone, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getphoneById: (req, res) => {
    const id = req.params.id
    phoneModel.getphoneById(id)
      .then((result) => {
        const resultphone = result
        helper.response(res, resultphone, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updatephone: (req, res) => {
    const id = req.params.id
    const { phoneNumber, userId } = req.body
    const data = {
      phoneNumber,
      userId
    }
    phoneModel.updatephone(id, data)
      .then((result) => {
        const resultphone = result
        console.log(result)
        helper.response(res, resultphone, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deletephone: (req, res) => {
    const id = req.params.id
    phoneModel.deletephone(id)
      .then((result) => {
        const resultphone = result
        helper.response(res, resultphone, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = phone
