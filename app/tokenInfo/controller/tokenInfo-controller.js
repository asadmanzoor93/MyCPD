define(['app/app',
        'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';
    app.register.controller('tokeninfoCtrl', ['$scope', '$state', '$stateParams', 'authService', 'toastr', '$window', function ($scope, $state, $stateParams, authService, toastr, $window) {

        var vm = this;
        vm.loading = true;
        if ($stateParams.token) {

            GetTokenInfo($stateParams.token);
        }
        else {
        }


         function GetTokenInfo(token) {
             authService.signin(token).then(successCallback, errorCallback);
        }

         function successCallback(response) {
             if (response.status === 200) {
                 var message = 'Hello ' + response.data.displayName;;
                 toastr.success(message, 'Success');
                 $state.go('Home');
                //vm.loading = false;
             }
         }
         function errorCallback(error) {
             toastr.error('Login failed. Try again.', 'Error');
             vm.loading = false;
         }

         vm.doTheBack = function () {
             window.open(configenum.SETTINGS.EXTERNALURL, '_self');
             // $window.history.back();
         };

    }]);
});