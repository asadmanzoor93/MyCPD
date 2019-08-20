define(['app/app',
    'loadash',
    'app/configenum/config-enum'
], function (app, _, configenum) {
    'use strict';

    var accreditedreposvc = function (communicationservice) {

        var retdata = [];
        var _query = '';

        var setdata = function (data) {
            retdata = data;
        }

        var getapprovedCPD = function (query) {
            return communicationservice.get(configenum.ADMIN.CPDACCREDITED +'?' + query);
        }

        var approverejectCPD = function (data) {
            return communicationservice.post(configenum.ADMIN.CPDACCREDITEDAR, data);
        }

        var setquery = function (query) {
            _query = query;
        }

        var getquery = function () {
            return _query;
        }

        return {
                    getapprovedCPD: getapprovedCPD,
                    approverejectCPD: approverejectCPD,
                    setquery: setquery,
                    getquery: getquery
            }

        }

    accreditedreposvc.$inject = ['communicationservice'];
    app.register.service('accreditedreposvc', accreditedreposvc);


});