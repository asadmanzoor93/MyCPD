define(['app/app',
    'loadash',
    'app/configenum/config-enum',
], function (app, _,configenum) {
    'use strict';

    app.register.service('extpendingcpdsvc', ['communicationservice', function (communicationservice) {

        var _query = '';

        this.getapprovedCPD = function (query) {
                return communicationservice.get(configenum.ADMIN.CPDACCREDITED + '?' + query);
            }

        this.setquery = function (query) {
            _query = query;
        }

        this.getquery = function () {
            return _query;
        }


        }]);

   
});