define(['app/app',
    'app/configenum/config-enum',
    'app/mycpd/service/mycpd-service',
     'app/mycpd/service/fileupload-service'
], function (app, configenum, service) {
    'use strict';
    app.register.controller('extmycpdCtrl', ['$scope', '$state', '$stateParams', '$window', '$http', 'mycpdsvc', 'toastr', 'fileuploadsvc', 'WizardHandler', '$timeout', 'moment', function ($scope, $state, $stateParams, $window, $http, mycpdsvc, toastr, fileuploadsvc, WizardHandler, $timeout, moment) {

        var vm = this;
        vm.errorMessage = '';

        vm.cpdDetails = mycpdsvc;
        function loadExternalUserInfo() {
            var userid = '';
            $http.get(configenum.USER.GETMEMBERINFO + '?memID=' + userid).then(successMemberInfoCallback, errorCallback);
        }

        function successMemberInfoCallback(response) {
            vm.cpdDetails.MemberId = response.data.MemberId;
            return vm.memberInfo = response.data;
        }

        if ($stateParams.mode) {
            if (vm.cpdDetails.CPDWorkflowId == undefined) {
                $state.go('CPDRECORD');
            }

            if ($stateParams.mode == "view") {
                vm.viewmode = true;
            }
            else {
                vm.editmode = true;
            }
            getCourseData(vm.cpdDetails.selectedItem);
        }
        else {
            vm.editmode = false;
            vm.viewmode = false;
            clear();
        }


        loadExternalUserInfo();
        loadCPDFormat();
        loadLocation();
        queryHost();

        vm.selectedItem = vm.cpdDetails.selectedItem;
        vm.openDatePicker = function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
        };
        vm.datepicker = {};
        vm.format = "dd/MM/yyyy";

        function loadCPDFormat() {
            $http.get(configenum.COMMON.CPDFORMAT).then(cpdSuccessCallback, errorCallback);
        }


        function loadLocation() {
            $http.get(configenum.COMMON.COURSELOCATION).then(locationSuccessCallback, errorCallback);
        }

        function locationSuccessCallback(response) {
            return vm.location = response.data;
        }

        function cpdSuccessCallback(response) {
            return vm.cbdFormat = response.data;
        }

        function queryHost() {
            return $http({ method: "GET", url: configenum.COMMON.LOADHOST }).then(function (result) {
                return vm.hosts = result.data;
            });
        }


        function getCPDDetails(cpdDetails) {

            cpdDetails.CPDTypeId = 2;
            var fileName = '';
            if (vm.cpdDetails.myFile) {
                fileName = vm.cpdDetails.myFile.name;
            }

            var obj = {
                MemberId: cpdDetails.MemberId,
                CPDTypeId: cpdDetails.CPDTypeId,
                CourseName: cpdDetails.CourseName,
                Description: cpdDetails.Description,
                Venue: cpdDetails.Venue,
                Trainer: cpdDetails.Trainer,
                hostid: vm.HostId,
                Hours: cpdDetails.DurationHours,
                Minutes: cpdDetails.Minutes,
                Company: cpdDetails.HostName,
                CourseDate: parseDate(cpdDetails.CourseDate , moment),
                CPDWorkflowId: cpdDetails.CPDWorkflowId,
                HowToBook: vm.cpdDetails.HowToBook,
                CPDFormatId: vm.selectedItem,
                LocationId: vm.locationItem,
                FileName: fileName,
                InHouseOnly: cpdDetails.InHouseOnly,

            };
            return obj;
        }

        function clear() {
            vm.cpdDetails.MemberId = ''
            vm.cpdDetails.selectedItem = null;
            vm.cpdDetails.CourseName = ''
            vm.cpdDetails.Description = '';
            vm.cpdDetails.Venue = '';
            vm.cpdDetails.Trainer = '';
            vm.cpdDetails.HostName = '';
            vm.cpdDetails.DurationHours = '';
            vm.cpdDetails.Minutes = '';
            vm.cpdDetails.HostName = '';
            vm.cpdDetails.CourseDate = '';
            vm.cpdDetails.CPDWorkflowId = 0;
            vm.cpdDetails.myFile = null;
            vm.cpdDetails.FileName = '';
            vm.cpdDetails.HowToBook = '';
            vm.locationItem = null;
            vm.HostId = null;
            vm.cpdDetails.InHouseOnly = '';
        }

        vm.showConfirm = function () {
            var confirm = $window.confirm('Are you sure you want to save?');

            if (confirm) {
                SubmitCPD();

            }
            else
                $scope.status = 'Cancelled';
        };


        function SubmitCPD() {

            vm.errorMessage = '';

            $http.post(configenum.EXTUSER.CPDACCREDITEADD, getCPDDetails(vm.cpdDetails)).then(successCallback, errorCallback);

        }

        function successCallback(response) {
            toastr.success('CPD recorded successfully', 'Success');
            uploadfile(response.data.CPDWorkflowId);
            $state.go('EXTPENDINGCPD');
        }
            
        function errorCallback(error) {
            vm.errorMessage = '';
            if (error.data) {
                vm.errorMessage = error.data;
                hideErrorMessage();
            }
            toastr.error('An error occurred while recording the CPD.', 'Error');
            return "Call Failed " + error.status;
        }

        function hideErrorMessage() {
            $timeout(function () {
                vm.errorMessage = '';
            }, 11000);
        };


        function uploadfile(workflowid) {
            var url = configenum.EXTUSER.FILEUPLOAD;
            if (vm.cpdDetails.myFile) {
                fileuploadsvc.uploadFileToUrl(vm.cpdDetails.myFile, url, workflowid);
                if (fileuploadsvc.fileUploaded) {
                    vm.cpdDetails.myFile = null;
                }
            }

        }

        function getObjects(obj, key, val) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(getObjects(obj[i], key, val));
                } else
                    //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
                    if (i == key && obj[i] == val || i == key && val == '') { //
                        objects.push(obj);
                    } else if (obj[i] == val && key == '') {
                        //only add if the object is not already in the array
                        if (objects.lastIndexOf(obj) == -1) {
                            objects.push(obj);
                        }
                    }
            }
            return objects;
        }

    }]);
});