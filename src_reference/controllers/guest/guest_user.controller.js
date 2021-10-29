"use strict";
const mongoose = require('mongoose');
const request = require('request');
const urlencode = require('urlencode');
const guestUser = require("../../models/guest_user.model");
const orderList = require("../../models/order_list.model");
const offer = require("../../models/offer_codes.model");
const store = require("../../models/store.model");
const shipping = require("../../models/shipping_methods.model");
const currencyList = require("../../models/currency_list.model");
const orderSession = require("../../models/order_session.model");
const mailService = require("../../../services/mail.service");
const createPayment = require("../../../services/create_payment.service");
const commonService = require("../../../services/common.service");
const stockService = require("../../../services/stock.service");
const erpService = require("../../../services/erp.service");
const validationService = require("../../../services/validation.service");

// update user details
exports.update = (req, res) => {
    guestUser.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.id), status: "active" },
    { $set: req.body }, { new: true }, function(err, response) {
        if(!err && response) { res.json({ status: true, data: response }); }
        else { res.json({ status: false, error: err, message: "Failure" }); }
    });
}

// validate offer code
exports.validate_offercoupon = (req, res) => {
    let queryData = { store_id: mongoose.Types.ObjectId(req.body.store_id), status: "active", enable_status: true, valid_from: { $lte: new Date() } };
    if(req.body.code) { queryData.code = req.body.code; }
    else { queryData.code_type = "auto_discount"; }
    offer.findOne(queryData, function(err, response) {
        if(!err && response) {
            let codeDetails = response;
            if(codeDetails.valid_to)
            {
                if(new Date(codeDetails.valid_to) >= new Date())
                {
                    if(codeDetails.restrict_usage) {
                        if(codeDetails.usage_limit > codeDetails.redeemed_count)
                        {
                            if(codeDetails.onetime_usage) { res.json({ status: false, message: "Please login to avail this offer." }); }
                            else { res.json({ status: true, data: codeDetails }); }
                        }
                        else {
                            res.json({ status: false, message: "Offer expired" });
                        }
                    }
                    else {
                        if(codeDetails.onetime_usage) {
                            res.json({ status: false, message: "Please login to avail this offer." });
                        }
                        else {
                            res.json({ status: true, data: codeDetails });
                        }
                    }
                }
                else {
                    res.json({ status: false, message: "Offer expired" });
                }
            }
            else
            {
                if(codeDetails.restrict_usage) {
                    if(codeDetails.usage_limit > codeDetails.redeemed_count)
                    {
                        if(codeDetails.onetime_usage) { res.json({ status: false, message: "Please login to avail this offer." }); }
                        else { res.json({ status: true, data: codeDetails }); }
                    }
                    else {
                        res.json({ status: false, message: "Offer expired" });
                    }
                }
                else {
                    if(codeDetails.onetime_usage) {
                        res.json({ status: false, message: "Please login to avail this offer." });
                    }
                    else {
                        res.json({ status: true, data: codeDetails });
                    }
                }
            }
        }
        else {
            res.json({ status: false, message: "Invalid code" });
        }
    });
}

// create order(v1) without payment
exports.create_order_wo_payment = (req, res) => {
    store.findOne({ _id: mongoose.Types.ObjectId(req.body.store_id), version: 1 }, function(err, response) {
        if(!err && response)
        {
            let storeDetails = response;
            req.body.status = "active";
            req.body.order_by = "guest";
            req.body.customer_id = req.body.store_id;
            req.body.customer_name = req.body.shipping_address.name;
            req.body.order_number = commonService.orderNumber();
            req.body.coupon_list = req.body.coupon_list.filter(object => object.price>0);
            req.body.invoice_number = "";
            if(storeDetails.invoice_status) {
                req.body.invoice_number = commonService.invoiceNumber(storeDetails.invoice_config);
            }
            orderList.create(req.body, function(err, response) {
                if(!err && response)
                {
                    let orderDetails = response;
                    // update next invoice no
                    if(req.body.invoice_number) {
                        store.findByIdAndUpdate(storeDetails._id, { $inc: { "invoice_config.next_invoice_no": 1 } }, function(err, response) { });
                    }
                    // clear guest user cart
                    guestUser.findOneAndUpdate({ email: req.body.guest_email }, { $set: { cart_list: [], cod_otp: null, cod_otp_request_on: null } }, function(err, response) { });
                    // decrease product stock
                    stockService.decProductStock(orderDetails.item_list);
                    // decrease coupon balance
                    if(orderDetails.coupon_list.length) { stockService.updateCouponBalance(orderDetails); }
                    // update offer redeem count
                    if(orderDetails.offer_details) { stockService.incOfferRedeemCount(orderDetails.offer_details); }
                    // order placed mail
                    mailService.sendOrderPlacedMail(null, orderDetails._id);
                    // order placed mail to vendor
                    mailService.sendOrderPlacedMailToVendor(orderDetails._id);
                    // response
                    let sendData = { order_type: "product", order_id: orderDetails._id };
                    res.json({ status: true, data: sendData });
                }
                else { res.json({ status: false, error: err, message: "Unable to place order" }); }
            });
        }
        else {
            res.json({ status: false, error: err, message: "Invalid Store" });
        }
    });
}

