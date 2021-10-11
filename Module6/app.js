(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController)

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.lunch = "";
    $scope.message = ""

    $scope.displayLunchCheckerResult = function () {
    var checkerResult = lunchChecker($scope.lunch);
    $scope.checkerResult = checkerResult;
    };


  function lunchChecker(lunch) {
    var lunchArray = lunch.split(",");

    // remove empty string
    lunchArray = lunchArray.filter(function(x){
        return x !== "";
    });

    var lunchTotal = lunchArray.length;



    if(lunchTotal==0){
        $scope.message = 'Please enter data first!'
        $scope.color = 'red'
    }
    else if (lunchTotal <4){
        $scope.message = 'Enjoy!'
        $scope.color = 'green'
    }
    else{
        $scope.message = 'Too Much!'
        $scope.color = 'green'
    }

  }

};


})();
