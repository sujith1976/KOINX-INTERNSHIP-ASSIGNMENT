const express = require('express'); // Import express module
const router = express.Router(); // Create a router instance
const { priceConversion } = require('../controllers/priceConversion.controller'); // Import priceConversion function from controller

// Define route to convert price
router.post('/convert', priceConversion);

module.exports = router; // Export the router
