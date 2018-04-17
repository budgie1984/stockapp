var  stockApp = angular.module('stockApp', ['ngRoute']);

    stockApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider

         .when('/signup', {
          templateUrl: 'partials/signup.html',
          controller: 'RegisterCtrl'
        })
         .when('/login', {
          templateUrl: 'partials/login.html',
          controller: 'LoginCtrl'
        })
        .when('/signup', {
          templateUrl: 'partials/signup.html',
          controller: 'signupController'
        })
         .when('/home', {
          templateUrl: 'partials/home.html',
          controller: ''
        })
        .when('/addstock', {
          templateUrl: 'partials/addstock.html',
          controller: 'createStockController'
        })
        .when('/stockdatabase', {
          templateUrl: 'partials/stockdatabase.html',
          controller: 'stockController'
        });
      

        //  .otherwise({
        //   redirectTo: '/home'
        // });
 }]);




 stockApp.factory('AllStockService', ['$http' , function($http){
  var api = {
 
      getStocks: function(){
        return $http.get('allstock.json');
      }
  };
  return api;
}]) ;


stockApp.service('UserService',  function($rootScope){
var users = [{ 
firstname :     'brian',
lastname :      'burroughs',
username :      'boggyb',
emailaddress :  'budgie1984@gmail.com',
password :      'admin',
}] || [];

var currentUser = null;

this.getUsers = function () {
return users;
};

this.getCurrentUser = function () {
return currentUser;
};

this.register = function(userInfo) {
var user = new User(userInfo);
users.push(user);
};

  this.logIn = function (username, password) {
    users.forEach(function (user) {
      if (user.username == username && user.password == password) {
        currentUser = user;
      }
    });
  };

});


stockApp.controller('TabletListCtrl', 
['$scope', 'TabletService',
function($scope, TabletService) {
   TabletService.getTablets().success(function(data) {
         $scope.tablets = data;
       });
   $scope.orderProp = 'name';
}]);

stockApp.controller('HomeCtrl', 
['$scope', 'TabletService','UserService',
function($scope, TabletService, UserService) {
  var tablets =[]
   TabletService.getTablets().success(function(data) {
         $scope.tablets = data
         data.forEach(function(data){
            var tablet =  new Tablet(data)
            tablets.push(tablet);
         });
         $scope.currentUser = UserService.getCurrentUser();

   $scope.addToContainer = function($event){
    tablets.forEach(function(tablet){
      var id = $event.target.id
      if (tablet.id == id ){
        $scope.currentUser.addToContainer(tablet);
      }
    });
  };
});
   $scope.orderProp = 'name';

}]);


stockApp.controller('TabletDetailCtrl', 
['$scope', '$location', '$routeParams', 'TabletService', 
function($scope, $location, $routeParams, TabletService) {
   TabletService.getTablet($routeParams.tabletId)
      .success(function(data) {
         $scope.tablet = data;
         $scope.img = $scope.tablet.images[0];
         })
      .error(function(err) {
          $location.path('./tablers');
        })
   $scope.setImage = function(img) {
        $scope.img = img;
     };
}]);


stockApp.controller('RegisterCtrl',
  function ($scope, $location, UserService, $rootScope) {
    $scope.register = function () {
      UserService.register($scope.user);
      $location.path('/login');
    };
  });

  stockApp.controller('LoginCtrl',
  function ($scope, $location, UserService) {
    $scope.logIn = {};
    $scope.logIn = function () {
      UserService.logIn($scope.logIn.username, $scope.logIn.password)
      $location.path('/home');
    };
  });


var User = function(userInfo){
this.firstname = userInfo.firstname;
this.lastname = userInfo.lastname;
this.username = userInfo.username;
this.emailaddress = userInfo.emailaddress;
this.password = userInfo.password;
this.containerTotal = 0;
this.tabletContainer = [];

this.addToContainer = function(tablet){
this.tabletCart.push(tablet);

};

var Tablet = function(tabletData){
this.name = tabletData.name;
this.dose = tabletData.dose;
this.amountToTake = tabletData.amountToTake;
this.totalAmount = tabletData.totalAmount;
};


};