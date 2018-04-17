var express = require('express');
var StockApi = require('./api/stock/controller/stock');



module.exports = (function() {
    var api = express.Router();

    api.post('/createStock', StockApi.createStock);
    api.get('/getStocks', StockApi.getStocks);
    api.get('/getStock/:id', StockApi.getStock);
    api.delete('/deleteStock/:id', StockApi.deleteStock);
    api.put('/updateStock/:id', StockApi.updateStock);


    return api;
})();