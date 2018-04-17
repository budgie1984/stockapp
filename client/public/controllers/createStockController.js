var stockApp = angular.module('stockApp');

stockApp.controller('createStockController',
    function ($scope, $rootScope, $location, $routeParams, stockService) {



        $scope.addStock = function(stock) {
            console.log(stock);
              stockService.addStock(stock)
              .success(function(data) {
                  $scope.stock = data;
                  console.log("Tablet added to database", $scope.stock);
              })
              .error(function(err) {
                $location.path("/home");
              });
            };


 });