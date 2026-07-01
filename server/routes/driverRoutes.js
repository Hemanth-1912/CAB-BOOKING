const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const auth = require('../middleware/auth');

// Protected routes
router.post('/register', auth, driverController.registerDriver);
router.get('/profile', auth, driverController.getDriverProfile);
router.put('/location', auth, driverController.updateLocation);
router.put('/toggle-online', auth, driverController.toggleOnlineStatus);
router.post('/nearby', auth, driverController.getNearbyDrivers);
router.get('/earnings', auth, driverController.getEarnings);

module.exports = router;
