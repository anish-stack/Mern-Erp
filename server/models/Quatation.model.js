const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Item Schema for the quotation
const ItemSchema = new Schema({
    id: {

    },
    NameOfProduct: {
        type: String
    },
    UnitPrice:{
        type: String
    },
    Description: { type: String },
    Quantity: { type: String, required: true },
    Discount: {
        type: String
    }

}, { _id: false });

// Quotation Schema
const QuotationSchema = new Schema({
    BusinessOwnerDetails: {
        type: Schema.Types.ObjectId, ref: 'Business', required: true
    },
    quotationNumber: { type: String, required: true, unique: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    items: [ItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'],
        default: 'Draft'
    },
    PaymentTerms: {
        type: Schema.Types.ObjectId, ref: 'Business',
    },
    Roles: [{ type: String }],

    validityPeriod: { type: Date, required: true }
}, { timestamps: true });


// Create the Quotation model
const Quotation = mongoose.model('Quotation', QuotationSchema);

module.exports = Quotation;
