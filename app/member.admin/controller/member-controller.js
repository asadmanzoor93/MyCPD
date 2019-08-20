define(['app/app',
    'loadash',
    'app/configenum/names',
    'app/member.admin/service/memberadmin-service'
], function (app, _, names, memberadminsvc) {
    'use strict';
    app.register.controller('MemberCtrl', ['$scope', 'memberadminsvc', '$window', function ($scope, memberadminsvc, $window) {

        var vm = this, i = 0, tempArar = [], selOpts, yearreq = [];

        vm.print = function () {
            $window.print();
        }

        vm.userName = '';
        vm.isComaplaint = '';
        vm.memberId = '';
        vm.year = '';

        var currentyear = new Date().getFullYear();
        var yearmin = currentyear - 5;

        for (var i = yearmin; i <= currentyear; i++)
        {
            yearreq.push(i);
        }

        vm.yearreq = yearreq;

        var callservice = function (query, page) {
            memberadminsvc.getDataaservice(query).then(function (response) {
                if (response.statusText == 'OK') {
                    vm.cpdrecords = {};
                    vm.cpdrecords = response.data.Items;
                    vm.pagingInfo = { page: page, totalItems: response.data.TotalCount, itemsPerPage: 10 }
                }
            });
        }

        var getmembers = function (page, adhocq) {
            var query = 'page=' + page + '&pageSize=10';
            if (adhocq != null || adhocq != undefined)
            {
                query = query + '&' + adhocq;
            }
            callservice(query, page);

        }

        getmembers(1,null);

        var retempty = function (object) {
            if (angular.isUndefined(object)) {
                return '';
            }
        };

        vm.search = function () {
            var adhocq = 'userName=' + vm.userName + '&isComaplaint=' + vm.isComaplaint + '&memberId=' + vm.memberId + '&year=' + vm.year;
            memberadminsvc.setquery(adhocq);
            getmembers(1, adhocq);
        }


        vm.clear = function () {
            vm.userName = '';
            vm.isComaplaint = '';
            vm.memberId = '';
            vm.year = '';
            vm.search();
            //getmembers(1, null);
        }

        vm.sortfunction = function (column, order) {
            var query = memberadminsvc.getquery();
            if (query != '') {
                query = query + '&reverse=' + order + '&sortBy=' + column;
            }
            else {
                query = 'reverse=' + order + '&sortBy=' + column;
            }
            getmembers(1, query);
        }

        vm.pagefunction = function (page) {
            var query = memberadminsvc.getquery();
            getmembers(page,query);
        };

        vm.configuration = {
            showsnapshot: true,
            showcoursedetail: true,
            showemail: true,
            showregister : true
        }
        
    }]);
});