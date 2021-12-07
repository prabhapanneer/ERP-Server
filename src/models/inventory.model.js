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
    category: String,
    code: String,
    comp_address: String,
    comp_gstin: String,
    comp_name: String,
    cont_person: String,
    delivery_date: String,
    delivery_place: String,
    department: String,
    description: String,
    emp_id: String,
    grand_total: Number,
    gst: String,
    location: String,
    mail_status: String,
    material: String,
    mobile: String,
    note: String,
    order_type: String,
    payment: String,
    po_date: String,
    po_number: String,
    po_subject: String,
    prf_number: String,
    price: String,
    quantity: String,
    quote_number: String,
    reference_date: String,
    reference_no: String,
    site_contact_person: String,
    trans_amount: String,
    trans_tax: String,
    type: String,
    unit: String,
    vat: String,
    vend_gstin: String,
});

const collections = mongoose.model("inventory", inventorySchema);

module.exports = collections;
