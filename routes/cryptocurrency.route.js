const express = require('express'); // Import express module
const router = express.Router(); // Create a router instance
const { getCryptoList } = require('../controllers/cryptocurrency.controller'); // Import getCryptoList function from controller

// Define route to update cryptocurrency data
router.get('/update', getCryptoList);

module.exports = router; // Export the router
