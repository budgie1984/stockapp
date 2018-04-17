var stockApp = angular.module('stockApp');

stockApp.controller('stockController',
    function ($scope, $rootScope, $location, $routeParams, stockService) {



        // get all stock in the db
        stockService.getStocks()
            .success(function (data) {
                console.log("called controller");
                console.log(data);
                var stocks = data;
                $scope.stocks = stocks;
                console.log($scope.stocks);

            })
            .error(function (err) {
                $location.path("./home");
            });


        // view a single stock by getting it id
        $scope.viewStock = function(stock) {
            $scope.currentStock = stock;
            $location.path("/viewStock/" + $scope.currentStock._id);
        };
        // get the current stock
        $scope.currentStock = stockService.getStock($routeParams.stockId)
            .success(function (data) {
                $scope.currentStock = data;
            })
            .error(function (err) {
                $location.path("./home");
            });

        // delete a stock by its id
        $scope.deleteStock = function (stock) {
            stockService.deleteStock(stock._id)
                .then(function (res) {
                  alert("Stock deleted");
                    $location.path("/stockdatabase");
                });
        };





        $scope.updateStock = function (stock) {
            stock.id = $routeParams.stockId;
            stockService.updateStock(stock)
                .success(function (res) {
                    console.log('response to front', res);
                    $location.path("/stockdatabase");
                })
                .error(function (err) {
                    $location.path("/home");
                });
        };



 });