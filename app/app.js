/// <reference path="../scripts/3rdparty/angular/angular.min.js" />


define(['angular',
    'angularUiRouter',
    'angularAnimate',
    'icecore',
    'bootstrapUi',
    'angularuicalender',
    'angularStorage',
    'angularLoadingBar',
    'angularUiSelect',
    'angularToastr',
    'angularWizard',
    'angularpdf',
]
    , function (angular, angularUiRouter, angularAnimate, icecore, angularwizard, bootstrapUi, angularuicalender, angularStorage, angularLoadingBar, angularUiSelect, angularToastr, angularWizard, angularpdf) {

        var app = angular.module('app', ['icecore', 'ui.router', 'ngMaterial', 'chart.js', 'ui.bootstrap', 'mwl.calendar', 'LocalStorageModule', 'angular-loading-bar', 'ui.select', 'ngSanitize', 'ngAnimate', 'toastr', 'mgo-angular-wizard', 'htmlToPdfSave']);

        app.init = function () {
            angular.bootstrap(document, ['app']);
        }

        app.config(['$stateProvider', '$urlRouterProvider' , 'deviceServiceProvider', '$controllerProvider',
            '$compileProvider', '$filterProvider', '$provide', 'templateServiceProvider', 'routeServiceProvider', '$locationProvider', '$mdDateLocaleProvider', 'moment',
            function ($stateProvider, $urlRouterProvider , deviceServiceProvider, $controllerProvider,
                $compileProvider, $filterProvider, $provide, templateServiceProvider, routeServiceProvider, $locationProvider, $mdDateLocaleProvider, moment) {

                app.register =
                    {
                        controller: $controllerProvider.register,
                        directive: $compileProvider.directive,
                        filter: $filterProvider.register,
                        factory: $provide.factory,
                        service: $provide.service
                    };

                $mdDateLocaleProvider.formatDate = function (date) {
                    return date ? moment(date).format('DD-MM-YYYY') : '';
                };

                $mdDateLocaleProvider.parseDate = function (dateString) {
                    var m = moment(dateString, 'DD-MM-YYYY', true);
                    return m.isValid() ? m.toDate() : new Date(NaN);
                };


               // $urlRouterProvider.otherwise('/login');

                $urlRouterProvider.otherwise(function () {

                    window.open('https://tp.accountingtechniciansireland.ie/MemberHomePage.aspx', '_self');
                });

                $locationProvider.hashPrefix('');

                $stateProvider
                    .state('Home', routeServiceProvider.resolve('app/Home/controller/home-controller.js', 'homeCtrl', 'app/home/templates/partial-home.html', '/Home'))
                    .state('MYCPD', routeServiceProvider.resolve('app/mycpd/controller/mycpd-controller.js', 'mycpdCtrl', 'app/mycpd/templates/partial-home.html', '/mycpd?mode'))
                    .state('CPDRECORD', routeServiceProvider.resolve('app/cpdrecord/controller/cpdrecord-controller.js', 'cpdrecordCtrl', 'app/cpdrecord/templates/partial-home.html', '/cpdrecord'))
                    .state('CPDCLASSROOM', routeServiceProvider.resolve('app/cpdclassroom/controller/cpdclsrm-controller.js', 'cpdclsrmCtrl', 'app/cpdclassroom/templates/partial-home.html', '/cpdclassroom'))
                    .state('CPDACCREDITED', routeServiceProvider.resolve('app/cpdaccredited/controller/cpdaccredited-controller.js', 'cpdaccredtCtrl', 'app/cpdaccredited/templates/partial-home.html', '/cpdaccredt'))
                    .state('LIBRARY', routeServiceProvider.resolve('app/library/controller/library-controller.js', 'libraryCtrl', 'app/library/templates/partial-home.html', '/library'))
                    .state('CPDADMIN', routeServiceProvider.resolve('app/adminlibrary/controller/adminlibrary-controller.js', 'adminlibrayCtrl', 'app/adminlibrary/templates/partial-home.html', '/cpdadmin'))
                    .state('MEMBERADMIN', routeServiceProvider.resolve('app/member.admin/controller/member-controller.js', 'MemberCtrl', 'app/member.admin/templates/partial-home.html', '/memberadmin'))
                    .state('ACCREDTADMIN', routeServiceProvider.resolve('app/accredited.admin/controller/accreditedadmin-controller.js', 'adminaccredtCtrl', 'app/accredited.admin/templates/partial-home.html', '/accredtadmin'))
                    .state('REPORTADMIN', routeServiceProvider.resolve('app/cpdreport/controller/cpdreport-controller.js', 'cpdreportCtrl', 'app/cpdreport/templates/partial-home.html', '/cpdreport'))
                    .state('SERVICELOGIN', routeServiceProvider.resolve('app/tokenInfo/controller/tokeninfo-controller.js', 'tokeninfoCtrl', 'app/tokeninfo/templates/partial-home.html', '/servicelogin?token'))
                    .state('LOGIN', routeServiceProvider.resolve('app/login/controller/login-controller.js', 'loginCtrl', 'app/login/templates/login-template.html', '/login'))
                    .state('REGISTER', routeServiceProvider.resolve('app/login/controller/register-controller.js', 'registerCtrl', 'app/login/templates/partial-register-template.html', '/register?mode'))
                    .state('EXTMYCPD', routeServiceProvider.resolve('app/extmycpd/controller/externalcpd-controller.js', 'extmycpdCtrl', 'app/extmycpd/templates/partial-home.html', '/extmycpd?mode'))
                    .state('EXTPENDINGCPD', routeServiceProvider.resolve('app/extpendingcpd/controller/extpendingcpd-controller.js', 'extpendingcpdCtrl', 'app/extpendingcpd/templates/partial-home.html', '/extpendingcpd'))
                    .state('EXTAPPROVEDCPD', routeServiceProvider.resolve('app/extapprovedcpd/controller/extapprovedcpd-controller.js', 'extapprovedcpdCtrl', 'app/extapprovedcpd/templates/partial-home.html', '/extapprovedcpd'))
                    .state('MONTHVIEWCPD', routeServiceProvider.resolve('app/monthlyview/controller/cpdmview-controller.js', 'cpdmviewCtrl', 'app/monthlyview/templates/partial-home.html', '/mviewcpd'))
                    .state('INDIVIDUALUSERREPORT', routeServiceProvider.resolve('app/individualuserreport/controller/cpdIndividualreport-controller.js', 'cpdIndividualCtrl', 'app/individualuserreport/templates/partial-home.html', '/individualuserreport'))
                    .state('COMPLIANTREPORT', routeServiceProvider.resolve('app/compliantreport/controller/compliant-report-controller.js', 'compliantCtrl', 'app/compliantreport/templates/partial-home.html', '/compliantreport?reportid'))
                    .state('RANDOMREPORT', routeServiceProvider.resolve('app/randomcompliantreport/controller/randomreport-controller.js', 'randomReportCtrl', 'app/randomcompliantreport/templates/partial-home-random-report.html', '/randomreport'))
                    .state('CPDGO', routeServiceProvider.resolve('app/cpdgo/controller/cpdgo-controller.js', 'cpdgoCtrl', 'app/cpdgo/templates/partial-home.html', '/cpdgo'))
                    .state('SYSTEMUSAGEREPORT', routeServiceProvider.resolve('app/systemusagereport/controller/systemusage-report-controller.js', 'systemUsageCtrl', 'app/systemusagereport/templates/partial-home.html', '/systemusagereport'))
                    .state('ADMINSETTING', routeServiceProvider.resolve('app/adminsetting/adminmain/controller/admin-main-controller.js', 'adminMainCtrl', 'app/adminsetting/adminmain/templates/partial-home-adminmain.html', '/adminsettings'))
                    .state('HOST', routeServiceProvider.resolve('app/adminsetting/host/controller/host-controller.js', 'hostCtrl', 'app/adminsetting/host/templates/partial-home-host.html', '/host'))
                    .state('LOCATION', routeServiceProvider.resolve('app/adminsetting/location/controller/location-controller.js', 'locationCtrl', 'app/adminsetting/location/templates/partial-home-location.html', '/location'))
                    .state('USERMANAGEMENT', routeServiceProvider.resolve('app/adminsetting/usermanagement/controller/usermanagement-controller.js', 'usermanagementCtrl', 'app/adminsetting/usermanagement/templates/partial-home-usermanagement.html', '/usermanagment'))
                    .state('LOGMESSAGE', routeServiceProvider.resolve('app/adminsetting/logmessage/controller/logmessage-controller.js', 'logmessageCtrl', 'app/adminsetting/logmessage/templates/partial-home-logmessage.html', '/logmessage'))
                    .state('RECORDEDZEROHOUR', routeServiceProvider.resolve('app/reports/recordedzerohour/controller/access-report-controller.js', 'accessreportCtrl', 'app/reports/recordedzerohour/templates/partial-home.html', '/recordedzerohour?reportid'));
            }]);

        return app;
});