// v1 order
exports.create_order = (req, res) => {
    store.findOne({ _id: mongoose.Types.ObjectId(req.body.store_id), version: 1 }, function(err, response) {
        if(!err && response)
        {
            // hold product
            stockService.holdProductAndCoupon(req.body.unique_product_list, req.body.coupon_list).then(() => {
                // if hold selected products
                req.body.order_by = "guest";
                req.body.customer_id = req.body.store_id;
                req.body.customer_name = req.body.shipping_address.name;
                req.body.order_number = commonService.orderNumber();
                orderList.create(req.body, function(err, response) {
                    if(!err && response)
                    {
                        let orderDetails = response;
                        orderDetails.customer_email = orderDetails.guest_email;
                        // create payment
                        if(orderDetails.payment_details.name=="Razorpay")
                        {
                            createPayment.createRazorpay(orderDetails, function(err, response) {
                                if(!err && response) {
                                    res.json({ status: true, data: response });
                                }
                                else {
                                    res.json({ status: false, error: err, message: response });
                                }
                            });
                        }
                        else if(orderDetails.payment_details.name=="PayPal")
                        {
                            createPayment.createPaypal(orderDetails, function(err, response) {
                                if(!err && response) {
                                    res.json({ status: true, data: response });
                                }
                                else {
                                    res.json({ status: false, error: err, message: response });
                                }
                            });
                        }
                        else if(orderDetails.payment_details.name=="CCAvenue")
                        {
                            let sendData = {
                                order_type: "product",
                                payment_method: 'CCAvenue',
                                order_details: orderDetails,
                                order_id: orderDetails._id,
                                order_number: orderDetails.order_number,
                                currency: orderDetails.currency_type.country_code,
                                amount: Number(commonService.priceConvert(orderDetails.currency_type, orderDetails.final_price))
                            };
                            res.json({ status: true, data: sendData });
                        }
                        else if(orderDetails.payment_details.name=="Square")
                        {
                            let sendData = {
                                order_type: "product",
                                payment_method: 'Square',
                                order_id: orderDetails._id,
                                order_number: orderDetails.order_number,
                                currency: orderDetails.currency_type.country_code,
                                amount: Number(commonService.priceConvert(orderDetails.currency_type, orderDetails.final_price))
                            };
                            res.json({ status: true, data: sendData });
                        }
                        else if(orderDetails.payment_details.name=="Fatoorah")
                        {
                            orderDetails.fatoorah_pay_id = req.body.fatoorah_pay_id;
                            createPayment.createFatoorah(orderDetails, function(err, response) {
                                if(!err && response) {
                                    res.json({ status: true, data: response });
                                }
                                else {
                                    res.json({ status: false, error: err, message: response });
                                }
                            });
                        }
                        else if(orderDetails.payment_details.name=="Telr")
                        {
                            createPayment.createTelr(orderDetails, function(err, response) {
                                if(!err && response) {
                                    res.json({ status: true, data: response });
                                }
                                else {
                                    res.json({ status: false, error: err, message: response });
                                }
                            });
                        }
                        else if(orderDetails.payment_details.name=="Foloosi")
                        {
                            createPayment.createFoloosi(orderDetails, function(err, response) {
                                if(!err && response) {
                                    res.json({ status: true, data: response });
                                }
                                else {
                                    res.json({ status: false, error: err, message: response });
                                }
                            });
                        }
                        else if(orderDetails.payment_details.name=="Gpay")
                        {
                            let sendData = {
                                order_id: orderDetails._id,
                                order_number: orderDetails.order_number,
                                currency: orderDetails.currency_type.country_code,
                                amount: Number(commonService.priceConvert(orderDetails.currency_type, orderDetails.final_price))
                            };
                            res.json({ status: true, data: sendData });
                        }
                        else if(orderDetails.payment_details.name=="Bank Payment")
                        {
                            let sendData = {
                                order_id: orderDetails._id,
                                order_number: orderDetails.order_number,
                                currency: orderDetails.currency_type.country_code,
                                amount: Number(commonService.priceConvert(orderDetails.currency_type, orderDetails.final_price))
                            };
                            res.json({ status: true, data: sendData });
                        }
                        else {
                            res.json({ status: false, message: "Invalid payment method" });
                        }
                    }
                    else { res.json({ status: false, error: err, message: "Unable to place order" }); }
                });
            });
        }
        else {
            res.json({ status: false, error: err, message: "Invalid Store" });
        }
    });
}

// for v2 order
exports.pickup_details = (req, res) => {
    if(req.body.sid) {
        guestUser.findOne({ _id: mongoose.Types.ObjectId(req.id), status: 'active' }, function(err, response) {
            if(!err && response)
            {
                let customerDetails = response;
                req.body.store_id = customerDetails.store_id;
                req.body.session_id = req.body.sid+'-'+customerDetails._id;
                req.body.order_type = 'pickup';
                // shipping method
                if(!req.body.shipping_method) { req.body.shipping_method = {}; }
                req.body.shipping_method._id = req.body.store_id;
                req.body.shipping_method.delivery_method = true;
                req.body.shipping_method.shipping_price = 0;
                if(!req.body.quick_order_id) { req.body.quick_order_id = null; }
                orderSession.findOne({ store_id: req.body.store_id, session_id: req.body.session_id, status: "active" }, function(err, response) {
                    if(!err && response) {
                        req.body.updated_on = new Date();
                        orderSession.findByIdAndUpdate(response._id, { $set: req.body }, { new: true }, function(err, response) {
                            if(!err && response) {
                                res.json({ status: true, data: response });
                            }
                            else {
                                res.json({ status: false, error: err, message: "Unable to create session" });
                            }
                        });
                    }
                    else {
                        orderSession.create(req.body, function(err, response) {
                            if(!err && response) {
                                res.json({ status: true, data: response });
                            }
                            else {
                                res.json({ status: false, error: err, message: "Unable to create session" });
                            }
                        });
                    }
                });
            }
            else { res.json({ status: false, error: err, message: "Invalid user" }); }
        });
    }
    else { res.json({ status: false, message: "Session ID missing" }); }
}

exports.delivery_details = (req, res) => {
    if(req.body.sid) {
        guestUser.findOne({ _id: mongoose.Types.ObjectId(req.id), status: 'active' }, function(err, response) {
            if(!err && response)
            {
                let customerDetails = response;
                req.body.store_id = customerDetails.store_id;
                req.body.session_id = req.body.sid+'-'+customerDetails._id;
                req.body.order_type = 'delivery';
                // shipping method
                if(!req.body.shipping_method) { req.body.shipping_method = {}; }
                req.body.shipping_method.delivery_method = true;
                if(!req.body.quick_order_id) { req.body.quick_order_id = null; }
                orderSession.findOne({ store_id: req.body.store_id, session_id: req.body.session_id, status: "active" }, function(err, response) {
                    if(!err && response) {
                        req.body.updated_on = new Date();
                        orderSession.findByIdAndUpdate(response._id, { $set: req.body }, { new: true }, function(err, response) {
                            if(!err && response) {
                                res.json({ status: true, data: response });
                            }
                            else {
                                res.json({ status: false, error: err, message: "Unable to create session" });
                            }
                        });
                    }
                    else {
                        orderSession.create(req.body, function(err, response) {
                            if(!err && response) {
                                res.json({ status: true, data: response });
                            }
                            else {
                                res.json({ status: false, error: err, message: "Unable to create session" });
                            }
                        });
                    }
                });
            }
            else { res.json({ status: false, error: err, message: "Invalid user" }); }
        });
    }
    else { res.json({ status: false, message: "Session ID missing" }); }
}

