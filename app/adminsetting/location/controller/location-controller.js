define(['app/app',
    'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';
    app.register.controller('locationCtrl', ['$scope', '$http', '$stateParams', '$window', function ($scope, $http, $stateParams, $window) {

        var vm = this;

        vm.heading = "Admin Settings"

        
    }]);
});