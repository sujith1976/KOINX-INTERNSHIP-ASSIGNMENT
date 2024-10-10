const axios = require('axios'); // Import axios for making HTTP requests
const Cryptocurrency = require('../model/cryptocurrencyModel'); // Import Cryptocurrency model for MongoDB interaction

// Price converter function
const priceConversion = async (req, res) => {
    try {
        const { fromCurrency, toCurrency, date } = req.body; // Extract relevant data from request body

        // Query MongoDB to fetch the symbol for the 'toCurrency'
        const toCurrencyInfo = await Cryptocurrency.findOne({ id: toCurrency }).lean();

        // Throw error if 'toCurrency' is invalid
        if (!toCurrencyInfo) {
            throw new Error(`Invalid currency: ${toCurrency}`);
        }

        // Extract the symbol for 'toCurrency'
        const toCurrencySymbol = toCurrencyInfo.symbol;

        // Fetch historical price data from Coingecko API
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/history`, {
            params: {
                date,
                localization: false
            }
        });
        const priceData = response.data; // Extract response data

        // Extract the price in terms of 'toCurrency' on the specified date
        const priceInToCurrency = priceData.market_data.current_price[toCurrencySymbol];

        // Throw error if price data is not available for conversion
        if (priceInToCurrency === undefined || priceInToCurrency === null) {
            throw new Error(`Price data not available for converting from ${fromCurrency} to ${toCurrency}`);
        }

        // Return successful response with converted price
        res.status(200).json({ success: true, price: priceInToCurrency });
    } catch (error) {
        // Log error and return internal server error response
        console.error('Error converting price:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

module.exports = { priceConversion }; // Export the priceConversion function
