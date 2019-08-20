define(['app/app',
    'app/login/service/login-service'
], function (app, loginsvc) {
    'use strict';
    app.register.controller('loginCtrl', ['$scope', '$state', 'toastr', 'loginsvc' , function ($scope, $state, toastr, loginsvc) {

        var vm = this;
        vm.message = '';

        vm.loginData = {
            userName: "",
            password: ""
        };
         
        vm.login = function () {
            loginsvc.login(vm.loginData).then(successCallback, errorCallback);
        }

        function successCallback(response) {
            loginsvc.setdata(response.data)
            var message = 'Hello ' + response.data.displayName;
            toastr.success(message, 'Success');
            $state.go('Home');
        }
        function errorCallback(error) {
            toastr.error('Login failed. Try again.', 'Error');
        }

    }]);
});