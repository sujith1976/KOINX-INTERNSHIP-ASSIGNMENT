const mongoose = require("mongoose");

const CryptoSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        trim: true

    },

    id:
    {
        type: String,
        required: true,
        unique: true
    },
    symbol:
    {
        type: String,
        // required: true // some symbols are missing in API response 
    },
  }, { timestamps: true });
  const Crypto = mongoose.model('Crypto', CryptoSchema);

    module.exports = Crypto;