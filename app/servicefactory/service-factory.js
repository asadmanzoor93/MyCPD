define(['app/app',
    'loadash',
    'app/accredited.admin/servicerepo/accredited-admin-service'
], function (app, _, accreditedreposvc) {
    'use strict';

    var servicefactory = function (accreditedreposvc) {

        var getservice = function (servicename) {

            if (servicename == 'ACCRDTADMIN')
            {
                return accreditedreposvc;
            }
        };

        return {
            getservice: getservice
        }

    };

    app.register.factory('servicefactory', servicefactory);



});