exports.shipping_details = (req, res) => {
    if(req.body.sid) {
        guestUser.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(req.id), status: 'active' } },
            {
                $lookup: {
                    from: "stores",
                    localField: "store_id",
                    foreignField: "_id",
                    as: "storeDetails"
                }
            },
            {
                $lookup: {
                    from: "store_permissions",
                    localField: "store_id",
                    foreignField: "store_id",
                    as: "storeProperties"
                }
            }
        ], function(err, response) {
            if(!err && response[0])
            {
                let customerDetails = response[0];
                let sessionId = req.body.sid+'-'+customerDetails._id;
                let storeDetails = customerDetails.storeDetails[0];
                let storeProperties = customerDetails.storeProperties[0];
                let checkoutSetting = storeProperties.checkout_setting;
                let currencyDetails = storeDetails.currency_types.filter(obj => obj.country_code==req.body.currency_type)[0];
                if(customerDetails.address_list.length) {
                    let shippingAddress = customerDetails.address_list[0];
                    let shippingType = 'Domestic';
                    if(shippingAddress.country!=storeDetails.country) { shippingType = 'International'; }
                    let queryParams = { store_id: mongoose.Types.ObjectId(req.body.store_id), shipping_type: shippingType, status: "active" };
                    if(req.body.shipping_id) {
                        queryParams = { _id: mongoose.Types.ObjectId(req.body.shipping_id), store_id: mongoose.Types.ObjectId(req.body.store_id), status: "active" };
                    }
                    shipping.find(queryParams, function(err, response) {
                        if(!err && response.length) {
                            if(response.length===1) {
                                let shippingMethod = response[0];
                                let modelList = [];
                                validationService.findCartSubTotal(storeDetails._id, currencyDetails, modelList, req.body.item_list, checkoutSetting).then((respData) => {
                                    if(respData.item_list.length) {
                                        validationService.getShippingPrice(shippingMethod, shippingAddress, respData.cart_weight, respData.sub_total).then((shippingData) => {
                                            shippingData.shipping_price = commonService.CALC_AC(currencyDetails, shippingData.shipping_price);
                                            let sessionData = {
                                                store_id: storeDetails._id, session_id: sessionId, order_type: 'delivery', currency_type: req.body.currency_type,
                                                item_list: req.body.item_list, shipping_method: shippingData, shipping_address: req.body.shipping_address, quick_order_id: null
                                            };
                                            if(req.body.quick_order_id) { sessionData.quick_order_id = req.body.quick_order_id; }
                                            orderSession.findOne({ store_id: sessionData.store_id, session_id: sessionData.session_id, status: "active" }, function(err, response) {
                                                if(!err && response) {
                                                    sessionData.updated_on = new Date();
                                                    orderSession.findByIdAndUpdate(response._id, { $set: sessionData }, { new: true }, function(err, response) {
                                                        if(!err && response) {
                                                            res.json({ status: true, data: response });
                                                        }
                                                        else {
                                                            res.json({ status: false, error: err, message: "Unable to create session" });
                                                        }
                                                    });
                                                }
                                                else {
                                                    orderSession.create(sessionData, function(err, response) {
                                                        if(!err && response) {
                                                            res.json({ status: true, data: response });
                                                        }
                                                        else {
                                                            res.json({ status: false, error: err, message: "Unable to create session" });
                                                        }
                                                    });
                                                }
                                            });
                                        }).catch((errorMsg) => {
                                            res.json({ status: false, message: errorMsg });
                                        });
                                    }
                                    else { res.json({ status: false, message: "No valid items found" }); }
                                });
                            }
                            else { res.json({ status: false, message: "Multiple shipping exists" }); }
                        }
                        else { res.json({ status: false, error: err, message: "Shipping method doesn't exists" }); }
                    });
                }
                else { res.json({ status: false, message: "Address doesn't exists" }); }
            }
            else { res.json({ status: false, error: err, message: "Invalid user" }); }
        });
    }
    else { res.json({ status: false, message: "Session ID missing" }); }
}

exports.checkout_details = (req, res) => {
    guestUser.findOne({ _id: mongoose.Types.ObjectId(req.id), status: 'active' }, function(err, response) {
        if(!err && response)
        {
            let customerDetails = response;
            let storeId = customerDetails.store_id;
            let sessionId = req.query.sid+'-'+customerDetails._id;
            orderSession.findOne({ store_id: storeId, session_id: sessionId, status: "active" }, function(err, response) {
                if(!err && response) {
                    let orderSessionData = response;
                    store.aggregate([
                        { $match: { _id: mongoose.Types.ObjectId(storeId), status: 'active' } },
                        {
                            $lookup: {
                                from: "store_permissions",
                                localField: "_id",
                                foreignField: "store_id",
                                as: "storeProperties"
                            }
                        }
                    ], function(err, response) {
                        if(!err && response[0])
                        {
                            let storeDetails = response[0];
                            let storeProperties = storeDetails.storeProperties[0];
                            let checkoutSetting = storeProperties.checkout_setting;
                            let currencyDetails = storeDetails.currency_types.filter(obj => obj.country_code==orderSessionData.currency_type)[0];
                            // quick order details
                            validationService.getQuickOrderDetails(storeDetails._id, orderSessionData).then((qoData) => {
                                // shipping address
                                let shippingAddress = "";
                                if(orderSessionData.order_type=='pickup') {
                                    let addrIndex = storeProperties.branches.findIndex(obj =>obj._id==orderSessionData.shipping_address);
                                    if(addrIndex!=-1) { shippingAddress = storeProperties.branches[addrIndex]; }
                                }
                                else if(customerDetails.address_list.length) { shippingAddress = customerDetails.address_list[0]; }
                                if(shippingAddress!='') {
                                    let modelList = [];
                                    validationService.findCartSubTotal(storeDetails._id, currencyDetails, modelList, orderSessionData.item_list, checkoutSetting).then((respData) => {
                                        respData.shipping_address = shippingAddress;
                                        respData.customer_name = shippingAddress.name;
                                        respData.customer_email = customerDetails.email;
                                        respData.customer_dial_code = shippingAddress.dial_code;
                                        respData.customer_mobile = shippingAddress.mobile;
                                        // packageing charges
                                        respData.packaging_charges = 0;
                                        if(storeDetails.packaging_charges && storeDetails.packaging_charges.value>0) {
                                            let packConfig = storeDetails.packaging_charges;
                                            if(packConfig.type=='percentage') {
                                                respData.packaging_charges = Math.ceil(respData.selling_sub_total*(packConfig.value/100));
                                                if(packConfig.min_package_amt > respData.packaging_charges) { respData.packaging_charges = packConfig.min_package_amt; }
                                            }
                                            else { respData.packaging_charges = commonService.CALC_AC(currencyDetails, packConfig.value); }
                                        }
                                        // billing address
                                        if(orderSessionData.order_type!='pickup') { respData.billing_address = shippingAddress; }
                                        // quick order discount
                                        respData.manual_discount = 0;
                                        if(qoData) {
                                            respData.quick_order_id = qoData._id;
                                            if(qoData.disc_status && qoData.disc_config) {
                                                let discConfig = qoData.disc_config;
                                                if(discConfig.type=='amount') { respData.manual_discount = discConfig.value; }
                                                else { respData.manual_discount = parseFloat((respData.sub_total*(discConfig.value/100)).toFixed(2)); }
                                                if(respData.manual_discount > respData.sub_total) { respData.manual_discount = respData.sub_total; }
                                            }
                                        }
                                        respData.shipping_method = orderSessionData.shipping_method;
                                        respData.currency_type = orderSessionData.currency_type;
                                        respData.order_type = orderSessionData.order_type;
                                        respData.buy_now = orderSessionData.buy_now;
                                        res.json({ status: true,  data: respData });
                                    });
                                }
                                else { res.json({ status: false, message: "Address doesn't exists" }); }
                            });
                        }
                        else { res.json({ status: false, error: err, message: "Invalid Store" }); }
                    });
                }
                else { res.json({ status: false, error: err, message: "Invalid session" }); }
            });
        }
        else { res.json({ status: false, error: err, message: "Invalid user" }); }
    });
}

