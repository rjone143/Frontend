(function () {
    "use strict";
    
    angular.module('public')
    .controller('InfoController', InfoController);
    

    InfoController.$inject = ['MenuService', 'ApiPath'];
    function InfoController(MenuService, ApiPath) {
        var $ctrl = this;
        console.log('info -- ')
        $ctrl.registered = MenuService.isRegisterd()
        if ($ctrl.registered){
            $ctrl.userInfo = MenuService.getUserInfo()
            console.log($ctrl.userInfo)
            $ctrl.basePath = ApiPath;
        }
        
    }
    })();
    