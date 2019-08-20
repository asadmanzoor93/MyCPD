define(['app/app',
    'loadash',
    'app/configenum/config-enum',
], function (app, _,configenum) {
    'use strict';

    app.register.service('homesvc', ['communicationservice', '$http', function (communicationservice, $http) {

            var _roles = [];
            var retdata = [];

            var setdata = function (data) {
                retdata = data;
            }

            this.getdata = function () {
                getDataService();
                return retdata;
            }

            this.setrole = function (role) {
                _roles = role;
            }
            this.getroles = function () {
                return _roles;
            }

            var getDataService = function () {
                communicationservice.get(configenum.COMMON.HOME).then(function (response) {
                    setdata(response.data);
                });
            }

            this.getDashboard = function () {
                return $http.get(configenum.COMMON.HOME);
            }

        }]);

   
});