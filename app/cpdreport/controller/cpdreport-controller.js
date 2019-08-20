define(['app/app',
    'app/configenum/config-enum',
    'app/configenum/cpd-report'
], function (app, configenum, cpdreport) {
    'use strict';
    app.register.controller('cpdreportCtrl', ['$http', '$state', function ($http, $state) {

        var vm = this;

        vm.entries = [10, 20, 30];
        vm.years = [2018, 2019];
        vm.currentYear = new Date().getFullYear();
        vm.selectYear;


        vm.items = ["User submitted CPD report", "Total submitted hours report by CPD declared users", "Individual user report", "Report by course type, Name and host", "Percentage report for all declared members"

        ];

        vm.getSelectedText = function () {
            if (vm.selectedItem !== undefined) {
                return "You have selected: Item " + vm.selectedItem;
            } else {
                return "Please select an item";
            }
        };

        vm.searchField = [{ Category: "Course Type", type: "Dropdown", defaultValue: ["A", "B", "C"] }, { Category: "Title", type: "text", defaultValue: null }, { Category: "Venue", type: "text", defaultValue: null }, { Category: "Hours" , type: "numeric", defaultValue: 0}];
       

        vm.cpdreportrecord = cpdreport;


        vm.viewReport = function (reportid) {

            if (reportid === 'CPD0001') {
                $state.go('INDIVIDUALUSERREPORT');
            }
            else if (reportid=== 'CPD0002') {
                $state.go('COMPLIANTREPORT', { reportid: "CPD0002" });
            }
            else if (reportid === 'CPD0003') {
                $state.go('COMPLIANTREPORT', { reportid: "CPD0003" });
            }
            else if (reportid === 'CPD0004') {
                $state.go('RANDOMREPORT');
            }
            else if (reportid === 'CPD0005') {
                $state.go('SYSTEMUSAGEREPORT');
            }
            else if (reportid === 'CPD0006') {
                $state.go('RECORDEDZEROHOUR', { reportid: "CPD0006" });
            }
            else if (reportid === 'CPD0007') {
                $state.go('RECORDEDZEROHOUR', { reportid: "CPD0007" });
            }
            else
                $state.go('INDIVIDUALUSERREPORT');
        }

        var loadCPDCompliantInfo = function () {

            var year = new Date().getFullYear();
            if (vm.selectYear)
            {
                year = vm.selectYear;
            }

            return $http({ method: "GET", url: configenum.ADMIN.CPDCOMPLIANTINFO + "?Year=" + year }).then(function (result) {
                return  vm.CPDInfo = result.data[0];
            });
        }

        loadCPDCompliantInfo();



        vm.getCPDCompliantInfo = function (year) {
            vm.selectYear = year;
            loadCPDCompliantInfo();
        };

    }]);
});