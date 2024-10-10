// Importing required modules
const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config(); // Load environment variables
var cors = require("cors");

// Importing scheduler module
const schedule = require("node-schedule");

// Define port number
const PORT = process.env.PORT || 4000;

// Importing route modules
const cryptocurrencyRoute = require("./routes/cryptocurrency.route");
const priceConversionRoute = require("./routes/priceConversion.route");
const companyData = require("./routes/companyData.router");

// Importing database connection module
const dbConnect = require("./config/databaseConnection");

// Enable CORS
app.use(
  cors({
    origin: "*", // Allow requests from all origins
  })
);

// Middleware for parsing JSON
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send(`<h1>It's Nishant, The KoniX app is running!</h1>`);
});

// Define routes
app.use("/cryptocurrency", cryptocurrencyRoute); // Route for cryptocurrency-related operations
app.use("/priceConversion", priceConversionRoute); // Route for price conversion
app.use("/companyData", companyData); // Route for fetching company data

// Schedule job to update cryptocurrency data every hour
schedule.scheduleJob("0 * * * *", async () => {
  try {
    // Make a GET request to update cryptocurrency data
    await axios.get("http://localhost:" + PORT + "/cryptocurrency/update");
    console.log("Cryptocurrency data updated successfully");
  } catch (error) {
    console.error("Error updating cryptocurrency data:", error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

// Connect to the database
dbConnect();

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({ success: false, error: "Internal server error" });
});


//URL references for testing

//Get request to fetch cryptocurrency
//http://localhost:3005/cryptocurrency/update

//Post request to convert price
//http://localhost:3005/priceConversion/convert

//Post request to fetch company data
//http://localhost:3005/companyData/companies