define(['app/app',
    'loadash',
    'app/configenum/config-enum',
], function (app, _,configenum) {
    'use strict';

        app.register.service('cpdrecordadminsvc', ['communicationservice', function (communicationservice) {

            var _roles = [];
            var retdata = {};
            var _query = '';

            this.setdata = function (data) {
                retdata = data;
            }

            this.getdata = function () {
                return retdata;
            }

            this.setrole = function (role) {
                _roles = role;
            }
            this.getroles = function () {
                return _roles;
            }

            this.getDataaservice = function (query) {
                return communicationservice.get(configenum.ADMIN.CPDADMIN + '?' + query);
            }

            this.getPostDataaservice = function (query) {
                return communicationservice.post(configenum.ADMIN.CPDADMINADDCOURSE , query);
            }

            this.getPostDataaservice = function (query) {
                return communicationservice.post(configenum.ADMIN.CPDADMINADDCOURSE, query);
            }

            this.getPutDataaservice = function (query) {
                return communicationservice.post(configenum.ADMIN.CPDADMINUPDATECOURSE, query);
            }

            this.setquery = function (query) {
                _query = query;
            }

            this.getquery = function (query) {
                return _query;
            }

            this.getLocationService = function (query) {
                return communicationservice.get(configenum.COMMON.LOCATION + '?' + query);
            }

            this.getLocationServiceurl = function () {
                return configenum.COMMON.LOCATION;
            }

            this.gethostServiceurl = function () {
                return configenum.COMMON.HOST;
            }

            this.getcpdServiceurl = function () {
                return configenum.COMMON.CPDTYPES;
            }

        }]);

   
});