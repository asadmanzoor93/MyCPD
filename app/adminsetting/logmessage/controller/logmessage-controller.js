define(['app/app',
    'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';
    app.register.controller('logmessageCtrl', ['$scope', '$http', '$stateParams', '$window', function ($scope, $http, $stateParams, $window) {

        var vm = this;



        function loadData() {
            $http.get(configenum.ADMIN.LOG).then(successCallback, errorCallback);
        }


        function successCallback(response) {           
            return vm.logerrorMessagedata = response.data;
        }
        function errorCallback(error) {
            return error;
        }


        loadData();
    }]);
});