exports.calc_discount = (req, res) => {
    guestUser.findOne({ _id: mongoose.Types.ObjectId(req.id), status: 'active' }, function(err, response) {
        if(!err && response)
        {
            let customerDetails = response;
            let sessionId = req.body.sid+'-'+customerDetails._id;
            orderSession.findOne({ store_id: customerDetails.store_id, session_id: sessionId, status: "active" }, function(err, response) {
                if(!err && response) {
                    let orderSessionData = response;
                    req.body.shipping_address = orderSessionData.shipping_address;
                    req.body.currency_type = orderSessionData.currency_type;
                    req.body.item_list = orderSessionData.item_list;
                    req.body.shipping_method = orderSessionData.shipping_method;
                    if(req.body.coupon_list.length || req.body.offer_code) {
                        store.aggregate([
                            { $match: { _id: mongoose.Types.ObjectId(req.body.store_id), status: 'active' } },
                            {
                                $lookup: {
                                    from: "store_permissions",
                                    localField: "_id",
                                    foreignField: "store_id",
                                    as: "storeProperties"
                                }
                            }
                        ], function(err, response) {
                            if(!err && response[0])
                            {
                                let storeDetails = response[0];
                                let storeProperties = storeDetails.storeProperties[0];
                                let appSetting = storeProperties.application_setting;
                                let checkoutSetting = storeProperties.checkout_setting;
                                let currencyDetails = storeDetails.currency_types.filter(obj => obj.country_code==req.body.currency_type)[0];
                                // quick order details
                                validationService.getQuickOrderDetails(storeDetails._id, orderSessionData).then((qoData) => {
                                    // shipping address
                                    let shippingAddress = "";
                                    if(req.body.order_type=='pickup') {
                                        let addrIndex = storeProperties.branches.findIndex(obj =>obj._id==req.body.shipping_address);
                                        if(addrIndex!=-1) { shippingAddress = storeProperties.branches[addrIndex]; }
                                    }
                                    else if(customerDetails.address_list.length) { shippingAddress = customerDetails.address_list[0]; }
                                    if(shippingAddress!="") {
                                        let modelList = [];
                                        validationService.findCartSubTotal(storeDetails._id, currencyDetails, modelList, req.body.item_list, checkoutSetting).then((respData) => {
                                            if(respData.item_list.length) {
                                                let orderData = {
                                                    store_id: storeDetails._id, item_list: respData.item_list, gift_wrapper: 0, packaging_charges: 0
                                                };
                                                // gift wrapper
                                                if(req.body.gift_status) {
                                                    orderData.gift_status = true;
                                                    if(appSetting.gift_wrapping_charges>0) {
                                                        orderData.gift_wrapper = commonService.CALC_AC(currencyDetails, appSetting.gift_wrapping_charges);
                                                    }
                                                }
                                                // packageing charges
                                                if(storeDetails.packaging_charges && storeDetails.packaging_charges.value>0) {
                                                    let packConfig = storeDetails.packaging_charges;
                                                    if(packConfig.type=='percentage') {
                                                        orderData.packaging_charges = Math.ceil(respData.selling_sub_total*(packConfig.value/100));
                                                        if(packConfig.min_package_amt > orderData.packaging_charges) { orderData.packaging_charges = packConfig.min_package_amt; }
                                                    }
                                                    else { orderData.packaging_charges = commonService.CALC_AC(currencyDetails, packConfig.value); }
                                                }
                                                // calc
                                                orderData.sub_total = respData.sub_total;
                                                orderData.shipping_method = req.body.shipping_method;
                                                orderData.shipping_cost = orderData.shipping_method.shipping_price;
                                                orderData.discount_amount = 0;
                                                orderData.grand_total = parseFloat(orderData.sub_total)+parseFloat(orderData.shipping_cost)+parseFloat(orderData.gift_wrapper)+parseFloat(orderData.packaging_charges);
                                                // quick order discount
                                                if(qoData && qoData.disc_status && qoData.disc_config) {
                                                    let discConfig = qoData.disc_config;
                                                    if(discConfig.type=='amount') { orderData.discount_amount = discConfig.value; }
                                                    else { orderData.discount_amount = parseFloat((orderData.sub_total*(discConfig.value/100)).toFixed(2)); }
                                                    if(orderData.discount_amount > orderData.sub_total) { orderData.discount_amount = orderData.sub_total; }
                                                }
                                                // offer code
                                                if(req.body.offer_code)
                                                {
                                                    let shippingType = 'international';
                                                    if(storeDetails.country==shippingAddress.country) { shippingType = 'domestic'; }
                                                    getOfferCodeDetails(storeDetails._id, req.body.offer_code).then((respOfferData) => {
                                                        if(respOfferData.status) {
                                                            let codeData = {
                                                                code_details: respOfferData.data, checkout_setting: checkoutSetting, shipping_type: shippingType, 
                                                                item_list: orderData.item_list, shipping_cost: orderData.shipping_cost, cart_qty: respData.cart_qty,
                                                                wo_disc_sub_total: (respData.wo_disc_sub_total*1)-(orderData.discount_amount*1)
                                                            }
                                                            if(codeData.wo_disc_sub_total<0) { codeData.wo_disc_sub_total = 0; }
                                                            validationService.calcOfferAmount(codeData).then((respOfferDetails) => {
                                                                if(respOfferDetails.status) {
                                                                    let offerAmt = respOfferDetails.amount;
                                                                    let remainingAmt = orderData.grand_total - orderData.discount_amount;
                                                                    if(offerAmt > remainingAmt) { offerAmt = remainingAmt; }
                                                                    orderData.discount_amount += offerAmt;
                                                                    remainingAmt = orderData.grand_total - orderData.discount_amount;
                                                                    if(remainingAmt > 0 && req.body.coupon_list.length) {
                                                                        validationService.processCouponList(req.body.store_id, req.body.coupon_list).then((updatedCouponList) => {
                                                                            let validIndex = updatedCouponList.findIndex(obj => obj.status=='valid');
                                                                            if(validIndex!=-1) {
                                                                                let gcList = validationService.calcGiftCardAmount(remainingAmt, updatedCouponList);
                                                                                res.json({ status: true, offer_amount: offerAmt, coupon_list: gcList });
                                                                            }
                                                                            else {
                                                                                res.json({ status: true, offer_amount: offerAmt, coupon_list: [] });
                                                                            }
                                                                        });
                                                                    }
                                                                    else { res.json({ status: true, offer_amount: offerAmt, coupon_list: [] }); }
                                                                }
                                                                else { res.json(respOfferDetails); }
                                                            });
                                                        }
                                                        else { res.json(respOfferData); }
                                                    });
                                                }
                                                else {
                                                    let remainingAmt = orderData.grand_total - orderData.discount_amount;
                                                    if(remainingAmt > 0) {
                                                        validationService.processCouponList(req.body.store_id, req.body.coupon_list).then((updatedCouponList) => {
                                                            let validIndex = updatedCouponList.findIndex(obj => obj.status=='valid');
                                                            if(validIndex!=-1) {
                                                                let gcList = validationService.calcGiftCardAmount(remainingAmt, updatedCouponList);
                                                                res.json({ status: true,  offer_amount: 0, coupon_list: gcList });
                                                            }
                                                            else {
                                                                res.json({ status: true,  offer_amount: 0, coupon_list: [] });
                                                            }
                                                        });
                                                    }
                                                    else { res.json({ status: true,  offer_amount: 0, coupon_list: [] }); }
                                                }
                                            }
                                            else { res.json({ status: false, message: "No valid items found" }); }
                                        });
                                    }
                                    else { res.json({ status: false, message: "Address doesn't exists" }); }
                                });
                            }
                            else { res.json({ status: false, error: err, message: "Invalid Store" }); }
                        });
                    }
                    else { res.json({ status: false, error: err, message: "Invalid code" }); }
                }
                else { res.json({ status: false, error: err, message: "Invalid session" }); }
            });
        }
        else { res.json({ status: false, error: err, message: "Invalid user" }); }
    });
}

