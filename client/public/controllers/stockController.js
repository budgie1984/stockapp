var stockApp = angular.module('stockApp');

stockApp.controller('stockController',
    function ($scope, $rootScope, $location, $routeParams, stockService,$http) {

        // $http({
        //     method:'GET',
        //     url:'https://scraper601.herokuapp.com/scrape/test?n=0'})
        //     .then(function(response){
        //         $scope.stock = response.data;
        //         console.log(response.data);
        //     });

     //   $scope.img = $scope.tablet.images[0]

        $http({
            method:'GET',
            url:'../purchasehistory/static_imports.json'})
            .then(function(response){
                $scope.stock = response.data;
                $scope.holding = $scope.stock.holding2;
                $scope.historyArray = $scope.holding.sales_record;

                console.log(response.data);
                console.log($scope.holding);
                console.log($scope.historyArray);
                console.log($scope.historyArray[3]);
                console.log($scope.historyArray[3].date_in);
                console.log($scope.stock.holding);
            });
        
        // test case of first live price
        var livePrice = [5.00,4.00,30.00,4.50,2.00];

        var gainLossCalulator = function(){


            return 55.55;
        };
        var cumulGainLoss = function(){


            return 77.77;
        };
        var percentageGainLoss = function(){


            return 66.66;
        };
        var calculateSellCosts = function(){


            return 17.17;
        };    
            
        console.log("got to the thing");

        // TODO here is were we create the variable to toggle the share price
      
      var sortinDaMotha = function(){

        $scope.motha = [ ];
        var mothaCounter = 0;
        var holdingsPos = 0;
        for (var holdings in $scope.stock) {
            for (var records in holdings.sales_record) {
                //try with $scope if nada happens
                motha.push([
                    holding.description,
                    holding.stock_exchange,
                    holding.symbol,
                    records.date_in,
                    records.date_out,
                    records.qty,
                    0,
                    (records.qty*records.purchase_price),
                    records.purchase_price,
                    livePrice[holdingsPos],
                    (livePrice[holdingsPos]*records.qty),
                    gainLossCalulator(),
                    cumulGainLoss(),
                    percentageGainLoss(),
                    calculateSellCosts()
                ]);
                console.log($scope.motha[mothaCounter]);
                mothaCounter++;
            }
            holdingsPos++;
        }

    }; 

    sortinDaMotha();



        $scope.dmothaload = Object.keys($scope.motha)
            .map(function(value,index){
                return { values: $scope.motha[value]
                };
            });


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


        // // view a single stock by getting it id
        // $scope.viewStock = function(stock) {
        //     $scope.currentStock = stock;
        //     $location.path("/viewStock/" + $scope.currentStock._id);
        // };
        // // get the current stock
        // $scope.currentStock = stockService.getStock($routeParams.stockId)
        //     .success(function (data) {
        //         $scope.currentStock = data;
        //     })
        //     .error(function (err) {
        //         $location.path("./home");
        //     });

        // delete a stock by its id
        $scope.deleteStock = function (stock) {
            stockService.deleteStock(stock._id)
                .then(function (res) {
                  alert("Stock deleted");
                    $location.path("/stockdatabase");
                });
        };


       
      

    //  (function getStockPrice($scope,$http){
   
    //     $http.get("https://scraper601.herokuapp.com/scrape/test?n=0")
    //     .success(function(response){
    //         $scope.stocky = response.data;
    //         console.log(response.data);
    //     })  .error(function (err) {
    //         console.log(err);
    //     });
    // })();
    

        // $scope.updateStock = function (stock) {
        //     stock.id = $routeParams.stockId;
        //     stockService.updateStock(stock)
        //         .success(function (res) {
        //             console.log('response to front', res);
        //             $location.path("/stockdatabase");
        //         })
        //         .error(function (err) {
        //             $location.path("/home");
        //         });
        // };



        // stockApp.factory('companiesService', ['$http' , function($http){
        //     var api = {
        //         getCompanies : function() {
        //             return $http.get('purchasehistory/companies.json').success(function(data){
        //                 angular.extend(_this, data);
        //             }).error(function(){
        //                 defer.reject('could not find your file ya Nancy!!!!! ')
        //             })
        //         }, 
        //         getCompany : function(id) {  // NEW
        //              return $http.get('purchasehistory/' + id + '.json');
        //         }
        //     };
        //     return api;
        // }]);    


        // stockApp.controller('companyListCtrl', 
        // ['$scope', 'companiesService',
        //   function($scope, companiesService) {

        //       $scope.mycompanylist = [
        //                   {
        //                       "id": "aib",
        //                       "description": "AIB",
        //                       "stock_exchange": "ise",
        //                       "symbol": "AIBG.I"
        //                   },
        //                   {
        //                       "id": "boi",
        //                       "description": "Bank of Ireland",
        //                       "stock_exchange": "ise",
        //                       "symbol": "BIRG.I"
        //                   },
        //                   {
        //                       "id": "crh",
        //                       "description": "CRH",
        //                       "stock_exchange": "ise",
        //                       "symbol": "CRH.I"
        //                   },
        //                   {
        //                       "id": "tesco",
        //                       "description": "Tesco",
        //                       "stock_exchange": "ftse",
        //                       "symbol": "TSCO"
        //                   },
        //                   {
        //                       "id": "ripple",
        //                       "description": "Ripple",
        //                       "stock_exchange": "coinranking",
        //                       "symbol": "ripple-xrp"
        //                   }
        //         ];

        //     $scope.companylistArray = Object.keys($scope.mycompanylist)
        //     .map(function(value,index){
        //         return { values: $scope.mycompanylist[value]
        //         };
        //     });

        //      companiesService.getCompanies().success(function(data) {
        //            $scope.companies = data;
        //          });


                
        //   }]);


////////////////////////////////////////////////////////////////////////////////////

//   tabletApp.controller('TabletListCtrl', 
//   ['$scope', 'TabletService',
//     function($scope, TabletService) {
//        TabletService.getTablets().success(function(data) {
//              $scope.tablets = data
//            })
//        $scope.orderProp = 'name';
//     }])

// tabletApp.controller('HomeCtrl', 
//   ['$scope', 'TabletService','UserService',
//     function($scope, TabletService, UserService) {
//       var tablets =[]
//        TabletService.getTablets().success(function(data) {
//              $scope.tablets = data
//              data.forEach(function(data){
//                 var tablet =  new Tablet(data)
//                 tablets.push(tablet);
//              })
//              $scope.currentUser = UserService.getCurrentUser()

//        $scope.addToContainer = function($event){
//         tablets.forEach(function(tablet){
//           var id = $event.target.id
//           if (tablet.id == id ){
//             $scope.currentUser.addToContainer(tablet)
//           }
//         })
//       }
//     })
//        $scope.orderProp = 'name';

//     }])


// tabletApp.controller('TabletDetailCtrl', 
//    ['$scope', '$location', '$routeParams', 'TabletService', 
//    function($scope, $location, $routeParams, TabletService) {
//        TabletService.getTablet($routeParams.tabletId)
//           .success(function(data) {
//              $scope.tablet = data
//              $scope.img = $scope.tablet.images[0]
//              })
//           .error(function(err) {
//               $location.path('./tablers') 
//             })
//        $scope.setImage = function(img) {
//             $scope.img = img
//          }
// }]);





 });