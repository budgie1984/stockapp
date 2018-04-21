// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var StockSchema = new mongoose.Schema({
    description: String,
    exchangeName: String,
    symbol: String,
    dateIn: String,
    dateOut:String,
    quantity: Number,
    costs: Number,
    purchasePrice:Number,
    price: Number,
    value:Number,
    gainLoss: Number,
    cumGainLoss: Number,
    percentageGainLoss: Number,
    sellCosts: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Stock', StockSchema);

