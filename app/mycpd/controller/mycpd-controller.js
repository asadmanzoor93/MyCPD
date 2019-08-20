define(['app/app',
    'app/configenum/config-enum',
    'app/mycpd/service/mycpd-service',
    'app/mycpd/service/fileupload-service'
], function (app, configenum, service) {
    'use strict';
    app.register.controller('mycpdCtrl', ['$scope', '$state', '$stateParams', '$window', '$http', 'mycpdsvc', 'toastr', 'fileuploadsvc', 'WizardHandler', 'utilityservice', '$timeout', 'moment', function ($scope, $state, $stateParams, $window, $http, mycpdsvc, toastr, fileuploadsvc, WizardHandler, utilityservice, $timeout, moment) {

        var vm = this;

        vm.cpdDetails = mycpdsvc;
        vm.errorMessage = '';
        vm.addNewCPD = false;
        vm.mouseoverError = false;

        function getUserId() {
            if (utilityservice.getservice().userid == undefined || utilityservice.getservice().userid == null) {
                return '';
            }

            return utilityservice.getservice().userid;
        }

        function loadMemberInfoData() {
            var userid = getUserId();
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


        loadMemberInfoData();
        loadCPDTypeData();
        loadCPDFormat();
        loadHost();
        loadLocation();

        vm.selectedItem = vm.cpdDetails.selectedItem;
        vm.selctedCourse = vm.cpdDetails.selctedCourse;

        function loadCPDTypeData() {
            $http.get(configenum.USER.CPDTYPE).then(cpdSuccessCallback, errorCallback);
        }

        function cpdSuccessCallback(response) {
            return vm.cbdtypes = response.data;
        }

        function loadCPDFormat() {
            return $http({ method: "GET", url: configenum.COMMON.CPDFORMAT }).then(function (response) {
                return vm.cbdFormat = response.data;
            });
        }

        function loadHost() {
            return $http({ method: "GET", url: configenum.COMMON.LOADHOST }).then(function (result) {
                return vm.hosts = result.data;
            });
        }

        function loadLocation() {
            return $http({ method: "GET", url: configenum.COMMON.COURSELOCATION }).then(function (response) {
                return vm.locations = response.data;
            });
        }


        vm.CPDTitle = function loadCourseData() {

            vm.cpdDetails.itemArray = null;
            vm.addNewCPD = false;
            vm.cpdDetails.selectedItem = vm.selectedItem;

            if (vm.selectedItem == 4) {
                vm.addNewCPD = true;
                clearForNewCPDDetail();
            }
            else {
                getCourseData(vm.cpdDetails.selectedItem);
            }

            vm.selctedCourse = null;
        }

        function getCourseData(cpdTypID) {
            if (cpdTypID)
                $http.get(configenum.COMMON.GETCOURSESBYCPDTYPE + '?CPDTypeId=' + cpdTypID).then(successGetCourseCallback, errorCallback);
        }

        function successGetCourseCallback(response) {
            if (vm.cpdDetails.CourseId && (vm.editmode || vm.viewmode)) {
                vm.selctedCourse = getObjects(response.data.Items, "CourseId", vm.cpdDetails.CourseId)[0];
                vm.cpdDetails.selctedCourse = vm.selctedCourse;
            }
            return vm.cpdDetails.itemArray = response.data.Items;
        }

        vm.populateFullCourse = function populateFullCourse() {
            vm.cpdDetails.selctedCourse = vm.selctedCourse;
            if (vm.selctedCourse) {
                $http.get(configenum.COMMON.GETCOURSEBYID + '?CourseId=' + vm.selctedCourse.CourseId).then(courseSuccessCallback, errorCallback);
            }
        }

        function courseSuccessCallback(response) {

            vm.cpdDetails.CPDFormatId = response.data.CPDFormatId;
            vm.cpdDetails.Description = response.data.CourseDescription;
            vm.cpdDetails.Venue = response.data.Venue;
            vm.cpdDetails.Trainer = response.data.Trainer;
            vm.cpdDetails.HostId = response.data.HostId;
            vm.cpdDetails.HostName = response.data.HostName;

            vm.cpdDetails.LocationId = response.data.LocationId;
            vm.cpdDetails.LocationName = response.data.LocationName;

            vm.cpdDetails.DurationHours = response.data.DurationHours;
            vm.cpdDetails.Minutes = response.data.Minutes;
            vm.cpdDetails.completedDate = response.data.StartDate;
            return response.data;
        }



        function getCPDDetails(cpdDetails) {
            var fileName = '';
            var courseTitle = '';
            var completedDate = '';
            var selectedCourseId = null;
            var courseMode = '';
            if (vm.cpdDetails.myFile) {
                fileName = vm.cpdDetails.myFile.name;
            }
            else if (vm.editmode && cpdDetails.FileName) {
                fileName = cpdDetails.FileName;
            }

            if (vm.editmode) {
                courseMode = 1;
            }

            completedDate = cpdDetails.completedDate;


            if (!vm.addNewCPD) {
                selectedCourseId = cpdDetails.selctedCourse.CourseId;
                courseTitle = cpdDetails.selctedCourse.CourseName;
            }

            else {

                courseTitle = cpdDetails.courseTitle;
            }
            var obj = {
                MemberId: cpdDetails.MemberId,
                CPDTypeId: cpdDetails.selectedItem,
                CourseId: selectedCourseId,
                CourseName: courseTitle,
                Description: cpdDetails.Description,
                Venue: cpdDetails.Venue,
                Trainer: cpdDetails.Trainer,
                HostName: cpdDetails.HostName,
                Hours: cpdDetails.DurationHours,
                Minutes: vm.cpdDetails.Minutes,
                Company: vm.cpdDetails.HostName,
                CompletionDate: parseDate(completedDate, moment),
                CPDYear: vm.cpdDetails.CPDYear,
                CPDWorkflowId: vm.cpdDetails.CPDWorkflowId,
                FileName: fileName,
                CPDFormatId: cpdDetails.CPDFormatId,
                HostId: cpdDetails.HostId,
                LocationId: cpdDetails.LocationId,
                CourseMode: courseMode,
                IsDeclared: cpdDetails.IsDeclared

            };
            return obj;
        }

        function clear() {
            vm.cpdDetails.MemberId = ''
            vm.cpdDetails.selectedItem = null;
            clearForNewCPDDetail();
        }


        function clearForNewCPDDetail() {
            vm.cpdDetails.itemArray = null;
            vm.cpdDetails.selctedCourse = null;
            vm.cpdDetails.Description = '';
            vm.cpdDetails.Venue = '';
            vm.cpdDetails.Trainer = '';
            vm.cpdDetails.HostName = '';
            vm.cpdDetails.DurationHours = '';
            vm.cpdDetails.Minutes = '';
            vm.cpdDetails.completedDate = '';
            vm.cpdDetails.CPDWorkflowId = 0;
            vm.cpdDetails.myFile = null;
            vm.cpdDetails.FileName = '';
            vm.cpdDetails.CPDYear = (new Date()).getFullYear();
            vm.cpdDetails.CPDFormatId = '';
            vm.cpdDetails.HostId = '';
            vm.cpdDetails.LocationId = '';
            vm.cpdDetails.IsDeclared = '';
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
            if (vm.editmode)
                $http.post(configenum.USER.WORKFLOWUPDATE, getCPDDetails(vm.cpdDetails)).then(successCallback, errorCallback);
            else
                $http.post(configenum.USER.WORKFLOWADD, getCPDDetails(vm.cpdDetails)).then(successCallback, errorCallback);
        }

        function successCallback(response) {
            var cpdqueueId = '';
            toastr.success('CPD recorded successfully', 'Success');

            if (response.data.CPDQueueId) {
                cpdqueueId = response.data.CPDQueueId;
            }

            if (!vm.editmode && vm.cpdDetails.myFile) {
                uploadfile(response.data.CPDWorkflowId, cpdqueueId);
            }


            $state.go('CPDRECORD');
            return vm.memberInfo = response.data;
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

        function uploadfile(workflowid, CPDQueueId) {
            var url = configenum.USER.FILEUPLOAD;
            if (vm.cpdDetails.myFile) {
                fileuploadsvc.uploadFileToUrl(vm.cpdDetails.myFile, url, workflowid, CPDQueueId);
                if (fileuploadsvc.fileUploaded) {
                    vm.cpdDetails.myFile = null;
                }
            }

        }

        function hideErrorMessage() {
            $timeout(function () {
                vm.errorMessage = '';
            }, 11000);
        };

        function hideMessage() {
            $timeout(function () {
                vm.dateError = '';
            }, 11000);
        };


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



        vm.validate = function validate(editForm) {

            vm.errorMessage = '';

            if (!vm.viewmode) {

                var maxdate = new Date();

                maxdate.addDays(10);
                if (vm.cpdDetails.completedDate > maxdate) {

                    WizardHandler.wizard().goTo(1);
                    vm.dateError = 'Date Completed cannot be in the future.';
                    hideMessage();
                    vm.errorMessage = 'Date Completed cannot be in the future.';
                    hideErrorMessage();

                    return false;
                }

            }

            return true;
        }

        Date.prototype.addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        vm.hoverIn = function hoverIn(editForm) {

            if (editForm.$invalid) {
                vm.mouseoverError = true;
            }


        }

        vm.hoverOut = function hoverOut(editForm) {

            if (editForm.$invalid) {
                vm.mouseoverError = false;
            }
        }




    }]);
});