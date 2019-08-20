define(['app/app',
    'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';

    app.register.controller('cpdclsrmCtrl', ['$http', '$window', function ($http, $window) {

        var vm = this;
        vm.totalItems = 0;
        vm.loadingaccreditdata = true;
        vm.entries = [10, 20, 30];
        vm.pagingInfo = {
            page: 1,
            pageSize: 10,
            sortBy: 'StartDate',
            reverse: true,
            CourseName: '',
            LocationName: '',
            StartDate: '',
            HostName: '',
        };

        vm.DownloadExcel = function () {
            var file = configenum.USER.FACETOEXCEL;
            $http.get(file, { responseType: 'arraybuffer' }
            ).then(function (response) {
                var header = response.headers('Content-Disposition')
                var fileName = header.split("=")[1].replace(/\"/gi, '');
                var blob = new Blob([response.data],
                    { type: 'application/octet-stream' });
                var objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                var link = angular.element('<a/>');
                link.attr({
                    href: objectUrl,
                    download: fileName
                })[0].click();
            })
        }


        var queryHost = function () {
            var searchstr = '?host=' ;
            return $http.get(configenum.COMMON.HOST + searchstr)
                .then(function (response) {
                    return vm.Host = response.data;
                });
        };


        vm.search = function () {
            vm.pagingInfo.page = 1;
            loadData();
        };
        vm.clear = function () {
            vm.pagingInfo.CourseName = '';
            vm.pagingInfo.StartDate = '';
            vm.pagingInfo.LocationName = '';
            vm.pagingInfo.HostName = '';
            vm.pagingInfo.page = 1;
            vm.selectedHost = '';
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
            vm.approvedCPDData = null;
            if (vm.selectedHost != undefined) {
                vm.pagingInfo.HostName = vm.selectedHost.Name;
        }

            $http.get(configenum.USER.FACETOFACE, { params: clean(vm.pagingInfo) }).then(successCallback, errorCallback);
        }

        function successCallback(response) {
            vm.loadingaccreditdata = false;
            vm.approvedCPDData = response.data.Items;
            return vm.totalItems = response.data.TotalCount;
        }
        function errorCallback(error) {
            vm.loadingaccreditdata = false;
            return "Call Failed " + error.status;
        }

        vm.print = function () {
            $window.print();
        }

        // initial table load
        loadData();

        vm.editDialog = new EditCustomDialogModel();
        queryHost();
    }]);
});