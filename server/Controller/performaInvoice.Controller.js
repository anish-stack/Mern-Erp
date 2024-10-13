const PerformaInvoice = require('../models/PerformaInvoice'); // Adjust the path to your PerformaInvoice model
const Quotation = require('../models/Quatation.model');

// Create a new performa invoice
exports.createPerformaInvoice = async (req, res) => {
    try {
        const {
            invoiceNumber,
            quotationId,
            customerId,
            items,
            totalAmount,
            status,
            validityPeriod,

            Roles
        } = req.body;

        const emptyFields = [];
        if (!invoiceNumber) emptyFields.push('invoiceNumber');
        if (!quotationId) emptyFields.push('quotationId');
        if (!items || items.length === 0) emptyFields.push('items');
        if (!totalAmount) emptyFields.push('totalAmount');
        if (!validityPeriod) emptyFields.push('validityPeriod');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please provide the following fields: ${emptyFields.join(", ")}`
            });
        }

        const checkquotationId = await Quotation.findById(quotationId)
        if (!checkquotationId) {
            return res.status(403).json({
                message: 'invalid Quatations id'
            })
        }
        // Create a new performa invoice instance
        const newPerformaInvoice = new PerformaInvoice({
            invoiceNumber,
            quotationId,

            items,
            totalAmount,
            status,
            validityPeriod,
            customerId,
            Roles
        });

        // Save the performa invoice to the database
        await newPerformaInvoice.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Performa invoice created successfully',
            data: newPerformaInvoice
        });
    } catch (error) {
        // Handle errors, e.g., duplicate invoiceNumber
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Performa invoice with this invoice number already exists' });
        }

        // General server error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all performa invoices
exports.getAllPerformaInvoices = async (req, res) => {
    try {
        const performaInvoices = await PerformaInvoice.find()
        .populate({
            path: 'quotationId',
            populate: {
                path: 'BusinessOwnerDetails', // Adjust this to match your actual field
                model: 'Business' // The name of your Business model
            }
        })
        .populate('customerId'); 
        
        return res.status(200).json({
            success: true,
            count: performaInvoices.length,
            data: performaInvoices
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get a single performa invoice by ID
exports.getSinglePerformaInvoice = async (req, res) => {
    try {
        const id = req.params._id; // Extract the performa invoice ID from the URL

        const performaInvoice = await PerformaInvoice.findById(id).populate('quotationId customerId'); // Populate references
        if (!performaInvoice) {
            return res.status(404).json({
                success: false,
                message: 'Performa invoice not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: performaInvoice
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update a performa invoice by ID
exports.updatePerformaInvoice = async (req, res) => {
    try {
        const id = req.params._id; // Extract the performa invoice ID from the URL

        // Find the performa invoice and update it with the provided data
        const updatedPerformaInvoice = await PerformaInvoice.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the update
        });

        if (!updatedPerformaInvoice) {
            return res.status(404).json({
                success: false,
                message: 'Performa invoice not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Performa invoice updated successfully',
            data: updatedPerformaInvoice
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete a performa invoice by ID
exports.deletePerformaInvoice = async (req, res) => {
    try {
        const id = req.params._id; // Extract the performa invoice ID from the URL

        const deletedPerformaInvoice = await PerformaInvoice.findByIdAndDelete(id);
        if (!deletedPerformaInvoice) {
            return res.status(404).json({
                success: false,
                message: 'Performa invoice not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: deletedPerformaInvoice,
            message: 'Performa invoice deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
