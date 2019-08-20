define(['app/app',
    'loadash',
    'app/servicefactory/service-factory',
    'app/configenum/config-enum'
], function (app, _, servicefactory, configenum) {
    'use strict';
    app.register.controller('adminaccredtCtrl', ['$scope', '$state', '$compile', '$mdDialog', 'servicefactory', 'toastr', '$http', '$window', function ($scope, $state, $compile, $mdDialog, servicefactory, toastr, $http, $window) {

        var vm = this;

        var service = servicefactory.getservice('ACCRDTADMIN');

        var callservice = function (query,page) {
            service.getapprovedCPD(query).then(function (response) {
                if (response.statusText == 'OK') {
                    vm.cpdrecords = {};
                    vm.cpdrecords = response.data.Items;
                    vm.pagingInfo = { page: page, totalItems: response.data.TotalCount, itemsPerPage: 10 }
                }
            });
        }

        var getmembers = function (page, adhocq) {
            var query = 'page=' + page + '&pageSize=10';
            if (adhocq != null || adhocq != undefined) {
                query = query + '&' + adhocq;
            }
            callservice(query,page);

        }

        getmembers(1);

        vm.configuration = {
            registerbutton: true
        }

        vm.clear = function () {
            vm.username = '';
            vm.providername = '';
            vm.coursename = '';
            service.setquery('');
            getmembers(1);
        }

        var removeundefined = function (model) {
            if (model == null || model == undefined) {
                return '';
            }

            return model;
        }

        vm.search = function () {
            var adhocq = 'UserName=' + removeundefined(vm.username) + '&Provider=' + removeundefined(vm.providername) + '&Name=' + removeundefined(vm.coursename);
            service.setquery(adhocq);
            getmembers(1, adhocq);
        }

        vm.sortfunction = function (column, order) {
            var query = service.getquery();
            if (query != '') {
                query = query + '&reverse=' + order + '&sortBy=' + column;
            }
            else {
                query = 'reverse=' + order + '&sortBy=' + column;
            }
            getmembers(1, query);
        }

        vm.editDialog = new EditCustomDialogModel();

        vm.actionfunc = function (arg, row) {
            var filename = row.ModifiedFileName;

            if (!filename) {
                filename = row.FileName
            }
            if (arg === 'DOWNLOAD') {

                downloadFile(filename);
            }
            else {

                var eventitem = {
                    title: row.Name,
                    CourseName: row.Name,
                    StartDate: new Date(row.StartDate),
                    startsAt: new Date(row.StartDate),
                    endsAt: new Date(row.StartDate),
                    allDay: false,
                    CourseDescription: row.Description,
                    Description: row.CPDTypeDesc,
                    Trainer: row.Trainer,
                    Name: row.HostName,
                    FormatName: row.CPDFormatName,
                    Expr1: row.LocationName,
                    Venue:row.Venue
                };

                vm.editDialog.open(eventitem);
            }
        }
        var downloadFile = function (name) {
            if (name.toUpperCase() !== 'NO FILE UPLOADED') {
                var downloadPath = configenum.ADMIN.CPDACCRDFDOWNLOAD + '?name=' + name;
                $window.open(downloadPath, '_blank', '');
            }
        };

        vm.pagefunction = function (page) {
            var query = service.getquery();
            getmembers(page, query);
        };


        vm.Submit = function (action,status) {
            var ids = [];
            var records = vm.cpdrecords;
            var message = 'Record(s) ' + action + ' Successfully';

            angular.forEach(records, function (value, key) {
                if (value.hasOwnProperty('selected') && value.selected == true) {
                    ids.push(value.ID);
                }
            });

            var data = {
                Ids: ids,
                Status: status
            }

            service.approverejectCPD(data).then(function (response) {
                if (response.statusText == 'OK') {
                    toastr.success(message, 'Success');
                    getmembers(1);
                }
            });



        }

    }]);
});