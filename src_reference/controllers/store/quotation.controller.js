"use strict";
const mongoose = require('mongoose');
const request = require('request');
const dateFormat = require('dateformat');
const store = require("../../models/store.model");
const customer = require("../../models/customer.model");
const quotations = require("../../models/quotation.model");
const mailService = require("../../../services/mail.service");
const setupConfig = require('../../../config/setup.config');
const commonService = require("../../../services/common.service");

exports.create_quotation = (req, res) => { }

exports.list = (req, res) => {
    // quotationStatus -> placed, processing, confirmed, cancelled
    let quotStatus = req.body.type;
    if(quotStatus=="all") { quotStatus = { $in: [ 'placed', 'processing' ] }; }
    let queryParams = {};
    let fromDate = new Date(req.body.from_date).setHours(0,0,0,0);
    let toDate = new Date(req.body.to_date).setHours(23,59,59,999);
    if(req.body.customer_id=='all')
    {
        queryParams = {
            store_id: mongoose.Types.ObjectId(req.id), status: 'active', quot_status: quotStatus,
            [req.body.date_type]: { $gte: new Date(fromDate), $lt: new Date(toDate) }
        };
    }
    else {
        queryParams = {
            store_id: mongoose.Types.ObjectId(req.id), customer_id: mongoose.Types.ObjectId(req.body.customer_id),
            status: 'active', quot_status: quotStatus, [req.body.date_type]: { $gte: new Date(fromDate), $lt: new Date(toDate) }
        };
    }
    quotations.aggregate([
        { $match : queryParams },
        { $lookup:
            {
               from: 'customers',
               localField: 'customer_id',
               foreignField: '_id',
               as: 'customerDetails'
            }
        }
    ], function(err, response) {
        if(!err && response) {
            res.json({ status: true, list: response });
        }
        else {
            res.json({ status: false, error: err, message: "Failure" });
        }
    });
}

exports.details = (req, res) => {
	quotations.aggregate([ 
        { $match :
            { store_id: mongoose.Types.ObjectId(req.id), _id: mongoose.Types.ObjectId(req.query.quot_id) }
        },
        { $lookup:
            {
               from: 'customers',
               localField: 'customer_id',
               foreignField: '_id',
               as: 'customerDetails'
            }
        }
    ], function(err, response) {
        if(!err && response[0]) {
            res.json({ status: true, data: response[0] });
        }
        else {
            res.json({ status: false, error: err, message: "Failure" });
        }
    });
}

exports.update_quotation = (req, res) => {
    req.body.modified_on = new Date();
    quotations.findOneAndUpdate({ store_id: mongoose.Types.ObjectId(req.id), _id: mongoose.Types.ObjectId(req.body._id) },
    { $set: req.body }, function(err, response) {
        if(!err) {
            res.json({ status: true });
        }
        else {
            res.json({ status: false, error: err, message: "Invalid quotation" });
        }
    });
}

exports.send_quotation = (req, res) => {
    quotations.aggregate([
        { $match:
            { store_id: mongoose.Types.ObjectId(req.id), _id: mongoose.Types.ObjectId(req.body._id), status: "active" }
        },
        { $lookup:
            {
               from: 'customers',
               localField: 'customer_id',
               foreignField: '_id',
               as: 'customerDetails'
            }
        },
        { $lookup:
            {
               from: 'stores',
               localField: 'store_id',
               foreignField: '_id',
               as: 'storeDetails'
            }
        }
    ], function(err, response) {
        if(!err && response[0]) {
            let quotDetails = response[0];
            let customerDetails = {};
            customerDetails = quotDetails.customerDetails[0];
            let storeDetails = response[0].storeDetails[0];
            // update quotation status
            let revisedPrice = { item_list: quotDetails.item_list, final_price: quotDetails.final_price };
            quotations.findOneAndUpdate({ store_id: mongoose.Types.ObjectId(req.id), _id: mongoose.Types.ObjectId(req.body._id) },
            { $set: { quot_status: 'processing' }, $push: { revised_price: revisedPrice } }, function(err, response) {
                if(!err) {
                    // send mail
                    res.json({ status: true });
                }
                else {
                    res.json({ status: false, error: err, message: "Invalid quotation" });
                }
            });
        }
        else {
            res.json({ status: false, error: err, message: "Invalid quotation" });
        }
    });
}

exports.confirm_quotation = (req, res) => {
    quotations.aggregate([
        { $match:
            { store_id: mongoose.Types.ObjectId(req.id), _id: mongoose.Types.ObjectId(req.body._id), status: "active" }
        },
        { $lookup:
            {
               from: 'customers',
               localField: 'customer_id',
               foreignField: '_id',
               as: 'customerDetails'
            }
        },
        { $lookup:
            {
               from: 'stores',
               localField: 'store_id',
               foreignField: '_id',
               as: 'storeDetails'
            }
        }
    ], function(err, response) {
        if(!err && response[0]) {
            let quotDetails = response[0];
            let customerDetails = {};
            customerDetails = quotDetails.customerDetails[0];
            let storeDetails = response[0].storeDetails[0];
            if(quotDetails.quot_status!='confirmed')
            {
                // update quotation status
                quotations.findOneAndUpdate({ store_id: mongoose.Types.ObjectId(req.id), _id: mongoose.Types.ObjectId(req.body._id) },
                { $set: { quot_status: 'confirmed', confirmed_on: new Date() } }, function(err, response) {
                    if(!err) {
                        // send mail
                        res.json({ status: true });
                    }
                    else {
                        res.json({ status: false, error: err, message: "Invalid quotation" });
                    }
                });
            }
            else {
                res.json({ status: true });
            }
        }
        else {
            res.json({ status: false, error: err, message: "Invalid quotation" });
        }
    });
}

exports.cancel_quotation = (req, res) => {
    quotations.aggregate([
        { $match:
            { store_id: mongoose.Types.ObjectId(req.id), _id: mongoose.Types.ObjectId(req.body._id), status: "active" }
        },
        { $lookup:
            {
               from: 'customers',
               localField: 'customer_id',
               foreignField: '_id',
               as: 'customerDetails'
            }
        },
        { $lookup:
            {
               from: 'stores',
               localField: 'store_id',
               foreignField: '_id',
               as: 'storeDetails'
            }
        }
    ], function(err, response) {
        if(!err && response[0]) {
            let quotDetails = response[0];
            let customerDetails = {};
            customerDetails = quotDetails.customerDetails[0];
            let storeDetails = response[0].storeDetails[0];
            if(quotDetails.quot_status!='cancelled')
            {
                // update quotation status
                quotations.findOneAndUpdate({ store_id: mongoose.Types.ObjectId(req.id), _id: mongoose.Types.ObjectId(req.body._id) },
                { $set: { quot_status: 'cancelled', cancelled_on: new Date() } }, function(err, response) {
                    if(!err) {
                        // send mail
                        res.json({ status: true });
                    }
                    else {
                        res.json({ status: false, error: err, message: "Invalid quotation" });
                    }
                });
            }
            else {
                res.json({ status: true });
            }
        }
        else {
            res.json({ status: false, error: err, message: "Invalid quotation" });
        }
    });
}