const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    code: String,
    comp_name: String,
    delivery_date: String,
    location: String,
    material: String,
    mobile: String,
    po_date: String,
    po_number: String,
    quantity: String,
    return: {
        type: String,
        default: "0"
    },
    usage: {
        type: String,
        default: "0"
    },
    balance: {
        type: String,
        default: "0"
    },
    return_percentage: {
        type: String,
        default: "0"
    },
    stock: {
        type: String,
        default: "0"
    },
    stock_percentage: {
        type: String,
        default: "0"
    },
    status: {
        type: String,
        default: "inactive"
    },
    unit: String,
    grn_no: String,
    order: String,
    dc_no: String,
    vehicle_no: String,
    receivedQuantity: {
        type: String,
        default: "0"
    },
    return_quantity: {
        type: String,
        default: "0"
    },
    return_reason: {
        type: String,
        default: "0"
    },

});

const collections = mongoose.model("inventory", inventorySchema);

module.exports = collections;
