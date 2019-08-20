
require.config({
    paths: {

          'angular': 'scripts/3rdparty/angular/angular.min',
          'angularUiRouter': 'scripts/3rdparty/angular/angular-ui-router',
          'angularSanitize': 'scripts/3rdparty/angular/angular-sanitize.min',
          'angularAnimate': 'scripts/3rdparty/angular/angular-animate.min',
          'loadash': 'scripts/3rdparty/loadash/loadash.min',
          'icecore': 'app/lib/ice.core',
          'angularmaterail': 'scripts/3rdparty/angular/angular-material',
          'angulararia': 'scripts/3rdparty/angular/angular-aria.min',
          'angularmessage': 'scripts/3rdparty/angular/angular-messages.min',
          'angularcalender': 'node_modules/angular-material-event-calendar/dist/angular-material-event-calendar.min',
          'angularchart': 'node_modules/angular-chart.js/dist/angular-chart.min',
          'chart': 'node_modules/chart.js/dist/chart.min',
          'bootstrap': 'scripts/3rdparty/bootstrap/bootstrap.min',
          'bootstrapUi': 'scripts/3rdparty/bootstrap/ui-bootstrap-tpls.min',
          'angularStorage': 'scripts/3rdparty/angular/angular-local-storage.min',
          'angularLoadingBar': 'scripts/3rdparty/angular/loading-bar.min',
          'angularUiSelect': 'scripts/3rdparty/angular/select.min',
          'angularToastr': 'scripts/3rdparty/angular/angular-toastr.tpls.min',
          'angularuicalender': 'node_modules/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min',
          'moment': 'scripts/3rdparty/moment/moment.min',
          'interact': 'node_modules/interactjs/dist/interact.min',
          'angularWizard': 'scripts/3rdparty/angular/angular-wizard.min',
          'angularpdf':'node_modules/angular-save-html-to-pdf/dist/saveHtmlToPdf.min',
         

    },
    shim : {
        'angular' : {
            exports : 'angular'
        },
        'angularUiRouter' : {
            deps : ['angular']
        },
        'angularAnimate' : {
            deps : ['angular']
        },
        'angularSanitize' : {
            deps : ['angular']
        },
        'angularwizard': {
            deps: ['angular']
        },
        'angulararia': {
            deps: ['angular']
        },
        'angularmessage': {
            deps: ['angular']
        },
        'angularchart': {
            deps: ['angular', 'chart']
        },
        'angularmaterail': {
            deps: ['angular', 'angularAnimate', 'angulararia', 'angularmessage']
        },
        'angularuicalender': {
            deps: ['angular', 'bootstrapUi', 'moment','interact']
        },
        'icecore': {
            deps: ['angular', 'angularSanitize', 'angularmaterail', 'angularuicalender', 'angularchart']
        },
        'bootstrapUi': {
            deps: ['angular', 'bootstrap']

        },
        'angularStorage': {
            deps: ['angular']
        },
        'angularLoadingBar': {
            deps: ['angular']
        },
        'angularUiSelect': {
            deps: ['angular']
        },
        'angularToastr': {
            deps: ['angular', 'angularAnimate']
        },
        'angularWizard':{
            deps: ['angular']
        },
        'angularpdf': {
            deps: ['angular']
        }

    }

   , urlArgs: 'v=2'

});

require(["app/app"], function (app) {

    app.init();

});