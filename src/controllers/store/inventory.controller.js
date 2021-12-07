const mongoose = require("mongoose");
const inventoryModel = require("../../models/inventory.model");

exports.getAllInventory = (req, res) => {
    inventoryModel.find({
            store_id: mongoose.Types.ObjectId(req.id)
        },
        function (err, response) {
            if (!err && response) {
                res.json({
                    status: true,
                    data: response
                });
            } else {
                res.json({
                    status: false,
                    error: err,
                    message: "failure"
                });
            }
        }
    );
};

exports.details = (req, res) => {
    inventoryModel.findOne({
            store_id: mongoose.Types.ObjectId(req.id),
            _id: mongoose.Types.ObjectId(req.body._id),
        },
        function (err, response) {
            if (!err && response) {
                res.json({
                    status: true,
                    data: response
                });
            } else {
                res.json({
                    status: false,
                    error: err,
                    message: "Failure"
                });
            }
        }
    );
};

exports.createInventory = (req, res) => {
    req.body.store_id = req.id;
    console.log(req.body);
    inventoryModel.create(req.body, function (err, response) {
        if (!err && response) {
            res.json({
                status: true,
                data: response
            });
        } else {
            res.json({
                status: false,
                error: err,
                message: "Unable to add"
            });
        }
    });
};

exports.updateInventory = (req, res) => {
    inventoryModel.findOne({
            store_id: mongoose.Types.ObjectId(req.id),
            _id: mongoose.Types.ObjectId(req.body._id),
        },
        function (err, response) {
            if (!err && response) {
                inventoryModel.findOneAndUpdate({
                        store_id: mongoose.Types.ObjectId(req.id),
                        _id: mongoose.Types.ObjectId(req.body._id),
                    }, {
                        $set: req.body
                    }, {
                        new: true
                    },
                    function (err, response) {
                        if (!err && response) {
                            res.json({
                                status: true,
                                data: response
                            });
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
                res.json({
                    status: false,
                    error: err,
                    message: "Invalid login"
                });
            }
        }
    );
};

exports.soft_remove = (req, res) => {
    inventoryModel.findOne({
            _id: mongoose.Types.ObjectId(req.body._id)
        },
        function (err, response) {
            if (!err && response) {
                inventoryModel.findByIdAndUpdate(
                    req.body._id, {
                        $set: {
                            status: "inactive"
                        }
                    },
                    function (err, response) {
                        if (!err && response) {
                            res.json({
                                status: true
                            });
                        } else {
                            res.json({
                                status: false,
                                error: err,
                                message: "Failure"
                            });
                        }
                    }
                );
            } else {
                res.json({
                    status: false,
                    error: err,
                    message: "Invalid catalog"
                });
            }
        }
    );
};

exports.hard_remove = (req, res) => {
    inventoryModel.findOne({
            _id: mongoose.Types.ObjectId(req.body._id)
        },
        function (err, response) {
            if (!err && response) {
                inventoryModel.findOneAndRemove({
                        _id: req.body._id
                    },
                    function (err, response) {
                        if (!err && response) {
                            res.json({
                                status: true
                            });
                        } else {
                            res.json({
                                status: false,
                                error: err,
                                message: "Failure"
                            });
                        }
                    }
                );
            } else {
                res.json({
                    status: false,
                    error: err,
                    message: "Invalid blog"
                });
            }
        }
    );
};
