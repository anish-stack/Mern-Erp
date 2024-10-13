const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const discountRulesSchema = new mongoose.Schema({
    percentage: { type: String },
    applicableOn: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
});

const paymentTermSchema = new mongoose.Schema({
    term: { type: String, required: true }
});

const businessSchema = new mongoose.Schema({
    businessLogo: { type: String, required: true },
    businessName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    gstNumber: { type: String },
    panNumber: { type: String },
    address: addressSchema,
    discountRules: discountRulesSchema,
    paymentTerms: [paymentTermSchema] 
});

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;
