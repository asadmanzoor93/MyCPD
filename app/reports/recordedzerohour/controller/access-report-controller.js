define(['app/app',
    'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';
    app.register.controller('accessreportCtrl', ['$scope', '$http', '$stateParams', '$window', function ($scope, $http, $stateParams, $window) {

        var vm = this;

        vm.totalItems = 0;
        vm.loadingaccreditdata = true;
        vm.entries = [10, 20, 30];
        vm.displayYear = new Date().getFullYear();
        vm.year = new Date().getFullYear();
        vm.years = [2018, 2019, 2020];


        vm.printYear = ['All'];
        var yearmin = 2018;

        for (var i = yearmin; i <= vm.year + 1; i++) {
            vm.printYear.push(i);
        }

        var reportId = 'CPD0006';
        var reportType = 1;
        if ($stateParams.reportid == "CPD0006") {
            vm.heading = "Not Engaged";
            reportId = "CPD0006";
        }
        else {
            vm.heading = "Not Compliant User 1";
            reportType = 2
            reportId = "CPD0007";
        }


        vm.pagingInfo = {
            page: 1,
            pageSize: 10,
            sortBy: 'MemberNumber',
            reverse: true,
            MemberNumber: '',
            Year: '',
            QueryType: reportType

        };


        vm.search = function () {
            vm.pagingInfo.page = 1;
            vm.displayYear = vm.pagingInfo.Year
            loadData();
        };

        vm.clear = function () {
            vm.pagingInfo.MemberNumber = '';
            vm.pagingInfo.Year = '';
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
            $http.get(configenum.ADMIN.RECORDEDZEROHOUR, { params: clean(vm.pagingInfo) }).then(successCallback, errorCallback);
        }


        function successCallback(response) {
            vm.loadingaccreditdata = false;
            vm.cpdreportrecord = response.data.Items;
            return vm.totalItems = response.data.TotalCount;
        }
        function errorCallback(error) {
            return error;
        }


        vm.downloadExcel = function (year) {
            downloadDocument(configenum.ADMIN.RECORDEDZEROHOUREXCEL + '?reportId=' + reportId + '&year=' + year, $http);
        }

        vm.print = function () {
            $window.print();
        }

        loadData();

        
    }]);
});