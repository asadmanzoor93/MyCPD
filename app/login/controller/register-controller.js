define(['app/app',
    'app/configenum/config-enum',
    'app/login/service/login-service',
    'app/adminsetting/usermanagement/service/user-service'
], function (app, configenum, loginsvc) {
    'use strict';
    app.register.controller('registerCtrl', ['$scope', '$state', 'toastr', 'loginsvc', '$stateParams', 'usersvc', '$http', function ($scope, $state, toastr, loginsvc, $stateParams, usersvc, $http) {

        var vm = this;
        vm.userDetails = usersvc;

        vm.message = '';
        vm.errormsg = ''
        vm.loginData = {
            userName: "",
            password: ""
        };
        vm.roles = [
            'ExternalUser',
        ]
        vm.gotoregister = function () {
            $state.go('REGISTER');
        }
        vm.selectedRole = vm.roles[0];

        vm.register = function () {

            var userinfo = getUserDetails(vm.userDetails);
            if (vm.editmode)
                $http.post(configenum.ADMIN.UPDATEEXTERNALUSER, userinfo).then(successUpdateCallback, errorCallback);
            else
                loginsvc.register(userinfo).then(successCallback, errorCallback);
        }


        function getUserDetails(userDetails) {
            var employerId = '';
            var employerName = '';

            if (userDetails.selctedEmployer)
            {
                employerId = userDetails.selctedEmployer.EmployerId;
                employerName = userDetails.selctedEmployer.EmployerName;

            }


            var obj = {

                UserId: userDetails.UserId,
                UserName: userDetails.UserName,
                Email: userDetails.Email,
                FirstName: userDetails.FirstName,
                Surname: userDetails.Surname,
                Password: vm.password,
                ConfirmPassword: vm.confirmpassword,
                RoleName: vm.selectedRole,
                EmployerId: employerId,
                EmployerName: employerName,

            };
            return obj;
        }


        function successCallback(response) {
            vm.message = 'User Registered Successfully.';
            toastr.success(vm.message, 'Success');
            $state.go('Home');
        }
        function errorCallback(error) {
            //error code
            vm.errormsg = error.data.Message;
            vm.errors = parseErrors(error.data);
            toastr.error('Registration failed.' + vm.errors , 'Error');
        }

        function successUpdateCallback(response) {
            vm.message = 'User Updated Successfully.';
            toastr.success(vm.message, 'Success');
            $state.go('USERMANAGEMENT');
        }


        function parseErrors(response) {
            var errors = [];
            for (var key in response.ModelState) {
                for (var i = 0; i < response.ModelState[key].length; i++) {
                    errors.push(response.ModelState[key][i]);
                }
            }
            return errors;
        }


        if ($stateParams.mode) {

            if ($stateParams.mode == "edit") {
                vm.editmode = true;

                if (vm.userDetails.selctedEmployer) {
                    vm.userDetails.selctedEmployer = null;
                }
            }
            else
            {
                clear();
            }
        }


        function clear() {
            vm.userDetails.UserId = '';
            vm.userDetails.UserName = '';
            vm.userDetails.Email = '';
            vm.userDetails.FirstName = '';
            vm.userDetails.Surname = '';
            vm.userDetails.LastLoginTime = '';
            vm.userDetails.EmployerName = '';
            vm.userDetails.EmployerId = '';
            if (vm.userDetails.selctedEmployer) {
                vm.userDetails.selctedEmployer = null;
            }
        }


        $scope.fetch = function ($select, $event) {
            // no event means first load!
            if (!$event) {
                $scope.page = 1;
                $scope.items = [];
            } else {
                $event.stopPropagation();
                $event.preventDefault();
                $scope.page++;
            }

            if ($select.search) {

                $scope.loading = true;
                $http({
                    method: 'GET',
                    url: configenum.COMMON.GETEMPLOYERLIST + '?name=' + $select.search
                }).then(function (resp) {
                    vm.items = resp.data.Items;
                })['finally'](function () {
                    $scope.loading = false;
                });
            }

            if (vm.userDetails.EmployerId) {

                var employerId = vm.userDetails.EmployerId;

                if (employerId > 0 && $select.selected == undefined && !$select.search) {
                    $http({
                        method: 'GET',
                        url: configenum.COMMON.GETEMPLOYERLIST + '?name=' + $select.search + '&id=' + employerId
                    }).then(function (resp) {
                        vm.items = resp.data.Items;
                        $select.selected = resp.data.Items[0];
                    })['finally'](function () {
                        $scope.loading = false;
                    });
                }
            }

        };

    }]);
});