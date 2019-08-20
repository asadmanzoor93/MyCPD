define(['app/app',
    'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';
    app.register.controller('libraryCtrl', ['$scope', '$state', '$http', '$window', '$q', function ($scope, $state, $http, $window, $q) {

        var vm = this;
        vm.totalItems = 0;
        vm.cbdtypes = 0;
        vm.loadingLibrarydata = true;
        vm.entries = [10, 20, 30];
        vm.pagingInfo = {
            page: 1,
            pageSize: 10,
            sortBy: 'StartDate',
            reverse: true,
            CourseName: '',
            CPDTypeId: '',
            LocationName:'',
            Venue: '',
            HostId:''
        };

        loadCPDTypeData();
        queryHost();
        vm.selectedcbdtypes = '';

        vm.search = function () {
            vm.pagingInfo.page = 1;
            loadData();
        };

        vm.clear = function () {
            vm.pagingInfo.CourseName = '';
            vm.selectedcbdtypes = '';
            vm.pagingInfo.LocationName = '';
            vm.pagingInfo.Venue = '';
            vm.HostId = '';
            vm.pagingInfo.page = 1;
            loadData()
        };

        vm.sort = function (sortBy) {
            if (sortBy === vm.pagingInfo.sortBy) {
                vm.pagingInfo.reverse = !vm.pagingInfo.reverse;
            } else {
                vm.pagingInfo.sortBy = sortBy;
                vm.pagingInfo.reverse = false;
            }
            vm.pagingInfo.page = 1;
            loadData();
        };

        vm.getIcon = function (sortBy) {

            var sort = vm.pagingInfo;

            if (sort.sortBy == sortBy) {
                return sort.reverse
                  ? 'fa-sort-down'
                  : 'fa-sort-up';
            }

            return 'fa-sort';
        }

        vm.selectPage = function (page) {
            vm.pagingInfo.page = page;
            loadData();
        };

        vm.setItemsPerPage = function (num) {
            vm.pagingInfo.pageSize = num;
            loadData();
        };

        function loadData() {
           vm.libraryinfo = null;
           vm.pagingInfo.CPDTypeId = vm.selectedcbdtypes;
           vm.pagingInfo.HostId = vm.HostId;
           $http.get(configenum.USER.CPDLIBRARY, { params: clean(vm.pagingInfo) }).then(successCallback, errorCallback);
        }

        vm.DownloadExcel = function () {
            downloadDocument(configenum.COMMON.CPDLIBRARYEXCEL, $http, true, 'Library.xls');

        }


        function successCallback(response) {
            vm.loadingLibrarydata = false;
            vm.libraryinfo = response.data.Items;
            return vm.totalItems = response.data.TotalCount;
        }
        function errorCallback(error) {
            vm.loadingLibrarydata = false;
            //error code
            return "Call Failed " + error.status;
        }

        function loadCPDTypeData() {
            $http.get(configenum.COMMON.CPDTYPE).then(cpdSuccessCallback, errorCallback);
        }

        function queryHost() {
            return $http({ method: "GET", url: configenum.COMMON.LOADHOST }).then(function (response) {
                return vm.hosts = response.data;
            });
        }

         function cpdSuccessCallback(response) {
             return vm.cbdtypes = response.data;
         }

         vm.print = function () {
             $window.print();
         }


        // initial table load
        loadData();
        vm.editDialog = new EditCustomDialogModel();

        $scope.oncourseNameKeyPress = function (event) {
            if (event.charCode == 13) //if enter then hit the search button
                vm.pagingInfo.page = 1;
                loadData();
        }


    }]);
});