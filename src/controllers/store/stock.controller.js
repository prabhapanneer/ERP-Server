const mongoose = require("mongoose");
const stockModel = require("../../models/stock.model");

exports.getAllStock = (req, res) => {
  stockModel.aggregate(
    [
      { $match: { store_id: mongoose.Types.ObjectId(req.id) } },
      { $sort: { _id: -1 } },
    ],
    function (err, response) {
      if (!err && response) {
        res.json({ status: true, data: response });
      } else {
        res.json({ status: false, error: err, message: "failure" });
      }
    }
  );
};

exports.createStock = (req, res) => {
  console.log("req----", req.id);
  req.body.store_id = req.id;
  console.log(req.body);
  stockModel.create(req.body, function (err, response) {
    if (!err && response) {
      res.json({ status: true, data: response });
    } else {
      res.json({ status: false, error: err, message: "Unable to add" });
    }
  });
};

exports.details = (req, res) => {
  stockModel.findOne(
    {
      store_id: mongoose.Types.ObjectId(req.id),
      _id: mongoose.Types.ObjectId(req.body._id),
    },
    function (err, response) {
      if (!err && response) {
        res.json({ status: true, data: response });
      } else {
        res.json({ status: false, error: err, message: "Failure" });
      }
    }
  );
};

exports.updateStock = (req, res) => {
  stockModel.findOne(
    {
      store_id: mongoose.Types.ObjectId(req.id),
      _id: mongoose.Types.ObjectId(req.body._id),
    },
    function (err, response) {
      if (!err && response) {
        stockModel.findOneAndUpdate(
          {
            store_id: mongoose.Types.ObjectId(req.id),
            _id: mongoose.Types.ObjectId(req.body._id),
          },
          { $set: req.body },
          { new: true },
          function (err, response) {
            if (!err && response) {
              res.json({ status: true, data: response });
            } else {
              res.json({
                status: false,
                error: err,
                message: "Unable to update",
              });
            }
          }
        );
      } else {
        res.json({ status: false, error: err, message: "Invalid login" });
      }
    }
  );
};
