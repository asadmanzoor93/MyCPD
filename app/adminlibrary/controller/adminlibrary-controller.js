define(['app/app',
    'app/configenum/config-enum',
    'app/configenum/cpd-record',
    'app/adminlibrary/service/cpdrecordadmin-service'
], function (app, configenum, cpdrecord, cpdrecordadminsvc) {
    'use strict';
    app.register.controller('adminlibrayCtrl', ['$scope', '$state', 'cpdrecordadminsvc', 'toastr', '$http', '$window', '$filter', 'moment', '$modal', function ($scope, $state, cpdrecordadminsvc, toastr, $http, $window, $filter, moment, $modal) {

        var vm = this;

        vm.print = function () {
            $window.print();
        }

        vm.totalItems = 0;
        vm.cbdtypes = 0;
        vm.loadingLibrarydata = true;
        vm.entries = [10, 20, 30, 40];
        vm.pagingInfo = {
            page: 1,
            pageSize: 10,
            sortBy: 'StartDate',
            reverse: true,
            CourseName: '',
            CPDTypeId: '',
            LocationName: '',
            Venue: '',
            HostId: '',
            StartDate:''
        };

        loadCPDTypes();
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
            vm.pagingInfo.StartDate = '';
            vm.pagingInfo.page = 1;
            vm.pagingInfo.StartDate = '';
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
            vm.libraryinfo = null;
            vm.pagingInfo.CPDTypeId = vm.selectedcbdtypes;
            vm.pagingInfo.HostId = vm.HostId;
            $http.get(configenum.USER.CPDLIBRARY, { params: clean(vm.pagingInfo) }).then(successCallback, errorCallback);
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



        //vm.openDatePicker = function ($event) {
        //    $event.preventDefault();
        //    $event.stopPropagation();

        //    vm.opened = true;
        //};
        //vm.datepicker = {};
        //vm.format = "dd/MM/yyyy";


        vm.configuration = {
            registerbutton: false
        }

        vm.updateCourse = function (row, active) {

            var status = '';

            var records = {
                Active: active,
                CourseId: row.CourseId
            }

            status = active == true ? ' has been lived successfully' : ' has been archived successfully';

            cpdrecordadminsvc.getPutDataaservice(records).then(function (response) {
                if (response.status == 200) {
                    toastr.success(response.data.CourseName + status, 'Success');
                   // $mdDialog.hide();
                    loadData();
                }
            });
        }


        vm.showAdvanced = function (ev, row, op) {

            var host = queryHost();
            var format = loadCPDFormat();
            var location = loadLocation();
            var cpdTypes = loadCPDTypes();

            var modalInstance = $modal.open({
                templateUrl: 'app/adminlibrary/templates/cpdrecord_add_dialog.html',
                controller: modelUpdateLibraryCtrl,
                windowClass: 'app-modal-window',
                resolve: {
                    row: function () {
                        return row;
                    },
                    host: function () {
                        return host;
                    },
                    format: function () {
                        return format;
                    },
                    location: function () {
                        return location;
                    },
                    cpdTypes: function () {
                        return cpdTypes;
                    },
                    operation: function () {
                        return op;
                    }
                }
            });


        };


        function queryHost() {
            return $http({ method: "GET", url: configenum.COMMON.LOADHOST }).then(function (result) {
                return vm.hosts = result.data;
            });
        }

        function loadCPDFormat() {
            return $http({ method: "GET", url: configenum.COMMON.CPDFORMAT }).then(function (response) {
                return response.data;
            });
        }


        function loadLocation() {
            return $http({ method: "GET", url: configenum.COMMON.COURSELOCATION }).then(function (response) {
                return response.data;
            });
        }


        function loadCPDTypes() {
            return $http({ method: "GET", url: configenum.COMMON.CPDTYPE }).then(function (response) {
                return vm.cbdtypes = response.data;
            });
        }


        var modelUpdateLibraryCtrl = function ($scope, $modalInstance, row, toastr, $http, host, format, location, cpdTypes, operation) {
            $scope.cancel = function () {
                $modalInstance.close();
                loadData();
            };

            getLibraryInfo($scope, row, host, format, location, cpdTypes, operation);



            $scope.fetch = function ($select, $event) {
                // no event means first load!
                if (!$event) {
                    $scope.page = 1;
                    $scope.items = [];
                } else {
                    $event.stopPropagation();
                    $event.preventDefault();
                    $scope.page++;
                }

                if ($select.search) {
                    $scope.loading = true;
                    $http({
                        method: 'GET',
                        url: configenum.COMMON.GETEMPLOYERLIST + '?name=' + $select.search
                    }).then(function (resp) {
                        $scope.items = resp.data.Items;
                    })['finally'](function () {
                        $scope.loading = false;
                    });
                }
                if ($scope.model && $scope.model.InHouseOnly && $scope.model.EmployerId){

                    var employerId = $scope.model.EmployerId;

                    if (employerId > 0 && $select.selected == undefined && !$select.search)
                    {
                        $http({
                            method: 'GET',
                            url: configenum.COMMON.GETEMPLOYERLIST + '?name=' + $select.search + '&id=' + employerId
                        }).then(function (resp) {
                            $scope.items = resp.data.Items;
                            $select.selected = resp.data.Items[0];
                        })['finally'](function () {
                            $scope.loading = false;
                        });
                    }
                }



            };


            $scope.submitForm = function (formValid, operation, model) {

                if (operation == 'UPDATE') {
                    updateCPD(model);
                }

                if (formValid) {
                    if (operation == 'ADD') {
                        AddCPD(model);
                    }
                }

            };

            var parsedate = function (date) {
                return date ? moment(date).format('YYYY-MM-DD') : '';
            }

            var AddCPD = function (model) {

                if (model == undefined) {
                    toastr.error('Please use valid information!', 'Error');
                    return false;
                }

                var errorItems = validateCourseData(model);

                if (errorItems.length > 0 )
                {
                    toastr.error(errorItems.join(", "))
                    return;
                }

                var records = getCourseDetails(model);
                cpdrecordadminsvc.getPostDataaservice(records).then(function (response) {
                    if (response.status == 201) {
                        toastr.success(response.data.CourseName + ' added successfully', 'Success');
                        $modalInstance.close();
                        loadData();
                    }
                    else {
                        toastr.error('An error occurred while adding the new record', 'Error');
                    }
                });

            }


            function validateCourseData(model) {

                var errors = [];

                if (!model.CourseName || model.CourseName.length === 0) {
                    errors.push("Course Name cann't be empty");
                }

                if (!model.CourseDescription || model.CourseDescription.length === 0) {
                    errors.push("Course CourseDescription cann't be empty");
                }

                if (!model.Venue || model.Venue.length === 0) {
                    errors.push("Course Venue cann't be empty");
                }

                if (!model.LocationID || model.LocationID <= 0 ) {
                    errors.push("Please select Location");
                }

                if (!model.CPDTypeId || model.CPDTypeId <= 0) {
                    errors.push("Please select CPD Type");
                }

                if (!model.CPDFormatId || model.CPDFormatId <= 0) {
                    errors.push("Please select CPD Format");
                }


                if (!model.DurationHours || model.DurationHours.length === 0) {
                    errors.push("Course Hours cann't be empty");
                }

                return errors; 
            }



            var updateCPD = function (model) {

                var records = getCourseDetails(model);

                cpdrecordadminsvc.getPutDataaservice(records).then(function (response) {
                    if (response.status == 200) {
                        toastr.success(response.data.CourseId + ' updated successfully', 'Success');
                        $modalInstance.close();
                        loadData();
                    }
                });

            };


            function getCourseDetails(model) {

                var employerId;

                if (model.selctedEmployer)
                    employerId = model.selctedEmployer.EmployerId

                var obj = {
                    CourseName: model.CourseName,
                    CourseDescription: model.CourseDescription,
                    CPDTypeId: model.CPDTypeId,
                    DurationHours: model.DurationHours,
                    Minutes: model.DurationMins,
                    StartDate: parsedate(model.StartDate),
                    HostId: model.HostID,
                    LocationId: model.LocationID,
                    Active: model.Active,
                    AdminOnly: model.AdminOnly,
                    InHouseOnly: model.InHouseOnly,
                    Venue: model.Venue,
                    CourseId: model.CourseId,
                    CPDFormatId: model.CPDFormatId,
                    Trainer: model.Trainer,
                    HowToBook: model.HowToBook,
                    EmployerId: employerId

                };
                return obj;
            }


            function getLibraryInfo($scope, dataToPass, host, format, location, cpdTypes, operation) {

                $scope.hosts = host;
                $scope.cbdFormat = format;
                $scope.locations = location;
                $scope.cpdtypes = cpdTypes;
                $scope.operation = operation;

                if (dataToPass != undefined || dataToPass != null) {
                    $scope.model = dataToPass;

                    if (dataToPass.StartDate != null) {
                        $scope.model.StartDate = new Date(dataToPass.StartDate);
                    }
                }

            }

        }

        // initial table load
        loadData();


        vm.DownloadExcel = function () {
            downloadDocument(configenum.COMMON.CPDLIBRARYEXCEL, $http, true);

        }


    }]);
});