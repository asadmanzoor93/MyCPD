define(['app/app',
    'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';
    app.register.controller('hostCtrl', ['$scope', '$http', '$stateParams', '$window', '$modal', 'toastr', '$rootScope', function ($scope, $http, $stateParams, $window, $modal, toastr, $rootScope) {

        var vm = this;

        vm.heading = "Host";

        function loadData() {
            $http.get(configenum.ADMIN.GETHOST).then(successCallback, errorCallback);
        }


        function successCallback(response) {
            return vm.hostData = response.data;
        }
        function errorCallback(error) {
            return error;
        }

        vm.clear = function () {
            vm.name = '';
            vm.id = '';
            loadData()
        };

        $rootScope.$on("myEvent", function () {
            loadData();
        });

        vm.hostInfoData = function (row, size) {

            var modalInstance = $modal.open({
                templateUrl: 'app/adminsetting/host/templates/partial-update-host.html',
                controller: modelUpdateHostCtrl,
                size: size,
                resolve: {
                    row: function () {
                        return row;
                    }
                }
            });
        };
        var modelUpdateHostCtrl = function ($scope, $modalInstance, row, toastr, $rootScope) {

           
            $scope.cancel = function () {
                $modalInstance.close();
                $rootScope.$broadcast('myEvent');
            };
            $scope.ok = function (model) {
               
                return $http({
                    method: "POST", url: configenum.ADMIN.UPDATEHOST,
                    data: hostinfo(model),
                }).then(function (result) {
                    vm.showDeclare = null;
                    if (result.status == 200)
                    {
                        toastr.success('Host updatedd successfully', 'Success');
                    }
                    $modalInstance.close();
                    $rootScope.$broadcast('myEvent');
                    return result.data;
                });
              
            };
            getHostInfo($scope, row);
        };

        function hostinfo(model) {
            var obj = {
                ID: model.ID,
                Name: model.Name,
                SortOrder: model.SortOrder,
                Active: model.Active,

            };
            return obj;
        }

        function getHostInfo($scope, row) {
            //var myDataPromise = loadCPDHours();
            //myDataPromise.then(function (result) {
            $scope.model = row;
            //$scope.Name = row.Name;
            //$scope.Active = row.Active;
                //$scope.labels = result.labels;
            //});
        }




        loadData();

        
    }]);
});