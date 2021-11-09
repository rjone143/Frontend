(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .factory('MenuItemsFactory', MenuItemsFactory)
    .directive('foundItems', foundItemsDirective);

    //directive link to generated item list
    function foundItemsDirective() {
        var ddo = {
          templateUrl: 'mealItems.html',
          scope: {
            itemsRef: '<',
            foundItemsProp: '<',
            onRemove: '&',
          },
          controller: foundItemstDirectiveController,
          controllerAs: 'items',
          bindToController: true
        };
      
        return ddo;
      }

    function foundItemstDirectiveController() {
    var items = this;

    //error handeling 

    items.checkNothingFound = function () {
         if (items.itemsRef.found.length === 0) {
            return true
        }
         return false
        };
    }
      

    //controller

    NarrowItDownController.$inject = ['MenuItemsFactory'];
    function NarrowItDownController(MenuItemsFactory) {
        var items = this;

        var menuItems = MenuItemsFactory();

        items.found = menuItems.getFoundItems()
        items.searchTerm = ''
        
        items.displayItems = function() {
            var promise = menuItems.getMatchedMenuItems(items.searchTerm);
            promise.then(function (response) {
                items.found = menuItems.getFoundItems()
            })
            .catch(function (error) {
            console.log("Something went wrong.");
            });

            }


        items.removeItem = function (itemIndex) {
            menuItems.removeItem(itemIndex);
        };

    };


    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {
        var service = this;
        var foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {

            var response = $http({
                method: "GET",
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
              }).then(function (result){
                foundItems=[]
                if (searchTerm === ''){
                    return foundItems;
                }
                for (var key in result.data.menu_items){
                    var item = result.data.menu_items[key]
                    
                    if (item.description.toLowerCase().includes(searchTerm.toLowerCase())){
                        foundItems.push(item)
                    }
                }

                return foundItems
              })
            return response
        }

        service.getFoundItems = function (){
            return foundItems
        }

        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
          };


    }

    //factory

    MenuItemsFactory.$inject = ['$http']
    function MenuItemsFactory($http) {
        var factory = function () {
          return new MenuSearchService($http);
        };
      
        return factory;
      }

    })();
   