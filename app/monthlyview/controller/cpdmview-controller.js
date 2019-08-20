define(['app/app',
    'loadash',
    'app/adminlibrary/service/cpdrecordadmin-service',
], function (app, _, cpdrecordadminsvc) {
    'use strict';
    app.register.controller('cpdmviewCtrl', ['$scope', '$state', '$compile', '$mdDialog', 'cpdrecordadminsvc', 'moment', function ($scope, $state, $compile, $mdDialog, cpdrecordadminsvc, moment) {

        var vm = this;
        var events = null;

        vm.calendarView = 'month';
        vm.viewDate = new Date();
        vm.cellIsOpen = false;


        // this represents the state of the dialog: a visible flag and the person being edited
        var EditCustomDialogModel = function () {
            this.visible = false;
        };
        EditCustomDialogModel.prototype.open = function (data) {
            this.data = data;
            this.visible = true;
        };
        EditCustomDialogModel.prototype.close = function () {
            this.visible = false;
        };

        vm.editDialog = new EditCustomDialogModel();

        vm.eventClicked = function (item) {
            vm.editDialog.open(item);
        }

        var getcourses = function (query) {
            var constquery = 'page=1&pageSize=1&'+ query;
            cpdrecordadminsvc.getDataaservice(constquery).then(function (response) {
                if (response.statusText == 'OK') {
                    var cpdrecords = {};
                    var cpdrecords = response.data.Items;
                    events = [];
                    angular.forEach(cpdrecords, function (value, key) {
                        var eventitem = {
                            title: value.CourseName,
                            CourseName: value.CourseName,
                            StartDate: new Date(value.StartDate),
                            startsAt: new Date(value.StartDate),
                            endsAt: new Date(value.StartDate),
                            allDay: false,
                            CourseDescription: value.CourseDescription,
                            CpdType: value.CPDTypeId,
                            Trainer: value.Trainer,
                            Expr1: value.Expr1,
                            Name: value.Name,
                            Description: value.Description
                        };
                        
                        events.push(eventitem);
                    });
                    
                    vm.events = events;
                    $scope.selected = events[0];
                }
            });

        }


        vm.getdata = function (query) {
            getcourses(query);
        }

        var constructquery = function (date) {
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var query = 'monthlyView=' + month + '|' + year;
            return query;
        }

        getcourses(constructquery(new Date()));
        

        
        vm.previous = function () {

            vm.cellIsOpen = false;
            getcourses(constructquery(vm.viewDate));
            
        }

        vm.next = function () {
            vm.cellIsOpen = false;
            getcourses(constructquery(vm.viewDate));
        }

        vm.setcurrent = function () {
            vm.cellIsOpen = false;
            getcourses(constructquery(vm.viewDate));
        }


        vm.timespanClicked = function (date, cell) {

            if (vm.calendarView === 'month') {
                if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            } else if (vm.calendarView === 'year') {
                if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            }

        };
        
        
    }]);
});