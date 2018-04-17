// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var StockSchema = new mongoose.Schema({
    exchangeName: String,
    source: String,
    company: String,
    symbol: String,
    price: Number,
    change: Number,
    priceChange: String,

    required: false
});

// Export the Mongoose model
module.exports = mongoose.model('Stock', StockSchema);