const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Item Schema for the invoice
const ItemSchema = new Schema({
    item_id: {},
    NameOfProduct: {
        type: String,
    },
    UnitPrice: {
        type: String,
    },
    description: { type: String },
    Quantity: { type: Number, required: true },
    Discount: {
        type: String,
        default:"0"
    }
}, { _id: false });

const PerformaInvoiceSchema = new Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    quotationId: { type: Schema.Types.ObjectId, ref: 'Quotation', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true }, // Add this line

    items: [ItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Issued', 'Cancelled', 'Converted to Invoice'],
        default: 'Pending'
    },
    Roles: [{ type: String }],

    validityPeriod: { type: Date, required: true }
}, { timestamps: true });

// Create the Performa Invoice model
const PerformaInvoice = mongoose.model('PerformaInvoice', PerformaInvoiceSchema);

module.exports = PerformaInvoice;
