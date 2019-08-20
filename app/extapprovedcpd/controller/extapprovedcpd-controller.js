define(['app/app',
    'loadash',
    'app/extapprovedcpd/service/extapprovedcpd-service'
], function (app, _, extapprovedcpdsvc) {
    'use strict';
    app.register.controller('extapprovedcpdCtrl', ['$scope', '$state', '$mdDialog', 'extapprovedcpdsvc', '$filter', '$window', function ($scope, $state, $mdDialog, extapprovedcpdsvc, $filter, $window) {

        var vm = this;

        var service = extapprovedcpdsvc;

        var callservice = function (query, page) {
            service.getapprovedCPD(query).then(function (response) {
                if (response.statusText == 'OK') {
                    vm.cpdrecords = {};
                    vm.cpdrecords = response.data.Items;
                    vm.pagingInfo = { page: page, totalItems: response.data.TotalCount, itemsPerPage: 10 }
                }
            });
        }

        var getmembers = function (page, adhocq) {
            var status = 'APPROVED_CPD';
            var query = 'page=' + page + '&pageSize=10' + '&Status=' + status;
            if (adhocq != null || adhocq != undefined) {
                query = query + '&' + adhocq;
            }
            callservice(query, page);

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

        vm.dosearch = function (query) {
            var date = $filter('date')(new Date(query.curdate), "yyyy-MM-dd");
            var query = 'Name=' + query.coursename + '&LocationID=' + query.locationid + '&CPDTypeId=' + query.courseid + '&StartDate=' + date;
            service.setquery(query);
            getmembers(1, query);
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

        vm.pagefunction = function (page) {
            var query = service.getquery();
            getmembers(page, query);
        };

        vm.editDialog = new EditCustomDialogModel();

        vm.actionfunc = function (arg, row) {

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
                Venue: row.Venue

            };

            vm.editDialog.open(eventitem);

        }

        vm.print = function () {
            $window.print();
        }
        


    }]);
});