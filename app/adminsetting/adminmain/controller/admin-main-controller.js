define(['app/app',
    'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';
    app.register.controller('adminMainCtrl', ['$scope', '$http', '$state', '$window', function ($scope, $http, $state, $window) {

        var vm = this;

        vm.heading = "Admin Settings"

        vm.gotoHost = function () {
            $state.go('HOST');
        }

        vm.gotoLocation = function () {
            $state.go('LOCATION');
        }


        vm.gotoUserManagement = function () {
            //$state.go('REGISTER');
            $state.go('USERMANAGEMENT');
        }
        
    }]);
});