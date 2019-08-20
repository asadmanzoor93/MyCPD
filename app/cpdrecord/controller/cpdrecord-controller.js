define(['app/app',
    'app/configenum/config-enum',
    'app/mycpd/service/mycpd-service',
    'app/mycpd/service/fileupload-service'
], function (app, configenum) {
    'use strict';
    app.register.controller('cpdrecordCtrl', ['$window', '$state', '$http', 'toastr', 'mycpdsvc', 'utilityservice', '$modal', '$scope', function ($window, $state, $http, toastr, mycpdsvc, utilityservice, $modal, $scope) {

        var vm = this;
        vm.cpdDetails = mycpdsvc;
        vm.totalItems = 0;
        vm.loadingaccreditdata = true;
        vm.entries = [10, 20, 30];
        vm.displayYear = new Date().getFullYear();
        vm.showDeclare = null;
        vm.years = [2018, 2019, 2020];

        vm.previousYear = (new Date()).getFullYear() - 1;

        vm.printYear = [];
        var yearmin = 2018;

        for (var i = yearmin; i <= vm.displayYear; i++) {
            vm.printYear.push(i);
        }

        vm.pagingInfo = {
            page: 1,
            pageSize: 10,
            sortBy: 'CourseName',
            reverse: false,
            CourseName: '',
            LocationName: '',
            StartDate: '',
            HostId: '',
            Year: new Date().getFullYear(),
            UserName: utilityservice.getservice().memberid
        };

        vm.openDatePicker = function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
        };
        vm.datepicker = {};
        vm.format = "dd/MM/yyyy";

        vm.search = function () {
            vm.pagingInfo.page = 1;
            vm.displayYear = vm.pagingInfo.Year
            loadData();
            loadCPDHours()
        };

        vm.clear = function () {
            vm.pagingInfo.CourseName = '';
            vm.pagingInfo.StartDate = '';
            vm.pagingInfo.LocationName = '';
            vm.HostId = '';
            vm.pagingInfo.Year = new Date().getFullYear();
            vm.pagingInfo.page = 1;
            vm.pagingInfo.LocationName = '';
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

        vm.deleteCPD = function (workflowId) {
            var deleteUser = $window.confirm('Are you sure you want to delete?');

            if (deleteUser) {
                $http.get(configenum.USER.DELETEMEMBERCPD + "?workflowId=" + workflowId).then(successCPDDeleteCallback, errorDeleteCPDCallback);
            }
        }

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
            vm.cpdDetails.IsDeclared = data.IsDeclared;
            vm.cpdDetails.myFile = null;

            if (!data.IsLocked) {
                $state.go('MYCPD', { mode: "edit" });
            }
            else
                $state.go('MYCPD', { mode: "view" });
        }

        function getUsername() {
            if (utilityservice.getservice().memberid == undefined || utilityservice.getservice().memberid == null) {
                return '';
            }

            return utilityservice.getservice().memberid;
        }

        function loadCPDHours() {
            vm.CPDHours = null;
            $http.get(configenum.USER.MEMBERCPDHOURS + "?Year=" + vm.pagingInfo.Year + "&UserName=" + getUsername()).then(successCPDHoursCallback, errorCallback);
        }

        function loadData() {
            vm.approvedCPDData = null;
            vm.pagingInfo.HostId = vm.HostId;
            $http.get(configenum.USER.MEMBERCPD, { params: clean(vm.pagingInfo) }).then(successCallback, errorCallback);
        }


        vm.DownloadPDF = function (year) {

            var downloadPath = configenum.COMMON.CPDMEMBERPDF + "?UserName=" + getUsername() + "&Year=" + year;
            downloadDocument(downloadPath, $http , false , "MyCPDReport.pdf");


        }

        function successCallback(response) {
            vm.loadingaccreditdata = false;
            vm.approvedCPDData = response.data.Items;
            return vm.totalItems = response.data.TotalCount;
        }

        function successCPDHoursCallback(response) {
            vm.loadingaccreditdata = false;
            return vm.CPDHours = response.data[0];
        }

        function successCPDDeleteCallback(response) {
            vm.loadingaccreditdata = false;
            if (response.status === 200) {
                loadCPDHours();
                loadData();
                toastr.success('CPD record deleted', 'Success');
            }
        }

        function queryHost() {
            return $http({ method: "GET", url: configenum.COMMON.LOADHOST }).then(function (result) {
                return vm.hosts = result.data;
            });
        }

        function errorDeleteCPDCallback(error) {
            vm.loadingaccreditdata = false;
            toastr.error('An error occurred while deleting the CPD record', 'Error');
            return "Call Failed " + error.status;
        }

        function errorCallback(error) {
            vm.loadingaccreditdata = false;
            return "Call Failed " + error.status;
        }

        vm.addCPD = function () {
            vm.cpdDetails.Description = ''
            vm.cpdDetails = {};
            $state.go('MYCPD')
        }
        vm.print = function () {
            $window.print();
        }
        // initial table load



        vm.DownloadPDFDoc = function (year) {

            return $http({ method: "GET", url: configenum.COMMON.GETTEMPID }).then(function (result) {
                var downloadPath = configenum.COMMON.DOWNLOADPDF + '?tempId=' + result.data.tempId +  "&Year=" + year;
                $window.open(downloadPath, '_self', '');
            });
        }


        loadCPDHours();
        loadData();
        queryHost();


    }]);
});