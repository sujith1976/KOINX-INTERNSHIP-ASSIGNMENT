const express = require('express'); // Import express module
const router = express.Router(); // Create a router instance
const { getCompanyData } = require('../controllers/companyData.controller'); // Import getCompanyData function from controller

// Define route to fetch company data
router.post('/companies', getCompanyData);

module.exports = router; // Export the router
