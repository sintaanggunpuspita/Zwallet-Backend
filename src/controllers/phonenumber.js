const phonenumberModel = require('../models/phonenumber')
const helper = require('../helpers/helpers')

const phonenumber = {
    insertphonenumber: (req, res) => {
        const { phone_number } = req.body
        const data = {
            phone_number
        }
        phonenumberModel.insertphonenumber(data)
            .then((result) => {
                const resultphonenumber = result
                console.log(result)
                if (resultphonenumber.affectedRows === 0) {
                    return helper.response(res, { message: 'cant add data' }, 404, null)
                } else {
                    helper.response(res, { message: 'successfull add data' }, 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getAllphone: (req, res) => {
        phonenumberModel.getAllphone()
            .then((result) => {
                const resultphonenumber = result
                // error handling
                if (resultphonenumber.length === 0) {
                    helper.response(res, { message: 'cant search name' }, 404, null)
                } else {
                    helper.response(res, resultphonenumber, 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getAllphonenumber: (req, res) => {
        phonenumberModel.getAllphonenumber()
            .then((result) => {
                const resultphonenumber = result
                // error handling
                if (resultphonenumber.length === 0) {
                    helper.response(res, { message: 'cant search name' }, 404, null)
                } else {
                    helper.response(res, resultphonenumber, 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getphonenumberById: (req, res) => {
        const id = req.params.id
        phonenumberModel.getphonenumberById(id)
            .then((result) => {
                const resultphonenumber = result
                // eror handling
                if (resultphonenumber.length === 0) {
                    return helper.response(res, { message: 'id not found' }, 404, null)
                } else {
                    helper.response(res, resultphonenumber, 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    updatephonenumber: (req, res) => {
        const id = req.params.id
        const { phonenumber } = req.body
        const data = {
           phonenumber
        }
        phonenumberModel.updatephonenumber(id, data)
            .then((result) => {
                const resultphonenumber = result
                console.log(result)
                // eror handling
                if (resultphonenumber.affectedRows === 0) {
                    return helper.response(res, { message: 'cant update data' }, 404, null)
                } else {
                    helper.response(res, { message: 'successfull update data' }, 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    deletephonenumber: (req, res) => {
        const id = req.params.id
        phonenumberModel.deletephonenumber(id)
            .then((result) => {
                const resultphonenumber = result
                // eror handling
                if (resultphonenumber.affectedRows === 0) {
                    return helper.response(res, { message: 'cant delete data' }, 404, null)
                } else {
                    helper.response(res, { message: 'successfull delete data' }, 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = phonenumber
