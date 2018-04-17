angular.module('stockApp')
    .service('stockService', function($http) {
        var api = {
            addStock: function(stock) {
                return $http.post('api/createStock', stock);
            },

            getStocks: function() {
                console.log("called service");
                return $http.get('api/getStocks');
            },
            getStock: function(id) {
                return $http.get('/api/getStock/' + id);
            },

            deleteStock: function(id) {
              console.log('in service', id);
                return $http.delete('/api/deleteStock/' + id);
            },
            updateStock: function(stock){
                console.log('updated service called - NEEDED TO SEND THE TABLET ID IN THE URL AND THE NEW TABLET BODY TO USE FOR UPDATE')
                return $http.put('/api/updateStock/' + stock.id, stock);
            }
        };
        return api;
    });