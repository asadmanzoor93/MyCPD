define(['app/app',
    'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';
    app.register.controller('randomReportCtrl', ['$state', '$window', '$http', 'utilityservice', function ($state, $window, $http, utilityservice) {

        var vm = this;
        vm.totalItems = 0;
        vm.loadingaccreditdata = true;
        vm.entries = [10, 20, 30];
        vm.displayYear = new Date().getFullYear();

        vm.years = [2018, 2019, 2020];

        vm.pagingInfo = {
            page: 1,
            pageSize: 10,
            sortBy: 'MemberNumber',
            reverse: false,
            Year: new Date().getFullYear(),
        };

        vm.search = function () {
            vm.pagingInfo.page = 1;
            vm.displayYear = vm.pagingInfo.Year
            loadData();
        };



        vm.clear = function () {
            vm.Host = '';
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

        vm.showcoursedetail = function (data) {
            var obj = {
                membernumber: data.MemberNumber,
                memberid: data.MemberId,
                userid: data.UserId
            }
            utilityservice.setservice(obj);

            $state.go('CPDRECORD');
        }

        function loadData() {
            vm.approvedCPDData = null;
            $http.get(configenum.ADMIN.CPDRANDCOMPLAIANCEREPORT, { params: clean(vm.pagingInfo) }).then(successCallback, errorCallback);
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
            downloadDocument(configenum.ADMIN.RANDOMCOMPLIANTEXCEL , $http);
        }



        vm.print = function () {
            $window.print();
        }

        vm.refresh = function(){
            loadData();
        }

        loadData();


    }]);
});