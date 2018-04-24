var stockApp = angular.module('stockApp');

stockApp.controller('stockController',
    function ($scope, $rootScope, $location, $routeParams, stockService,$http) {
        var topdog;
        var globMultiplier = 0;

        // $http({
        //     method:'GET',
        //     url:'https://scraper601.herokuapp.com/scrape/test?n=0'})
        //     .then(function(response){
        //         $scope.stock = response.data;
        //         console.log(response.data);
        //     });

     //   $scope.img = $scope.tablet.images[0]

    $scope.mothaHolda = [];

    $scope.getCost = function(qty, purchasePrice){
        return qty * purchasePrice;
    };

    $scope.getLiveData = function(exchange, symb){
        $http({
            method:'GET',
            url:'https://scraper601.herokuapp.com/scrape/test?n=1'})
            .then(function(response){  
                var arrayOfKeyValues = Object.entries(response.data).forEach((qu) =>{
                    // once have the exchange need the company object inside the array
                    console.log(qu[1].data);
                    if(qu[1].exchange === exchange){
                        console.log(qu[1]);
                        
                    }

                      //console.log(qu[1].data);

                    

                    //  if(exchange === qu[1].exchange){
                    //      for(var i = 0; i < qu[1].data.length; i++){
                    //          if(qu[1].data[i] == symb){
                    //             console.log(qu[1].data[i]);
                    //          }
                    //      }
                    //  }


                    // var arrayOfKeyValues = Object.entries(qu[1].data).forEach((eeeeeeep) =>{
                    //     console.log(eeeeeeep);

                    // });
                    



                    if(qu[1].exchange === "ise"){
                        
                    }else if(qu[1].exchange === "ftse350"){

                    }else if(qu[1].exchange === "ftse"){ // DO as above

                    }else if(qu[1].exchange === "coinranking"){

                    }else{
                        // console.log("ERROR INVALID EXCHANGE ENTERED!!!!!    :   " + 
                        //     qu[1].exchange);
                    }



                    //var queries = Object.entries(qu[1].data).forEach(q);

                    // for(var i = 0; i < qu[1].data.length; i++){
                    //     if(qu[i].data.symbol === "BIRG-I"){
                    //         console.log(qui[i].symbol);
                    //     }
                    
                    // }

                    // var myObj = JSON.parse(qu[1].data);
                    // document.getElementById("BIRG_I").innerHTML = myObj.symbol;


                    // var myObj = JSON.parse(this.responseText);
                    // document.getElementById("demo").innerHTML = myObj.name;
                    // var myObj = JSON.parse(qu[1].data);
                    // document.getElementById("BIRG_I").innerHTML = myObj.symbol;


                    // var myObj = JSON.parse(this.responseText);
                    // document.getElementById("demo").innerHTML = myObj.name;
                });
        });
        // var startingPrice = [5.00,4.00,30.00,4.50,2.00];
        // var testLivePrice = [5.50,4.40,33.00,4.95,2.20];
        // // TODO trhgis is stupid fix it
        // return startingPrice[1];
    };

    $scope.loadTestData = function(testCase, multiplier){
        // default test case
     var startingPrice = [5.00,4.00,30.00,4.50,2.00];
        return (startingPrice[testCase] * (multiplier+1)).toFixed(2);
    }

    $scope.reloadPage = function(percent){
        //var res = parseInt(percent)/100;
       globMultiplier = percent;
       location.reload();
       //console.log("Parsed Int is" + percent);
   };

    $scope.getCurrentValue = function( qty , livePrice ){
        return (qty * livePrice).toFixed(2);
    };

    $scope.getCurrentGainLossRatio = function
        ( cost , currentVal , sellCosts ){
            // TODO this WILL need to be rounded to the 2nd decimal
            return ((currentVal - cost) - sellCosts).toFixed(2);
        
    };

    $scope.getTotalGainLossRatio = function(){
        // TODO this is wrong and needs to be calculatred properly
        return (1010).toFixed(2);
    };

    $scope.getPercentageGainLossRatio = function
        (curGainLossRat, costs ){
        return Math.abs(( curGainLossRat / costs) * 100);
    };

    $scope.calculateSellCosts = function(curValue){
        var threshold = 25000;
        var commissionLowerRate = 0.01;
        var commissionHigherRate = 0.005;
        var perSaleFixedCost = 1.25;

        var costsLow;

        if(curValue <= threshold){
            costsLow = (curValue * commissionLowerRate);
            if(costsLow < 25)costsLow = 25;
            return (costsLow + perSaleFixedCost).toFixed(2);
        }else{
            costsLow = (curValue * commissionLowerRate);
            var costsHigh = ((curValue - threshold) * commissionHigherRate);
            totalCosts = costsLow + costsHigh;
            if(totalCosts < 25)totalCosts = 25;
            return (totalCosts + perSaleFixedCost).toFixed(2);
        }
    };

    $scope.getTotalQty = function(records){
        var total = 0;
        for(var i = 0; i < records.length; i++){
            total += parseInt(records[i].qty);
        }
        return total;
    };

    $scope.compareExch = function(exchange){
        

        
        

    };

    $scope.getJSONApi = function(){
        
    };

        $http({
            method:'GET',
            url:'../purchasehistory/static_imports.json'})
            .then(function(response){    
                var arrayOfKeyValues = Object.entries(response.data).forEach((query) =>{
                    //prints the entire holding object
                  //  console.log("Debug0001",query[1]);
                    // iterates throughs sales record within given holding object
                    for(var i = 0; i < query[1].sales_record.length; i++){
                        // print the given sales record as an object
                       // console.log(query[1].sales_record[i]);
                        var motha = [ ];
                        var description = query[1].description;
                        motha.push(description);
                        motha.push(query[1].stock_exchange);
                        motha.push(query[1].symbol);
                        var exchangeID = $scope.compareExch(query[1].stock_exchange.toString());
                        //console.log(exchangeID);
                        motha.push(query[1].sales_record[i].date_in);
                        motha.push(query[1].sales_record[i].date_out);
                        motha.push(query[1].sales_record[i].qty);
                        // total quantity
                        motha.push(" ");
                        var cost = $scope.getCost(query[1].sales_record[i].qty,
                            query[1].sales_record[i].purchase_price);
                        motha.push(cost);
                        motha.push(query[1].sales_record[i].purchase_price);
                        // get variable costs fed in from test data (live price)
                        var holdingTest;
                        if(description === "AIB"){
                            holdingTest = 0;
                        }else if(description === "Bank of Ireland"){
                            holdingTest = 1;
                        }else if(description === "CRH"){
                            holdingTest = 2;
                        }else if(description === "Tesco"){
                            holdingTest = 3;
                        }else if(description === "Ripple"){
                            holdingTest = 4;
                        }else{
                            console.log("Description Read Error");
                        }
                        var liveData = $scope.loadTestData(holdingTest, globMultiplier);
                        motha.push(liveData);
                        // worked out from live price
                        var currentValue = $scope.getCurrentValue(query[1].sales_record[i].qty,
                            liveData);
                        motha.push(currentValue);
                        var currenGainLossRatio = $scope.getCurrentGainLossRatio(cost,currentValue, $scope.calculateSellCosts(query[1].sales_record[i].qty,
                            ($scope.getCurrentValue(query[1].sales_record[i].qty,
                                liveData))));
                        // Current Gain Loss takes currentValue, Purchase Price and Sell costs
                        motha.push(currenGainLossRatio);
                        motha.push(" ");
                        motha.push($scope.getPercentageGainLossRatio(currenGainLossRatio,cost) + "%");
                        motha.push($scope.calculateSellCosts(currentValue));
                        // console.log(query[1].sales_record[i].date_in);
                        //console.log(motha);
                        $scope.mothaHolda.push(motha);
                    }
                    //console.log(query[1].sales_record);
                    var tempArray = [" " , " " , " " , " " , " " , " " , 
                         $scope.getTotalQty(query[1].sales_record), " " , " " , " " ," " , " " ,
                    $scope.getTotalGainLossRatio() , " " , " " ];
                    $scope.mothaHolda.push(tempArray);



                //     Object.keys(query[1].sales_record).forEach(function(array_inner){
                //         //Array.isArray(array_inner) || 
                //         //console.log(array_inner);
                        
                        
                //     //   Array.isArray = function(arg){
                //     //         console.log(array_inner);
                //     //         console.log("DEGUB 101010",arg);
                //     //   };
                //    });


                });

                //console.log($scope.mothaHolda);
            });

            
            
                // for (var holdings in $scope.stock) {
                //     console.log("There are holdings in stock");                   
                //      console.log(holdings);

                //     for (var records in holdings.sales_record) {
                //         //try with $scope if nada happens
                //         console.log("there are records in sales records 7");
                //         $scope.motha.push([
                //             $scope.holding.description,
                //             $scope.holding.stock_exchange,
                //             holdings.symbol,
                //             records.date_in,
                //             records.date_out,
                //             records.qty,
                //             0,
                //             (records.qty*records.purchase_price),
                //             records.purchase_price,
                //             livePrice[holdingsPos],
                //             (livePrice[holdingsPos]*records.qty),
                //             55.55,
                //             77.77,
                //             66.66,
                //             17.17
                //         ]);
                //         console.log("got to after the push");
                //     }
                //     holdingsPos++;
                // }
                // console.log($scope.motha);
        
        
        // test case of first live price
    


        // $scope.dmothaload = Object.keys($scope.motha)
        //     .map(function(value,index){
        //         return { values: $scope.motha[value] 
        //         };
        //     });
        
        
        // get all stock in the db
        // stockService.getStocks(
        //     .success(function (data) {
        //         console.log("called controller");
        //         console.log(data);
        //         var stocks = data;
        //         $scope.stocks = stocks;
        //         console.log($scope.stocks);

        //     })
        //     .error(function (err) {
        //         $location.path("./home");
        //     });


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
        // $scope.deleteStock = function (stock) {
        //     stockService.deleteStock(stock._id)
        //         .then(function (res) {
        //           alert("Stock deleted");
        //             $location.path("/stockdatabase");
        //         });
        // };


       
      

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