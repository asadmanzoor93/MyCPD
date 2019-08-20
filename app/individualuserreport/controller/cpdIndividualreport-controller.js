define(['app/app',
    'app/configenum/config-enum',
    'app/mycpd/service/mycpd-service'
], function (app, configenum) {
    'use strict';
    app.register.controller('cpdIndividualCtrl', ['$scope', '$window', 'mycpdsvc', '$http', '$state', 'utilityservice', function ($scope, $window, mycpdsvc, $http, $state, utilityservice) {

        var vm = this;
        vm.cpdDetails = mycpdsvc;
        vm.totalItems = 0;
        vm.loadingaccreditdata = true;
        vm.entries = [10, 20, 30];
        vm.year = new Date().getFullYear();



        vm.printYear = ['All'];
        var yearmin = 2018;

        for (var i = yearmin; i <= vm.year + 1; i++) {
            vm.printYear.push(i);
        }

        vm.years = vm.printYear;
        
        vm.pagingInfo = {
            page: 1,
            pageSize: 10,
            sortBy: 'WorkflowStamp',
            reverse: true,
            CourseName: '',
            MemberNumber: '',
            UserName: '',
            Year: new Date().getFullYear().toString(),
            HostId: '',
        };

        vm.search = function () {
            vm.pagingInfo.page = 1;
            vm.displayYear = vm.pagingInfo.Year
            loadData();
        };

        vm.clear = function () {
            vm.pagingInfo.CourseName = '';
            vm.pagingInfo.UserName = '';
            vm.pagingInfo.MemberNumber = '';
            vm.pagingInfo.Year = '';
            vm.pagingInfo.page = 1;
            vm.HostId = '';
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


        vm.editCPD = function (data) {
            var pagemode = "view";
            vm.cpdDetails.CPDWorkflowId = data.CPDWorkflowId
            vm.cpdDetails.selectedItem = data.CPDTypeId;
            vm.cpdDetails.CourseId = data.CourseId
            vm.cpdDetails.Description = data.CourseDescription;
            vm.cpdDetails.Venue = data.Venue;
            vm.cpdDetails.Trainer = data.Trainer;
            vm.cpdDetails.HostName = data.Company;
            vm.cpdDetails.FileName = data.FileName;
            vm.cpdDetails.DurationHours = data.Hours;
            vm.cpdDetails.Minutes = data.Minutes;
            vm.cpdDetails.completedDate = data.CompletionDate;
            vm.cpdDetails.CPDYear = data.CPDYear;
            vm.cpdDetails.CPDFormatId = data.CPDFormatId;
            vm.cpdDetails.HostId = data.HostId;
            vm.cpdDetails.LocationId = data.LocationId;

            var obj = {
                membernumber: data.MemberNumber,
                memberid: data.MemberId,
                userid: data.UserId
            }
            utilityservice.setservice(obj);


            if (!data.IsLocked) {
                $state.go('MYCPD', { mode: "edit" });
            }
            else
                $state.go('MYCPD', { mode: "view" });
        }


        function queryHost() {
            return $http({ method: "GET", url: configenum.COMMON.LOADHOST }).then(function (result) {
                return vm.hosts = result.data;
            });
        }


        function loadData() {
            vm.approvedCPDData = null;
            vm.pagingInfo.HostId = vm.HostId;
            $http.get(configenum.ADMIN.CPDINDIVIDUALREPORT, { params: clean(vm.pagingInfo) }).then(successCallback, errorCallback);
        }


        function successCallback(response) {
            vm.loadingaccreditdata = false;
            vm.cpdreportrecord = response.data.Items;
            return vm.totalItems = response.data.TotalCount;
        }
        function errorCallback(error) {
            return error;
        }

        vm.downloadFile = function (name) {
            downloadDocument(configenum.ADMIN.REPORTDOWNLOAD + '?name=' + name, $http);
        }


        vm.downloadExcel = function (year) {
            downloadDocument(configenum.ADMIN.INDIVIDUALUSEREXCEL + '?year=' + year , $http);
        }

        vm.lockUserCPD = function (workflowId, lock) {

            return $http({ method: "GET", url: configenum.ADMIN.UPDATELOCKEDSTATUS + '?workflowId=' + workflowId + "&isLocked=" + lock}).then(function (result) {
                if (result.data) {
                    loadData();
                }
                return result.data;
            });
        }


        vm.lockedClass = function (locked)
        {
            var icon = 'fa fa fa-unlock';
            if (locked) {
                icon = 'fa fa fa-lock';
            }

            return icon;
        }
        vm.print = function () {
            $window.print();
        }

        loadData();
        queryHost();

    }]);
});