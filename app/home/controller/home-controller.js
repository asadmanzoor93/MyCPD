define(['app/app',
    'loadash',
    'app/configenum/config-enum',
    'app/home/service/home-service'
], function (app, _, configenum, homesvc) {
    'use strict';
    app.register.controller('homeCtrl', ['$scope', '$state', 'toastr', 'homesvc', 'localStorageService', '$modal', '$http', function ($scope, $state, toastr, homesvc, localStorageService, $modal, $http) {

        var vm = this;
        vm.cpdQueueCount = 0;

        var dashboardmodel = homesvc.getDashboard().then(successCallback, errorCallback);
        vm.model = dashboardmodel;

        vm.action = function (state) {
                $state.go(state);
        }

        function successCallback(response) {
            var authData = localStorageService.get('authorizationData');
            var usermodel = {
                displayName: authData.displayName,
            }
            $scope.usermodel = usermodel;
            if (authData.role == 'Staff')
            {
                
                $scope.conatactus = 'NO';
                $scope.aboutus = 'NO';
                 getCPDQueueCount();
            }
            return vm.model = response.data;
        }
        function errorCallback(error) {
            if (error.status == 401) {
                $state.go('LOGIN');
            }
        }

        function getCPDQueueCount() {
            return $http({ method: "GET", url: configenum.ADMIN.NUMBEROFCPDQUEUE }).then(function (result) {
                return vm.cpdQueueCount = result.data;
            });
        }

    }]);
});