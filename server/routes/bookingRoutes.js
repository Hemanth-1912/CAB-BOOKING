const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Protected routes
router.post('/request', auth, bookingController.requestRide);
router.post('/accept', auth, bookingController.acceptRide);
router.get('/available', auth, bookingController.getAvailableBookings);
router.get('/user/all', auth, bookingController.getUserBookings);  // ⚠️ must be before /:bookingId
router.get('/driver/all', auth, bookingController.getDriverBookings);
router.get('/:bookingId', auth, bookingController.getBooking);
router.put('/:bookingId/status', auth, bookingController.updateRideStatus);
router.put('/:bookingId/pay', auth, bookingController.payForRide);
router.put('/:bookingId/complete', auth, bookingController.completeRide);

module.exports = router;
