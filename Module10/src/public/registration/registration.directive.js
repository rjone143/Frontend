(function () {
    "use strict";
    
angular.module('public')
.directive('myDirective', myDirective);

myDirective.$inject = ['MenuService'];
function myDirective(MenuService) {

    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            console.log('aaaa')
            function myValidation(value) {
                console.log(value)
                console.log(MenuService)
                MenuService.getMenuItem(value).then(
                    function (result){ 
                        console.log(result)
                        if ( result.short_name == value){
                            // console.log('-----')
                            mCtrl.$setValidity('short_name', true);
                        }
                        else {
                            mCtrl.$setValidity('short_name', false);
                        }
                    }
                    ).catch(mCtrl.$setValidity('short_name', false))
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
};

    
    })();
    