const Invoice = require('../Models/invoiceModel');


exports.addToInvoice = async (req, res) => {
    try {
        const { userId, userName, address, paymentMode, cart, totalPrice } = req.body;

        if (!userName || !address || !paymentMode || !cart || !totalPrice) {
            return res.status(400).json({ message: 'Error in order Placement!' });
        }
        const invoice = new Invoice({ userId, userName, address, paymentMode, products: cart, totalPrice });
        await invoice.save();
        res.status(201).json({ invoice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInvoiceByUserId = async (req, res) => {
    try {
        const { userId } = req.body;
        const invoices = await Invoice.find({ userId });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const invoice = await Invoice.findById(invoiceId);

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json({ invoice });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ message: 'Failed to fetch invoice', error: error.message });
    }
};
