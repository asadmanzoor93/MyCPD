define(['app/app',
    'loadash',
    'app/configenum/config-enum'
], function (app, _,configenum) {
    'use strict';

    var loginsvc = function ($window, authService, communicationservice) {

        var _logintype = ''
        var _data = '';

        this.setlogintype = function (logintype) {
            _logintype = logintype;
        }
        this.getlogintype = function () {
            return _logintype;
        }

        this.register = function (register) {
            return communicationservice.post(configenum.AUTH.REGISTER, register);
        }


        this.login = function (login) {
            return authService.login(login);
        }

        this.setdata = function (data){
            _data = data;
        }

        this.getdata = function (data) {
            return _data;
        }

    }

    loginsvc.$inject = ["$window", "authService" ,"communicationservice"]
    app.register.service('loginsvc', loginsvc);


});