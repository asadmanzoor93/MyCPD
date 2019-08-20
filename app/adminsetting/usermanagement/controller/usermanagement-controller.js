define(['app/app',
    'app/configenum/config-enum',
    'app/adminsetting/usermanagement/service/user-service'
], function (app, configenum) {
    'use strict';
    app.register.controller('usermanagementCtrl', ['$scope', '$http', '$stateParams', '$window', '$state', 'usersvc', function ($scope, $http, $stateParams, $window, $state, usersvc) {

        var vm = this;

        vm.heading = "User Management";
        vm.userDetails = usersvc;

        function loadData() {
            $http.get(configenum.ADMIN.GETUSERDETAILS).then(successCallback, errorCallback);
        }


        function successCallback(response) {
            return vm.userData = response.data;
        }
        function errorCallback(error) {
            return error;
        }

        vm.addUser = function () {
            vm.userDetails = null;
            $state.go('REGISTER', { mode: "Add" });
        }


        vm.editUser = function (data) {

            vm.userDetails.UserId = data.UserId
            vm.userDetails.UserName = data.UserName
            vm.userDetails.Email = data.Email;
            vm.userDetails.FirstName = data.FirstName
            vm.userDetails.Surname = data.Surname;
            vm.userDetails.LastLoginTime = data.LastLoginTime;
            vm.userDetails.EmployerName = data.EmployerName;
            vm.userDetails.EmployerId = data.EmployerId;

            $state.go('REGISTER', { mode: "edit" });

        }
        vm.clear = function () {
            vm.UserName = '';
            vm.Email = '';

            loadData();
        };


        loadData();
    }]);
});