const transactionModel = require("../models/transaction");
const helper = require("../helpers/helpers");
const users = require("../models/users");

const transaction = {
  inserttransaction: (req, res) => {
    const { senderId, receiverId, amount, notes } = req.body;
    const data = {
      senderId,
      receiverId,
      amount,
      notes,
      date: new Date(),
    };
    users.getUsersById(senderId).then((result) => {
      const resulttransaction = result;
      console.log("ini users", result);
      if (result[0].balance < amount) {
        return helper.response(
          res,
          { message: "insufficient balance" },
          404,
          null
        );
      }
      transactionModel.inserttransaction(data)
      .then((result) => {
        const resulttransaction = result;
        transactionModel
          .updatesendersbalance(amount, senderId)
          .then((result) => {
            const resulttransaction = result;
            console.log(receiverId)
            transactionModel
              .updatereceiverbalance(amount, receiverId)
              .then((result) => {
                const resulttransaction = result
                return helper.response(res, { message: "success transfer" }, 200, null);
              })
              .catch((err) => {
                console.log(err);
              });
          });
      });
    });
  },
  getAlltransaction: (req, res) => {
    transactionModel
      .getAlltransaction()
      .then((result) => {
        const resulttransaction = result;
        console.log(res.json(result));
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getAlltransactionhistory: (req, res) => {
    const userId = req.params.userId;
    transactionModel
      .getAlltransactionhistory(userId)
      .then((result) => {
        const resulttransaction = result;
        // error handling
        if (resulttransaction.length === 0) {
          return helper.response(res, { message: result }, 404, null);
        }
        return helper.response(res, resulttransaction, 200, null);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  gettransactionById: (req, res) => {
    const id = req.params.id;
    transactionModel
      .gettransactionById(id)
      .then((result) => {
        const resulttransaction = result;
        // eror handling
        if (resulttransaction.length === 0) {
          return helper.response(res,{ message: "cant update data" }, 404, null)
        } else {
          helper.response(
            res,
            { message: "successfull update data" },
            200,
            null
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updatetransaction: (req, res) => {
    const id = req.params.id;
    const { userId, senderId, receiverId, amount, notes, date } = req.body;
    const data = {
      userId,
      senderId,
      receiverId,
      amount,
      notes,
      date,
    };
    transactionModel
      .updatetransaction(id, data)
      .then((result) => {
        const resulttransaction = result;
        console.log(result);
        // eror handling
        if (resulttransaction.affectedRows === 0) {
          return helper.response(
            res,
            { message: "cant update data" },
            404,
            null
          );
        } else {
          helper.response(
            res,
            { message: "successfull update data" },
            200,
            null
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  deletetransaction: (req, res) => {
    const id = req.params.id;
    transactionModel
      .deletetransaction(id)
      .then((result) => {
        const resulttransaction = result;
        // eror handling
        if (resulttransaction.affectedRows === 0) {
          return helper.response(
            res,
            { message: "cant delete data" },
            404,
            null
          );
        } else {
          helper.response(
            res,
            { message: "successfull delete data" },
            200,
            null
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = transaction;
