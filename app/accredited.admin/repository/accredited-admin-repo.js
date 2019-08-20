define(['app/app',
    'loadash'
], function (app, _) {
    'use strict';

    var accreditedadminrepo = function () {

        var getrecords = function () {

            var records = [{
                    course: 'This video to learn tutorial 1',
                    attachment: '1A',
                    provider: 'Provider-1',
                    user: 'S1A',
                    username: 'Mark Stanley',
                    emailaddress: 'ye@ye.com'
                },
                {
                    course: 'This video to learn tutorial 1',
                    attachment: '1A',
                    provider: 'Provider-1',
                    User: 'S1B',
                    username: 'John Stanley',
                    emailaddress: 'ye@ye.com'
                },
                {
                    course: 'This video to learn tutorial 1',
                    attachment: '1A',
                    provider: 'Provider-1',
                    User: 'S1C',
                    username: 'Mark Stanley',
                    emailaddress: 'ye@ye.com'
                }];

            return records;

        }

        return {
            getrecords: getrecords
        }

    }

    app.register.service('accreditedadminrepo', accreditedadminrepo);

});