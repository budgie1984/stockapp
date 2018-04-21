
var Stock = require('../model/Stock');

// Create endpoint /api/containers for POSTS
exports.createStock = function (req, res) {
    // Create a new instance of the container model
    var stock = new Stock();
    // Set the container properties that came from the POST data
    stock.description = req.body.description;
    stock.exchangeName = req.body.exchangeName;
    stock.symbol = req.body.symbol;
    stock.dateIn = req.body.dateIn;
    stock.dateOut = req.body.dateOut;
    stock.quantity = req.body.quantity;
    stock.costs = req.body.cost;    
    stock.purchasePrice = req.body.purchasePrice;
    stock.price = req.body.price;
    stock.value = req.body.value;
    stock.gainLoss = req.body.gainLoss;
    stock.cumGainLoss = req.body.cumGainLoss;
    stock.percentageGainLoss = req.body.percentageGainLoss;
    stock.sellCosts = req.body.sellCosts;

    console.log("**** Stock to save: ", stock);
    // Save the container and check for errors
    stock.save(function (err) {
        if (err)
            res.send(err);
        res.json({ "data": stock });
    });
};


exports.getStocks = function (req, res) {
    Stock.find({}).exec()
        .then(function (stocks) {
            console.log(stocks);
            return res.json(stocks);
        });
};

exports.getStock = function (req, res) {
    Stock.findOne({ _id: req.params.id })
        .then(function (stock) {
            if (stock != null) {
                return res.json(stock);
            }
        })
        .catch(function (err) {
            return res.json(err);
        });
};


exports.deleteStock = function (req, res) {
    console.log(req);
    Stock.remove({ _id: req.params.id })
        .then(function (stock) {
            return res.json(stock);
        })
        .catch(function (err) {
            return res.json(err);
        });
};

exports.updateStock = function(req, res) {
    console.log("ID FROM THE URL IS IN THE PARAMS OBJECT & THE BODY HAS THE NEW STOCK INFO -  params **** : ", req.params);
      Stock.findById(req.params.id, function (err, stock) {
        stock.description = req.body.description;
        stock.exchangeName = req.body.exchangeName;
        stock.symbol = req.body.symbol;
        stock.dateIn = req.body.dateIn;
        stock.dateOut = req.body.dateOut;
        stock.quantity = req.body.quantity;
        stock.costs = req.body.cost;    
        stock.purchasePrice = req.body.purchasePrice;
        stock.price = req.body.price;
        stock.value = req.body.value;
        stock.gainLoss = req.body.gainLoss;
        stock.cumGainLoss = req.body.cumGainLoss;
        stock.percentageGainLoss = req.body.percentageGainLoss;
        stock.sellCosts = req.body.sellCosts;
    
           stock.save(function (err) {
               if(err) { 
                  return res.json(err);
                 }
               
                 return res.send(200, 'stock update successful');
  
           });
       });
    };
