define(['app/app',
    'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';
    app.register.controller('systemUsageCtrl', ['$scope', '$http', '$stateParams', '$window', function ($scope, $http, $stateParams, $window) {

        var vm = this;

        vm.totalItems = 0;
        vm.loadingaccreditdata = true;
        vm.entries = [10, 20, 30];
        vm.displayYear = new Date().getFullYear();
        vm.year = new Date().getFullYear();
        vm.years = [2018, 2019];

        vm.printYear = ['All'];
        var yearmin = 2018;

        for (var i = yearmin; i <= vm.year; i++) {
            vm.printYear.push(i);
        }


        vm.pagingInfo = {
            page: 1,
            pageSize: 10,
            sortBy: 'MemberNumber',
            reverse: false,
            Email: '',
            MemberNumber: '',
            UserName: '',
            Year: new Date().getFullYear(),

        };


        vm.search = function () {
            vm.pagingInfo.page = 1;
            vm.displayYear = vm.pagingInfo.Year
            loadData();
        };

        vm.clear = function () {
            vm.pagingInfo.Email = '';
            vm.pagingInfo.UserName = '';
            vm.pagingInfo.MemberNumber = '';
            vm.pagingInfo.Year = new Date().getFullYear();
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
            $http.get(configenum.ADMIN.REPORTUSERLOGININFO, { params: clean(vm.pagingInfo) }).then(successCallback, errorCallback);
        }


        function successCallback(response) {
            vm.loadingaccreditdata = false;
            vm.cpdreportrecord = response.data.Items;
            return vm.totalItems = response.data.TotalCount;
        }
        function errorCallback(error) {
            return error;
        }


        vm.print = function () {
            $window.print();
        }

        loadData();


        vm.downloadExcel = function (year) {
            downloadDocument(configenum.ADMIN.USERLOGININFOEXCEL + '?year=' + year, $http , true);

        }
        
    }]);
});