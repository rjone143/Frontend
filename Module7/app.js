(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('dollarSign', dollarSignFilter)
    
    //controller buy to service
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.neededItems = ShoppingListCheckOffService.getNeededItems()

        toBuyList.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex)
        }
    };

    //controller bought to service
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;
        boughtList.purchases = ShoppingListCheckOffService.getBoughtItems()
        boughtList.displayTotalPrice = function (quantity, price) { 
            var msg = 'for a total price of $' + quantity * price
            return msg
        }
        
    };
    // the service 
    function ShoppingListCheckOffService() {
        var service = this;
       //items to buy 
        var neededItems = [
            {
                name: 'soda',
                quantity: 12,
                pricePerItem: 5
            },
            {
                name: 'cookie',
                quantity: 6,
                pricePerItem: 10
            },
            {
                name: 'chips',
                quantity: 8,
                pricePerItem: 12
            },
            {
                name: 'pie',
                quantity: 1,
                pricePerItem: 10
            },
            {
                name: 'gummie bears',
                quantity: 25,
                pricePerItem: 2
            },
            {
                name: 'ice cream',
                quantity: 5,
                pricePerItem: 35
            },
        ];
        //create array of purchases
        var purchases = [];

        service.buyItem = function (itemIndex) {
 
          purchases.push(neededItems[itemIndex])
          neededItems.splice(itemIndex, 1);
        
        };
      
      
        service.getNeededItems = function () {
          return neededItems;
        };

        service.getBoughtItems = function () {
            return purchases;
          };
        
      }

      // filter function
      function dollarSignFilter() {
        return function (input, target, replace) {
            input = input || "";
            input = input.replace(target, replace);
            return input;
        };
      }

    })();
    