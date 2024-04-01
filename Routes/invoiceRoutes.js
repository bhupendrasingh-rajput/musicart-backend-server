const express = require('express');
const router = express.Router();
const { addToInvoice, getInvoiceByUserId, getInvoiceById } = require('../Controllers/invoiceController');
const verifyToken = require('../Middlewares/authMiddleware');

router.post('/add', verifyToken, addToInvoice);
router.get('/get-all', verifyToken, getInvoiceByUserId);
router.get('/:invoiceId', verifyToken, getInvoiceById);

module.exports = router;
