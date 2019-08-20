define(['app/app',
    'loadash',
    'app/configenum/config-enum',
], function (app, _,configenum) {
    'use strict';

        app.register.service('memberadminsvc', ['communicationservice', function (communicationservice) {

            var _roles = [];
            var retdata = [];
            var _query = '';

            var setdata = function (data) {
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

            this. getDataaservice = function (query) {
                return communicationservice.get(configenum.ADMIN.CPDMEMBER + '?' + query);
            }

            this.setquery = function (query) {
                _query = query;
            }

            this.getquery = function (query) {
                return _query;
            }


        }]);

   
});