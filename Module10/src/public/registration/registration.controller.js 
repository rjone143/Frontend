(function () {
    "use strict";
    
    angular.module('public')
    .controller('RegistrationController', RegistrationController);
    

    RegistrationController.$inject = ['MenuService'];
    function RegistrationController(MenuService) {
        var $ctrl = this;
        console.log('123')
        $ctrl.submit = function (event) {
            console.log('-----')
            $ctrl.completed = true;
            MenuService.saveUserInfo($ctrl.user)
            console.log($ctrl.user)

        };
        
    }


    
    
    })();
    
    