exports.create_order_v2 = (req, res) => {
    guestUser.findOne({ _id: mongoose.Types.ObjectId(req.id), status: 'active' }, function(err, response) {
        if(!err && response)
        {
            let customerDetails = response;
            let sessionId = req.body.sid+'-'+customerDetails._id;
            orderSession.findOne({ store_id: customerDetails.store_id, session_id: sessionId, status: "active" }, function(err, response) {
                if(!err && response) {
                    let orderSessionData = response;
                    req.body.buy_now = orderSessionData.buy_now;
                    req.body.order_type = orderSessionData.order_type;
                    req.body.shipping_address = orderSessionData.shipping_address;
                    req.body.currency_type = orderSessionData.currency_type;
                    req.body.item_list = orderSessionData.item_list;
                    // unique item list
                    let uniqueProductList = [];
                    req.body.item_list.forEach(x => {
                        let index = uniqueProductList.findIndex(obj => obj.product_id==x.product_id && JSON.stringify(obj.variant_types)==JSON.stringify(x.variant_types));
                        if(index!=-1) uniqueProductList[index].quantity += x.quantity;
                        else uniqueProductList.push({ product_id: x.product_id, quantity: x.quantity, unit: x.unit, variant_types: x.variant_types });
                    });
                    validationService.checkProductsAvailability(uniqueProductList).then((updatedItemList) => {
                        if(updatedItemList.findIndex(object => object.unavailable) == -1) {
                            // hold product
                            stockService.holdProductAndCoupon(uniqueProductList, req.body.coupon_list).then(() => {
                                // if hold selected products
                                currencyList.findOne({ name: req.body.currency_type }, function(err, response) {
                                    if(!err && response) {
                                        let liveCurrencyDetails = response;
                                        store.aggregate([
                                            { $match: { _id: mongoose.Types.ObjectId(customerDetails.store_id), status: 'active' } },
                                            {
                                                $lookup: {
                                                    from: "store_permissions",
                                                    localField: "_id",
                                                    foreignField: "store_id",
                                                    as: "storeProperties"
                                                }
                                            }
                                        ], function(err, response) {
                                            if(!err && response[0])
                                            {
                                                let storeDetails = response[0];
                                                let storeProperties = storeDetails.storeProperties[0];
                                                let appSetting = storeProperties.application_setting;
                                                let checkoutSetting = storeProperties.checkout_setting;
                                                let baseCurrency = storeDetails.currency_types.filter(obj => obj.default_currency)[0].country_code;
                                                let currencyData = {
                                                    country_code: req.body.currency_type,
                                                    html_code: liveCurrencyDetails.html_code,
                                                    country_inr_value: liveCurrencyDetails.rates[baseCurrency].toFixed(2)
                                                };
                                                let currencyDetails = storeDetails.currency_types.filter(obj => obj.country_code==req.body.currency_type)[0];
                                                // quick order details
                                                validationService.getQuickOrderDetails(storeDetails._id, orderSessionData).then((qoData) => {
                                                    // shipping address
                                                    let shippingAddress = "";
                                                    if(req.body.order_type=='pickup') {
                                                        let addrIndex = storeProperties.branches.findIndex(obj =>obj._id==req.body.shipping_address);
                                                        if(addrIndex!=-1) { shippingAddress = storeProperties.branches[addrIndex]; }
                                                    }
                                                    else if(customerDetails.address_list.length) { shippingAddress = customerDetails.address_list[0]; }
                                                    if(shippingAddress!="") {
                                                        let modelList = [];
                                                        validationService.findCartSubTotal(storeDetails._id, currencyDetails, modelList, req.body.item_list, checkoutSetting).then((respData) => {
                                                            if(respData.item_list.length) {
                                                                let orderData = {
                                                                    store_id: storeDetails._id, customer_id: storeDetails._id, customer_name: shippingAddress.name, payment_success: false,
                                                                    order_status: 'placed', status: 'inactive', order_by: 'guest', order_type: req.body.order_type, item_list: respData.item_list,
                                                                    payment_details: req.body.payment_details, currency_type: currencyData, gift_wrapper: 0, packaging_charges: 0, coupon_list: [],
                                                                    shipping_address: shippingAddress, session_id: orderSessionData.session_id, shipping_method: orderSessionData.shipping_method
                                                                };
                                                                if(req.body.buy_now) { orderData.buy_now = true; }
                                                                if(qoData) { orderData.quick_order_id = qoData._id; }
                                                                if(req.body.need_sample) { orderData.need_sample = true; }
                                                                if(req.body.order_note) { orderData.order_note = req.body.order_note; }
                                                                // vendors
                                                                orderData.vendor_list = [];
                                                                respData.item_list.forEach(element => {
                                                                    if(element.vendor_id) {
                                                                        let finalPrice = ((element.final_price*element.quantity)+parseFloat(element.addon_price));
                                                                        if(element.unit=="Pcs") { finalPrice = (element.final_price*element.quantity); }
                                                                        let vendorIndex = orderData.vendor_list.findIndex(obj => obj.vendor_id==element.vendor_id);
                                                                        if(vendorIndex != -1) { orderData.vendor_list[vendorIndex].total += finalPrice; }
                                                                        else { orderData.vendor_list.push({ vendor_id: element.vendor_id, total: finalPrice }); }
                                                                    }
                                                                });
                                                                // billing address
                                                                if(req.body.order_type!='pickup') { orderData.billing_address = shippingAddress; }
                                                                // gift wrapper
                                                                if(req.body.gift_status) {
                                                                    orderData.gift_status = true;
                                                                    if(appSetting.gift_wrapping_charges>0) {
                                                                        orderData.gift_wrapper = commonService.CALC_AC(currencyDetails, appSetting.gift_wrapping_charges);
                                                                    }
                                                                }
                                                                // packageing charges
                                                                if(storeDetails.packaging_charges && storeDetails.packaging_charges.value>0) {
                                                                    let packConfig = storeDetails.packaging_charges;
                                                                    if(packConfig.type=='percentage') {
                                                                        orderData.packaging_charges = Math.ceil(respData.selling_sub_total*(packConfig.value/100));
                                                                        if(packConfig.min_package_amt > orderData.packaging_charges) { orderData.packaging_charges = packConfig.min_package_amt; }
                                                                    }
                                                                    else { orderData.packaging_charges = commonService.CALC_AC(currencyDetails, packConfig.value); }
                                                                }
                                                                // calc
                                                                orderData.sub_total = respData.sub_total;
                                                                orderData.shipping_cost = orderData.shipping_method.shipping_price;
                                                                orderData.discount_amount = 0;
                                                                orderData.grand_total = parseFloat(orderData.sub_total)+parseFloat(orderData.shipping_cost)+parseFloat(orderData.gift_wrapper)+parseFloat(orderData.packaging_charges);
                                                                // quick order discount
                                                                if(qoData && qoData.disc_status && qoData.disc_config) {
                                                                    orderData.manual_discount = {};
                                                                    let discConfig = qoData.disc_config;
                                                                    if(discConfig.type=='amount') { orderData.discount_amount = discConfig.value; }
                                                                    else {
                                                                        orderData.discount_amount = parseFloat((orderData.sub_total*(discConfig.value/100)).toFixed(2));
                                                                        orderData.manual_discount.percentage = discConfig.value;
                                                                    }
                                                                    if(orderData.discount_amount > orderData.sub_total) { orderData.discount_amount = orderData.sub_total; }
                                                                    orderData.manual_discount.amount = orderData.discount_amount;
                                                                }
                                                                // calculate discount
                                                                if(req.body.coupon_list.length || req.body.offer_code) {
                                                                    let shippingType = 'international';
                                                                    if(storeDetails.country==orderData.shipping_address.country) { shippingType = 'domestic'; }
                                                                    // offer code
                                                                    if(req.body.offer_code)
                                                                    {
                                                                        getOfferCodeDetails(storeDetails._id, req.body.offer_code).then((respOfferData) => {
                                                                            if(respOfferData.status) {
                                                                                let codeData = {
                                                                                    code_details: respOfferData.data, checkout_setting: checkoutSetting, shipping_type: shippingType, 
                                                                                    item_list: orderData.item_list, shipping_cost: orderData.shipping_cost, cart_qty: respData.cart_qty,
                                                                                    wo_disc_sub_total: (respData.wo_disc_sub_total*1)-(orderData.discount_amount*1)
                                                                                }
                                                                                if(codeData.wo_disc_sub_total<0) { codeData.wo_disc_sub_total = 0; }
                                                                                validationService.calcOfferAmount(codeData).then((respOfferDetails) => {
                                                                                    if(respOfferDetails.status) {
                                                                                        orderData.offer_applied = true;
                                                                                        orderData.offer_details = {
                                                                                            id: codeData.code_details._id, code: codeData.code_details.code, price: respOfferDetails.amount
                                                                                        };
                                                                                        let offerAmt = respOfferDetails.amount;
                                                                                        let remainingAmt = orderData.grand_total - orderData.discount_amount;
                                                                                        if(offerAmt > remainingAmt) { offerAmt = remainingAmt; }
                                                                                        orderData.discount_amount += offerAmt;
                                                                                        remainingAmt = orderData.grand_total - orderData.discount_amount;
                                                                                        if(remainingAmt > 0) {
                                                                                            validationService.processCouponList(storeDetails._id, req.body.coupon_list).then((updatedCouponList) => {
                                                                                                let filterCouponList = updatedCouponList.filter(obj => obj.status=='valid');
                                                                                                if(filterCouponList.length) {
                                                                                                    orderData.coupon_list = validationService.calcGiftCardAmount(remainingAmt, filterCouponList);
                                                                                                    orderData.discount_amount += orderData.coupon_list.reduce((accumulator, currentValue) => {
                                                                                                        return accumulator + currentValue['price'];
                                                                                                    }, 0);
                                                                                                }
                                                                                                // create order
                                                                                                continueOrderCreation(orderData, storeDetails, customerDetails, currencyDetails, uniqueProductList).then((orderResponse) => {
                                                                                                    res.json(orderResponse);
                                                                                                });
                                                                                            });
                                                                                        }
                                                                                        else {
                                                                                            // create order
                                                                                            continueOrderCreation(orderData, storeDetails, customerDetails, currencyDetails, uniqueProductList).then((orderResponse) => {
                                                                                                res.json(orderResponse);
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        let remainingAmt = orderData.grand_total - orderData.discount_amount;
                                                                                        if(remainingAmt > 0) {
                                                                                            validationService.processCouponList(storeDetails._id, req.body.coupon_list).then((updatedCouponList) => {
                                                                                                let filterCouponList = updatedCouponList.filter(obj => obj.status=='valid');
                                                                                                if(filterCouponList.length) {
                                                                                                    orderData.coupon_list = validationService.calcGiftCardAmount(remainingAmt, filterCouponList);
                                                                                                    orderData.discount_amount += orderData.coupon_list.reduce((accumulator, currentValue) => {
                                                                                                        return accumulator + currentValue['price'];
                                                                                                    }, 0);
                                                                                                }
                                                                                                // create order
                                                                                                continueOrderCreation(orderData, storeDetails, customerDetails, currencyDetails, uniqueProductList).then((orderResponse) => {
                                                                                                    res.json(orderResponse);
                                                                                                });
                                                                                            });
                                                                                        }
                                                                                        else {
                                                                                            // create order
                                                                                            continueOrderCreation(orderData, storeDetails, customerDetails, currencyDetails, uniqueProductList).then((orderResponse) => {
                                                                                                res.json(orderResponse);
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                            else {
                                                                                let remainingAmt = orderData.grand_total - orderData.discount_amount;
                                                                                if(remainingAmt > 0) {
                                                                                    validationService.processCouponList(storeDetails._id, req.body.coupon_list).then((updatedCouponList) => {
                                                                                        let filterCouponList = updatedCouponList.filter(obj => obj.status=='valid');
                                                                                        if(filterCouponList.length) {
                                                                                            orderData.coupon_list = validationService.calcGiftCardAmount(remainingAmt, filterCouponList);
                                                                                            orderData.discount_amount += orderData.coupon_list.reduce((accumulator, currentValue) => {
                                                                                                return accumulator + currentValue['price'];
                                                                                            }, 0);
                                                                                        }
                                                                                        // create order
                                                                                        continueOrderCreation(orderData, storeDetails, customerDetails, currencyDetails, uniqueProductList).then((orderResponse) => {
                                                                                            res.json(orderResponse);
                                                                                        });
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    // create order
                                                                                    continueOrderCreation(orderData, storeDetails, customerDetails, currencyDetails, uniqueProductList).then((orderResponse) => {
                                                                                        res.json(orderResponse);
                                                                                    });
                                                                                }
                                                                            }
                                                                        });
                                                                    }
                                                                    else {
                                                                        let remainingAmt = orderData.grand_total - orderData.discount_amount;
                                                                        if(remainingAmt > 0) {
                                                                            validationService.processCouponList(storeDetails._id, req.body.coupon_list).then((updatedCouponList) => {
                                                                                let filterCouponList = updatedCouponList.filter(obj => obj.status=='valid');
                                                                                if(filterCouponList.length) {
                                                                                    orderData.coupon_list = validationService.calcGiftCardAmount(remainingAmt, filterCouponList);
                                                                                    orderData.discount_amount += orderData.coupon_list.reduce((accumulator, currentValue) => {
                                                                                        return accumulator + currentValue['price'];
                                                                                    }, 0);
                                                                                }
                                                                                // create order
                                                                                continueOrderCreation(orderData, storeDetails, customerDetails, currencyDetails, uniqueProductList).then((orderResponse) => {
                                                                                    res.json(orderResponse);
                                                                                });
                                                                            });
                                                                        }
                                                                        else {
                                                                            // create order
                                                                            continueOrderCreation(orderData, storeDetails, customerDetails, currencyDetails, uniqueProductList).then((orderResponse) => {
                                                                                res.json(orderResponse);
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                                else {
                                                                    // create order
                                                                    continueOrderCreation(orderData, storeDetails, customerDetails, currencyDetails, uniqueProductList).then((orderResponse) => {
                                                                        res.json(orderResponse);
                                                                    });
                                                                }  
                                                            }
                                                            else { res.json({ status: false, message: "No valid items found" }); }
                                                        });
                                                    }
                                                    else { res.json({ status: false, message: "Address doesn't exists" }); }
                                                });
                                            }
                                            else { res.json({ status: false, error: err, message: "Invalid Store" }); }
                                        });
                                    }
                                    else { res.json({ status: false, error: err, message: "Invalid currency" }); }
                                });
                            });
                        }
                        else { res.json({ status: false, item_list: updatedItemList, message: "Some items not available" }); }
                    });
                }
                else { res.json({ status: false, error: err, message: "Invalid session" }); }
            });
        }
        else { res.json({ status: false, error: err, message: "Invalid user" }); }
    });
}

function continueOrderCreation(orderData, storeDetails, customerDetails, currencyDetails, uniqueProductList) {
    return new Promise((resolve, reject) => {
        let payIndex = storeDetails.payment_types.findIndex(obj => obj.name==orderData.payment_details.name && obj.status=='active');
        if(!orderData.payment_details.name || payIndex!=-1) {
            orderData.final_price = orderData.grand_total - orderData.discount_amount;
            if(orderData.final_price>0 && orderData.payment_details.name && orderData.payment_details.name!='COD') {
                orderData.order_number = commonService.orderNumber();
                orderList.create(orderData, function(err, response) {
                    if(!err && response)
                    {
                        let orderDetails = response;
                        orderDetails.customer_email = customerDetails.email;
                        if(orderDetails.payment_details.name=="Razorpay")
                        {
                            createPayment.createRazorpay(orderDetails, function(err, response) {
                                if(!err && response) { resolve({ status: true, data: response }); }
                                else { resolve({ status: false, error: err, message: response }); }
                            });
                        }
                        else if(orderDetails.payment_details.name=="PayPal")
                        {
                            createPayment.createPaypal(orderDetails, function(err, response) {
                                if(!err && response) { resolve({ status: true, data: response }); }
                                else { resolve({ status: false, error: err, message: response }); }
                            });
                        }
                        else if(orderDetails.payment_details.name=="CCAvenue")
                        {
                            let sendData = {
                                order_type: "product",
                                payment_method: 'CCAvenue',
                                order_details: orderDetails,
                                order_id: orderDetails._id,
                                order_number: orderDetails.order_number,
                                currency: orderDetails.currency_type.country_code,
                                amount: Number(commonService.priceConvert(orderDetails.currency_type, orderDetails.final_price))
                            };
                            resolve({ status: true, data: sendData });
                        }
                        else if(orderDetails.payment_details.name=="Square")
                        {
                            let sendData = {
                                order_type: "product",
                                payment_method: 'Square',
                                order_id: orderDetails._id,
                                order_number: orderDetails.order_number,
                                currency: orderDetails.currency_type.country_code,
                                amount: Number(commonService.priceConvert(orderDetails.currency_type, orderDetails.final_price))
                            };
                            resolve({ status: true, data: sendData });
                        }
                        else if(orderDetails.payment_details.name=="Fatoorah")
                        {
                            orderDetails.fatoorah_pay_id = req.body.fatoorah_pay_id;
                            createPayment.createFatoorah(orderDetails, function(err, response) {
                                if(!err && response) { resolve({ status: true, data: response }); }
                                else { resolve({ status: false, error: err, message: response }); }
                            });
                        }
                        else if(orderDetails.payment_details.name=="Telr")
                        {
                            createPayment.createTelr(orderDetails, function(err, response) {
                                if(!err && response) { resolve({ status: true, data: response }); }
                                else { resolve({ status: false, error: err, message: response }); }
                            });
                        }
                        else if(orderDetails.payment_details.name=="Foloosi")
                        {
                            createPayment.createFoloosi(orderDetails, function(err, response) {
                                if(!err && response) { resolve({ status: true, data: response }); }
                                else { resolve({ status: false, error: err, message: response }); }
                            });
                        }
                        else if(orderDetails.payment_details.name=="Gpay")
                        {
                            let sendData = {
                                order_id: orderDetails._id,
                                order_number: orderDetails.order_number,
                                currency: orderDetails.currency_type.country_code,
                                amount: Number(commonService.priceConvert(orderDetails.currency_type, orderDetails.final_price))
                            };
                            resolve({ status: true, data: sendData });
                        }
                        else if(orderDetails.payment_details.name=="Bank Payment")
                        {
                            let sendData = {
                                order_id: orderDetails._id,
                                order_number: orderDetails.order_number,
                                currency: orderDetails.currency_type.country_code,
                                amount: Number(commonService.priceConvert(orderDetails.currency_type, orderDetails.final_price))
                            };
                            resolve({ status: true, data: sendData });
                        }
                        else {
                            resolve({ status: false, message: "Invalid payment method" });
                        }
                    }
                    else { resolve({ status: false, error: err, message: "Unable to place order" }); }
                });
            }
            else {
                if(orderData.payment_details.name=='COD') {
                    let codConfig = storeDetails.payment_types[payIndex].cod_config;
                    orderData.cod_charges = commonService.CALC_AC(currencyDetails, codConfig.cod_charges);
                    orderData.grand_total += orderData.cod_charges;
                    orderData.final_price += orderData.cod_charges;
                }
                orderData.order_number = commonService.orderNumber();
                orderData.status = "active";
                orderData.invoice_number = "";
                if(storeDetails.invoice_status) {
                    orderData.invoice_number = commonService.invoiceNumber(storeDetails.invoice_config);
                }
                orderList.create(orderData, function(err, response) {
                    if(!err && response)
                    {
                        let orderDetails = response;
                        // ERP
                        let erpDetails = storeDetails.erp_details;
                        if(erpDetails && erpDetails.name=='ambar' && erpDetails.status=='active') {
                            orderDetails.customer_email = customerDetails.email;
                            let erpData = {
                                erp_config: erpDetails.config,
                                store_id: storeDetails._id, event_type: 'place_order',
                                user_agent: req.get('User-Agent'), order_details: orderDetails
                            }
                            erpService.ambar(erpData);
                        }
                        // update next invoice no
                        if(orderDetails.invoice_number) {
                            store.findByIdAndUpdate(storeDetails._id, { $inc: { "invoice_config.next_invoice_no": 1 } }, function(err, response) { });
                        }
                        // clear guest user cart
                        guestUser.findByIdAndUpdate(customerDetails._id, { $set: { cart_list: [], cod_otp: null, cod_otp_request_on: null } }, function(err, response) { });
                        // decrease product stock
                        stockService.decProductStock(orderDetails.item_list);
                        // decrease coupon balance
                        if(orderDetails.coupon_list.length) { stockService.updateCouponBalance(orderDetails); }
                        // update offer redeem count
                        if(orderDetails.offer_details) { stockService.incOfferRedeemCount(orderDetails.offer_details); }
                        // order placed mail
                        mailService.sendOrderPlacedMail(null, orderDetails._id);
                        // order placed mail to vendor
                        mailService.sendOrderPlacedMailToVendor(orderDetails._id);
                        // response
                        let sendData = { order_type: "product", order_id: orderDetails._id };
                        resolve({ status: true, data: sendData });
                    }
                    else { resolve({ status: false, error: err, message: "Unable to place order" }); }
                });
            }
        }
        else { resolve({ status: false, message: "Invalid payment method" }); }
    });
}
// for v2 order end

exports.order_details = (req, res) => {
    orderList.findOne({ _id: mongoose.Types.ObjectId(req.query.order_id) }, function(err, response) {
        if(!err && response) {
            res.json({ status: true, data: response });
        }
        else {
            res.json({ status: false, error: err, message: "Invalid order" });
        }
    });
}

// cod otp
exports.send_cod_otp = (req, res) => {
    store.findOne({ _id: mongoose.Types.ObjectId(req.body.store_id) }, function(err, response) {
        if(!err && response)
        {
            let codDetails = response.payment_types.filter(obj => obj.name=='COD');
            if(codDetails.length && req.body.mobile) {
                let smsConfig = codDetails[0].sms_config;
                if(smsConfig.provider=='24x7SMS') {
                    let otp = Math.floor(100000+Math.random()*999999);
                    let msgContent = smsConfig.msg_content.replace(/#OTP#/g, otp);
                    let smsOptions = {
                        method: 'get',
                        url: 'https://smsapi.24x7sms.com/api_2.0/SendSMS.aspx?APIKEY='+smsConfig.api_key+'&MobileNo='+req.body.mobile+'&SenderID='+smsConfig.sender_id+'&Message='+urlencode(msgContent)+'&ServiceName='+smsConfig.service_name+'&DLTTemplateID='+smsConfig.template_id,
                    };
                    request(smsOptions, function (err, response) {
                        if(!err && response.statusCode == 200) {
                            if(response.body.indexOf('success')!=-1) {
                                guestUser.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.id) }, { $set: { cod_otp: otp, cod_otp_request_on: new Date() } }, function(err, response) {
                                    if(!err && response) { res.json({ status: true }); }
                                    else { res.json({ status: false, error: err, message: "OTP update error" }); }
                                });
                            }
                            else { res.json({ status: false, error: response.body, message: "Unable to send SMS" }); }
                        }
                        else { res.json({ status: false, error: err, message: "SMS gateway error" }); }
                    });
                }
                else { res.json({ status: false, message: "Invalid SMS provider" }); } 
            }
            else { res.json({ status: false, message: "COD or Mobile not exist" }); }
        }
        else { res.json({ status: false, error: err, message: "Invalid Store" }); }
    });
}

exports.validate_cod_otp = (req, res) => {
    guestUser.findOne({ _id: mongoose.Types.ObjectId(req.id), cod_otp: req.query.otp }, function(err, response) {
        if(!err && response) {
            // duration validation 15 minutes
            let timeStamp = ((response.cod_otp_request_on).getTime() + (15*60000));
            let currentTime = new Date().valueOf();
            if(timeStamp > currentTime) { res.json({ status: true }); }
            else { res.json({ status: false, message: "OTP was expired" }); }
        }
        else { res.json({ status: false, error: err, message: "Invalid OTP" }); }
    });
}

function getOfferCodeDetails(storeId, code) {
    return new Promise((resolve, reject) => {
        let queryData = { store_id: mongoose.Types.ObjectId(storeId), code: code, status: "active", enable_status: true, valid_from: { $lte: new Date() } };
        offer.findOne(queryData, function(err, response) {
            if(!err && response) {
                let codeDetails = response;
                if(codeDetails.valid_to)
                {
                    if(new Date(codeDetails.valid_to) >= new Date())
                    {
                        if(codeDetails.restrict_usage) {
                            if(codeDetails.usage_limit > codeDetails.redeemed_count)
                            {
                                if(codeDetails.onetime_usage) { resolve({ status: false, message: "Please login to avail this offer." }); }
                                else { resolve({ status: true, data: codeDetails }); }
                            }
                            else {
                                resolve({ status: false, message: "Offer expired" });
                            }
                        }
                        else {
                            if(codeDetails.onetime_usage) {
                                resolve({ status: false, message: "Please login to avail this offer." });
                            }
                            else {
                                resolve({ status: true, data: codeDetails });
                            }
                        }
                    }
                    else {
                        resolve({ status: false, message: "Offer expired" });
                    }
                }
                else
                {
                    if(codeDetails.restrict_usage) {
                        if(codeDetails.usage_limit > codeDetails.redeemed_count)
                        {
                            if(codeDetails.onetime_usage) { resolve({ status: false, message: "Please login to avail this offer." }); }
                            else { resolve({ status: true, data: codeDetails }); }
                        }
                        else {
                            resolve({ status: false, message: "Offer expired" });
                        }
                    }
                    else {
                        if(codeDetails.onetime_usage) {
                            resolve({ status: false, message: "Please login to avail this offer." });
                        }
                        else {
                            resolve({ status: true, data: codeDetails });
                        }
                    }
                }
            }
            else {
                resolve({ status: false, message: "Invalid code" });
            }
        });
    });
}