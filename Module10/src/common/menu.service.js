(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.userInfo = {}
  service.registerd = false

  service.saveUserInfo = function (userInfo){
    service.userInfo = userInfo
    service.registerd = true
  }

  service.getUserInfo = function (){
    if (service.registerd) {
      var info = service.userInfo
      var item = service.getMenuItem(info.dish)
      console.log(item.data)
    }

    return service.userInfo
  }

  service.isRegisterd = function (){
    return service.registerd
  }

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (shortName) {
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function (response) {
      return response.data;
    }).catch( console.log('invalid api'));
  }

}

})();