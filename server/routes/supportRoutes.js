const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');
const auth = require('../middleware/auth');

// Protected routes for support
router.post('/create', auth, supportController.createTicket);
router.get('/user/all', auth, supportController.getUserTickets);

module.exports = router;
