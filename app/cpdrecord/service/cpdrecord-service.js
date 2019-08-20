define(['app/app',
    'loadash',
    'app/configenum/config-enum',
], function (app, _,configenum) {
    'use strict';

        app.register.service('cpdrecordsvc', ['communicationservice', function (communicationservice) {

            var _roles = [];
            var retdata = [];

            var setdata = function (data) {
                retdata = data;
            }

            this.getdata = function () {
                getDataaservice();
                return retdata;
            }

            this.setrole = function (role) {
                _roles = role;
            }
            this.getroles = function () {
                return _roles;
            }

            var getDataaservice = function () {
                communicationservice.get(configenum.USER.CPDRECORD).then(function (response) {
                    setdata(response.data);
                });
            }


        }]);

   
});