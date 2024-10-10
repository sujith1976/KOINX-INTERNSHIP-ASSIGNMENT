const Cryptocurrency = require("../model/cryptocurrencyModel"); // Import Cryptocurrency model for MongoDB interaction
const axios = require('axios'); // Import axios for making HTTP requests

// Get all Cryptocurrencies function
const getCryptoList = async (req, res) => {
    try {
        // Fetch cryptocurrency data from Coingecko API
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const cryptocurrencies = response.data; // Extract response data

        // Clear existing data in the database
        await Cryptocurrency.deleteMany();

        // Prepare new cryptocurrency data with required fields
        const cryptocurrenciesWithSymbol = cryptocurrencies.map(crypto => ({
            name: crypto.name,
            id: crypto.id,
            symbol: crypto.symbol // Include the symbol field
        }));

        // Insert new cryptocurrency data into the database
        await Cryptocurrency.insertMany(cryptocurrenciesWithSymbol);

        // Return success response
        res.status(200).json({ success: true, message: 'Cryptocurrency data updated successfully' });
    } catch (error) {
        // Log error and return internal server error response
        console.error('Error updating cryptocurrency data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

module.exports = {
    getCryptoList // Export the getCryptoList function
}
