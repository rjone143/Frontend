(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;
  var allCategories = [];

  service.getAllCategories = function () {
    var response = $http({
      method: "GET",
      url: 'https://davids-restaurant.herokuapp.com/categories.json'
    });

    return response;
  };

  service.getItemsForCategory = function (categoryShortName) {
    var response = $http({
      method: "GET",
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName
    });

    return response;
  };




}

})();
