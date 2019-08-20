'use strict';

// this represents the state of the dialog: a visible flag and the modal being edited
var EditCustomDialogModel = function () {
    this.visible = false;
};
EditCustomDialogModel.prototype.open = function (data) {
    this.data = data;
    this.visible = true;
};
EditCustomDialogModel.prototype.close = function () {
    this.visible = false;
};

function clean(obj) {
    for (var propName in obj) {
        if (obj[propName] === '' || obj[propName] === undefined || obj[propName] === null) {
            delete obj[propName];
        }
    }
    return obj;
}

function downloadDocument(filePath, $http, excel, name) {
    var file = filePath;
    var fileType = 'application/octet-stream';

    if (excel) {
        fileType = 'application/vnd.ms-excel';
    }

    $http.get(file, { responseType: 'arraybuffer' }
    ).then(function (response) {
        var header = response.headers('Content-Disposition')

        if (header) {
            name = header.split("=")[1].replace(/\"/gi, '');
        }

        var blob = new Blob([response.data],
            { type: fileType });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, name);
        }
        else {

            var objectUrl = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(blob);
            var link = angular.element('<a/>');
            link.attr({
                href: objectUrl,
                download: name
            })[0].click();


            setTimeout(function () {
                var ua = window.navigator.userAgent;
                if (ua.indexOf('Firefox') != -1) {
                    window.open(objectUrl);
                }
                else {
                    URL.revokeObjectURL(objectUrl);
                }

            }, 100);

        }
    })
}




function parseDate(date, moment) {
    if (isValidDate(date)) {
        return moment(date).format('MM/DD/YYYY');
    }

    return '';
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}


define(['app/configenum/config-enum'], function (config) {

    var icecore = angular.module('icecore', ['ui.bootstrap']);

    var serviceBase = config.SETTINGS.SERVICEBASE;

    var redirectURL = config.SETTINGS.EXTERNALURL;// redirection URL

    icecore.factory('authInterceptorService', ['$q', '$location', 'localStorageService', '$window', function ($q, $location, localStorageService, $window) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};
            if (config.url.indexOf('partial') !== -1) {
                config.url = config.url + '?v=2';
            }

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        function deleteProperties(obj, config, transformResponse, jsonpCallbackParam, url, headers, cached) {
            delete obj[config];
            delete obj[transformResponse];
            delete obj[jsonpCallbackParam];
            delete obj[url];
            delete obj[headers];
            delete obj[cached];
            return obj;
        }

        var _responseError = function (rejection) {

            if (rejection.status === 401) {
                $location.path('/login');
            }

            if (rejection.status === 404 && rejection.data.Message.indexOf('Account/Login.aspx?ReturnUrl') >= 0 ) {

                try {
                    var storageItem = window.localStorage.getItem('ls.authorizationData');
                    var json = JSON.parse(storageItem);
                    if (json=== null || json.role == 'Member' || json.role == 'Fellow') {
                        $window.location.href = "https://tp.accountingtechniciansireland.ie/MemberHomePage.aspx";
                    }
                    else {
                        $location.path('/login');
                    }
                }
                catch (e) {
                }
            }

            deleteProperties(rejection, 'config', 'transformResponse', 'jsonpCallbackParam', 'url', 'headers', 'cached');
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }]);


    icecore.config(function ($httpProvider, $qProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
        $qProvider.errorOnUnhandledRejections(false);
    });



    icecore.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: "",
            SSO: false
        };
        var _saveRegistration = function (registration) {

            _logOut();

            return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
                return response;
            });

        };
        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&client_id=mycpd";

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(
                function (response) {
                    localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName, displayName: response.data.displayName, role: response.data.role });

                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;

                    deferred.resolve(response);
                },
                function (response) {
                    _logOut();
                    deferred.reject();
                });


            return deferred.promise;

        };

        var _signin = function (token) {

            var deferred = $q.defer();

            $http({ method: "GET", url: config.AUTH.ACCESSTOKEN + "?externalAccessToken=" + token + "&provider=ATI" })
                .then(
                function (response) {
                    localStorageService.set('authorizationData', { token: response.data.access_token, userName: response.data.userName, displayName: response.data.displayName, role: response.data.role });

                    _authentication.isAuth = true;
                    _authentication.userName = response.data.userName;
                    _authentication.SSO = true;
                    deferred.resolve(response);
                },
                function (response) {
                    _logOut();
                    deferred.reject();
                });

            return deferred.promise;

        };

        var _logOut = function () {

            var url;

            if (_authentication.SSO) {
                url = redirectURL
            }

            $http.get(serviceBase + 'api/account/LogOff').then(function (result) {

                localStorageService.remove('authorizationData');

                _authentication.isAuth = false;
                _authentication.userName = "";
                _authentication.SSO = false;
                return result.data;
            });



        return url;

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.signin = _signin;
    return authServiceFactory;

}]);


icecore.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


icecore.config(function ($httpProvider, $provide) {
    icecore.simplified = true;
    icecore.httpProvider = $httpProvider;
    icecore.$provide = $provide;
});

var deviceService = function () {

    this.$get = ['$window', 'alert', function (window, alert) {
    }];

    this.currentHeight = function () {
        return window.innerHeight;
    };

};

icecore.provider('deviceService', deviceService);

var templateService = function () {

    this.$get = function () {
        return this;
    }

    this.geTemplate = function () {

        var baseTemplate = 'app/login/templates/{0}/partial-home.html';
        return baseTemplate.replace('{0}', configenum.app);

    };
};

var routeService = function () {

    this.$get = function () {
        return this;
    }

    this.resolve = function (path, name, templateurl, url) {

        var routeDef = {};
        routeDef.url = url;
        routeDef.templateUrl = templateurl;
        routeDef.controller = name;
        routeDef.controllerAs = 'vm'
        routeDef.resolve = {
            load: ['$q', '$rootScope', function ($q, $rootScope) {
                var dependencies = [path];
                return resolveDependencies($q, $rootScope, dependencies);
            }]
        };

        return routeDef;
    };

    var resolveDependencies = function ($q, $rootScope, dependencies) {
        var defer = $q.defer();
        require(dependencies, function () {
            defer.resolve();
            $rootScope.$apply()
        });

        return defer.promise;
    };

}

icecore.provider('routeService', routeService);
icecore.provider('templateService', templateService);

var directive = function () {
    return {
        restrict: 'EA',
        scope: {
            placeHolder: '@',
            textWidth: '@',
            textHeight: '@'
        },
        template: '<input type="text" placeholder="{{placeHolder}}" width="{{textWidth}}" height="{{textHeight}}"></input>'

    };

};

icecore.directive("iceText", directive);

var list = function ($mdDialog) {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            url: '@',
            config: '='
        },
        templateUrl: 'app/lib/list/list-partial.html',
        //controller: controllerFunction, //Embed a custom controller in the directive
        link: function ($scope, element, attrs) {

            //$scope.register = function () {

            //}

        }
    }
};

icecore.directive("iceList", list);


var listitem = function () {
    return {
        restrict: 'EA',
        scope: {
            details: '=',
            itemurl: '@'
        },
        link: function (scope, element, attrs) {
            scope.getContentUrl = function () {
                return scope.itemurl;
            }
        },
        template: '<div ng-include="getContentUrl()"></div>'
    }
};

icecore.directive("iceListItem", listitem);

var navheaders = function ($mdSidenav, $state, $window, $mdDialog, authService, localStorageService, $modal) {
    return {
        restrict: 'EA',
        scope: {
            css: '@',
            text: '@',
            homeicon: '@',
            quicknav: '@',
            contactus: '@',
            aboutus: '@',
            usermodel: '='
        },
        templateUrl: 'app/lib/header/nav_header.html',
        controller: function ($scope) {
            var authData = localStorageService.get('authorizationData');

            if ($scope.usermodel == null || angular.isUndefined($scope.usermodel)) {
                var model = authData;
                if (model != null) {
                    var usermodel = {
                        displayName: model.displayName,
                        //lastname: model.Surname,
                        //memberid : model.MemberId
                    };

                    $scope.user = usermodel;
                }

            }
            else {
                $scope.user = $scope.usermodel;
            }
        },
        link: function ($scope, element, attrs) {

            $scope.menuclick = 'TOGGLE';

            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');

            $scope.showmenu = false;

            function buildToggler(componentId) {
                return function () {
                    $scope.showmenu = false;
                    $scope.menuclick = 'TOGGLE';
                    $mdSidenav(componentId).toggle();
                };
            }

            $scope.eventmenu = function (menuid) {
                $scope.menuclick = menuid;
                if (menuid == 'MAIL') {
                    showcontactus();
                }

            }

            $scope.gotohome = function () {
                $state.go('Home');
                $scope.menuclick = 'HOME';
            }

            $scope.logOut = function () {
                var url = authService.logOut();
                if (url)
                    $window.location.href = url;
                $state.go('LOGIN');
            };

            var showcontactus = function () {

                var modalInstance = $modal.open({
                    templateUrl: 'app/lib/contactus/contactus_partial.html',
                    controller: DialogController,
                });
            };

            $scope.AboutUs = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'app/lib/aboutus/aboutus_template.html',
                    controller: DialogController,
                });
            }

            function DialogController($scope, $modalInstance, $window, $http, toastr) {

                $scope.hide = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.close();
                };

                $scope.ContactUs = function (model) {

                    var data = {

                        Name: model.UserName,
                        MembershipNumber: model.MembershipNumber,
                        Phone: model.Phone,
                        Email: model.Email,
                        Query: model.Query

                    };

                    $http.post(serviceBase + 'api/contact/SendInfo', data, null)
                        .then(
                        function (response) {
                            toastr.success('Query Sent.', 'Success');
                            $modalInstance.close();
                        },
                        function (response) {
                            toastr.error('Feedback failed. Try again.', 'Error');
                            $modalInstance.close();
                        });
                }
            }
        }
    }
};

icecore.directive("navHeader", navheaders);

var navSidebar = function ($state, $mdSidenav, $mdDialog, $modal) {
    return {
        restrict: 'EA',

        templateUrl: 'app/lib/sidenav/sidenav-template.html',
        controller: function ($scope) {



        },
        link: function ($scope, element, attrs) {

            $scope.gotopage = function (routename) {
                    $state.go(routename);
            }


            function DialogController($scope, $mdDialog, $modalInstance) {

                $scope.hide = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.close();
                };
            }

            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');

            $scope.showmenu = false;

            function buildToggler(componentId) {
                return function () {
                    $scope.showmenu = false;
                    $scope.menuclick = 'TOGGLE';
                    $mdSidenav(componentId).toggle();
                };
            }

        }
    }
};

icecore.directive("navSidebar", navSidebar);

var navSidebarAdmin = function ($state, $mdSidenav) {
    return {
        restrict: 'EA',

        templateUrl: 'app/lib/sidenav/sidenav-template-admin.html',
        controller: function ($scope) {



        },
        link: function ($scope, element, attrs) {

            $scope.gotopage = function (routename) {
                $state.go(routename);
            }

            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');

            $scope.showmenu = false;

            function buildToggler(componentId) {
                return function () {
                    $scope.showmenu = false;
                    $scope.menuclick = 'TOGGLE';
                    $mdSidenav(componentId).toggle();
                };
            }
        }
    }
};

icecore.directive("adminSidebar", navSidebarAdmin);

var extSidebarAdmin = function ($state, $mdSidenav) {
    return {
        restrict: 'EA',

        templateUrl: 'app/lib/sidenav/sidenav-extuser.html',
        controller: function ($scope) {



        },
        link: function ($scope, element, attrs) {

            $scope.gotopage = function (routename) {
                $state.go(routename);
            }

            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');

            $scope.showmenu = false;

            function buildToggler(componentId) {
                return function () {
                    $scope.showmenu = false;
                    $scope.menuclick = 'TOGGLE';
                    $mdSidenav(componentId).toggle();
                };
            }
        }
    }
};

icecore.directive("extSidebar", extSidebarAdmin);


var searchcontent = function ($http) {
    return {
        restrict: 'EA',
        scope: {
            url: '@',
            funcsearch: '&',
            funcclear: '&'
        },

        templateUrl: function (elem, attrs) {
            return attrs["template"] == "generic" ?
                'app/lib/search/search_template.html' : 'app/lib/search/search_template_cpd.html';
        },
        controller: function ($scope) {


        },
        link: function ($scope, element, attrs) {

            var yearreq = [];

            $scope.coursename = '';

            var currentyear = new Date().getFullYear();
            var yearmin = currentyear - 5;

            for (var i = yearmin; i <= currentyear; i++) {
                yearreq.push(i);
            }

            $scope.yearreq = yearreq;

            $scope.query = function (searchText) {
                var searchstr = 'location=' + searchText;
                return $http
                    .get(serviceBase + 'api/Lookup/CPDLocation' + '?' + searchstr)
                    .then(function (response) {
                        return response.data;
                    });
            };

            $scope.querycpdtype = function (searchText) {
                var searchstr = 'cpdtype=' + searchText;
                return $http
                    .get(serviceBase + 'api/Lookup/CPDTypesearch' + '?' + searchstr)
                    .then(function (response) {
                        $scope.cpdtypes = response.data;
                        return response.data;
                    });
            };



            $scope.search = function () {
                var filter = {
                    curdate: $scope.curdate,
                    location: $scope.selectedItem == null ? '' : $scope.selectedItem.Name,
                    coursetype: $scope.selectedItemcpdt == null ? '' : $scope.selectedItemcpdt.Description,
                    locationid: $scope.selectedItem == null ? '' : $scope.selectedItem.ID,
                    courseid: $scope.selectedItemcpdt == null ? '' : $scope.selectedItemcpdt.CPDTypeId,
                    coursename: $scope.coursename
                }
                $scope.funcsearch({ query: filter });
            }

            $scope.Clear = function () {
                $scope.curdate = '';
                $scope.selectedItem = null;
                $scope.selectedItemcpdt = null;
                $scope.coursename = '';
                //$scope.funcclear();

                var filter = {
                    curdate: $scope.curdate,
                    location: $scope.selectedItem == null ? '' : $scope.selectedItem.Name,
                    coursetype: $scope.selectedItemcpdt == null ? '' : $scope.selectedItemcpdt.Description,
                    locationid: $scope.selectedItem == null ? '' : $scope.selectedItem.ID,
                    courseid: $scope.selectedItemcpdt == null ? '' : $scope.selectedItemcpdt.CPDTypeId,
                    coursename: $scope.coursename
                }
                $scope.funcclear({ query: filter });
            }

        }
    }
};

icecore.directive("searchContent", searchcontent);



var tablelist = function () {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            url: '@',
            config: '=',
            paging: '=',
            pagefunc: '&',
            sortfunc: '&',
            actionfunc: '&'
        },
        template: '<div ng-include="getContentUrl()"></div>',
        link: function ($scope, element, attrs) {

            $scope.order = true;

            $scope.getContentUrl = function () {
                return $scope.url;
            }

            $scope.expand = false;

            $scope.selectPage = function (page) {

                $scope.pagefunc({ page: page });
            }

            $scope.sort = function (column) {
                // means asc
                $scope.order = !$scope.order;
                $scope.sortfunc({ column: column, order: $scope.order });
            }

            $scope.Bubblevent = function (arg, row) {

                $scope.actionfunc({ arg: arg, row: row });
            }

        }
    }
};

icecore.directive("tableList", tablelist);

function utilityservice() {

    var _obj = {};

    this.setservice = function (obj) {
        obj = obj || {};
        _obj = obj
    }

    this.getservice = function () {
        return _obj;
    }

}

icecore.service("utilityservice", utilityservice);

var listActions = function ($state, $mdDialog, $timeout, utilityservice, $modal) {
    return {
        restrict: 'EA',
        scope: {
            config: '=',
            data: '=?'
        },
        link: function (scope, element, attrs) {
            scope.showcoursedetail = function () {
                var obj = {
                    membernumber: scope.data.MemberNumber,
                    memberid: scope.data.MemberId,
                    userid: scope.data.UserId
                }
                utilityservice.setservice(obj);

                $state.go('CPDRECORD');
            };

            scope.register = function () {
                var obj = {
                    membernumber: scope.data.MemberNumber,
                    memberid: scope.data.MemberId,
                    userid: scope.data.UserId
                }
                utilityservice.setservice(obj);

                $state.go('MYCPD');
            }

            scope.showsnapshot = function (ev) {

                var modalInstance = $modal.open({
                    templateUrl: 'app/member.admin/templates/member_snapshot.html',
                    controller: DialogController
                });


            };


            scope.viewcourse = function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/library/templates/course_snapshot.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                    .then(function (answer) {

                    }, function () {

                    });
            };

            scope.showcontactus = function () {

                var modalInstance = $modal.open({
                    templateUrl: 'app/lib/contactus/contactus_partial_member.html',
                    controller: ContactDialogController,
                });
            };

            function ContactDialogController($scope, $modalInstance, $window, $http, toastr) {

                $scope.Email = scope.data.Email;

                $scope.hide = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.close();
                };


                $scope.Contactus = function () {

                    var data = {

                        Email: $scope.Email,
                        Subject: $scope.Subject,
                        MembershipNumber: scope.data.MemberNumber,
                        Query: $scope.Query

                    };

                    $http.post(serviceBase + 'api/contact/ContactMember', data, null)
                        .then(
                        function (response) {
                            toastr.success('Query Sent.', 'Success');
                            $modalInstance.close();
                        },
                        function (response) {
                            toastr.error('Feedback failed. Try again.', 'Error');
                            $modalInstance.close();
                        }
                        );
                }
            }


            function DialogController($scope, $modalInstance) {

                $scope.hide = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.close();
                };

                $scope.labels = ["CPD Hours Recorded", "CPD Hours Remaining"];
                var totalrecorded = parseFloat(scope.data.TotalRecorded);
                var cpdhours = config.SETTINGS.CPDHOURS;
                var left = cpdhours - totalrecorded;
                if (left < 0) {
                    left = 0;
                }
                $scope.data = [totalrecorded, left];
                $scope.colors = ['#46BFBD', '#bc4b4b'];
                $scope.username = scope.data.username;
                $scope.email = scope.data.Email;
                $scope.Status = scope.data.Status;

            }
        },
        templateUrl: 'app/lib/tablelist/list-actions.html',
    }

};

icecore.directive("listAction", listActions);


icecore.service("communicationservice", communicationservice);
communicationservice.$inject = ["$q", "$http"];

function communicationservice($q, $http) {

    this.get = function (url, data) {

        var deferred = $q.defer();

        $http.get(url, data, null)
            .then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);
            }
            );
        return deferred.promise;
    }

    this.post = function (url, data) {

        var deferred = $q.defer();

        $http.post(url, data, null)
            .then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);
            }
            );

        return deferred.promise;

    }

    this.put = function (url, data) {

        var deferred = $q.defer();

        $http.put(url, data, null)
            .then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);
            }
            );

        return deferred.promise;

    }

};

icecore.directive('editCustomDialog', [function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            itemurl: '@'
        },
        link: function (scope, element, attributes) {
            scope.$watch('model.visible', function (newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');

                scope.getContentUrl = function () {
                    return scope.itemurl;
                }
            });

            element.on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.model.visible = true;
                });
            });

            element.on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.model.visible = false;
                });
            });

        },
        //templateUrl: 'app/cpdclassroom/templates/course_snapshot.html',
        template: '<div ng-include="getContentUrl()"></div>'
    };
}]);

icecore.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);



    icecore.filter('dateformat', function ($filter) {
        return function (input) {
            if (input == null) { return "na"; }

            var _date = $filter('date')(new Date(input), 'MMM dd yyyy');

            return _date;

        };
    });

    icecore.directive('tooltip', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).hover(function () {
                    // on mouseenter
                    $(element).tooltip('show');
                }, function () {
                    // on mouseleave
                    $(element).tooltip('hide');
                });
            }
        };
    });

icecore.directive('validFile', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ngModel) {
            //change event is fired when file is selected
            el.bind('change', function () {
                scope.$apply(function () {
                    ngModel.$setViewValue(el.val());
                    ngModel.$render();
                });
            });
        }
    }
    });





icecore.directive('myDatePicker', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelController) {

            // Private variables
            var datepickerFormat = 'dd/mm/yyyy',
                momentFormat = 'DD/MM/YYYY',
                datepicker,
                endDateValue = "+5y",
                elPicker;

            if (attrs.endDate) {
                endDateValue = attrs.endDate;
            }

            // endDate = scope.$eval(attrs.endDate);
            // Init date picker and get objects 
            var parent = element.parent();
            datepicker = element.datepicker({
                autoclose: true,
                keyboardNavigation: false,
                todayHighlight: true,
                format: datepickerFormat,
                endDate: endDateValue,
                startDate:"-3y"
            });

            var component = element.siblings('[data-toggle="datepicker"]');
            if (component.length) {
                component.on('click', function () {
                    element.trigger('focus');
                });
            }


            elPicker = datepicker.data('datepicker').picker;

            // Adjust offset on show
            datepicker.on('show', function (evt) {
                elPicker.css('left', parseInt(elPicker.css('left')) + +attrs.offsetX);
                elPicker.css('top', parseInt(elPicker.css('top')) + +attrs.offsetY);
            });

            // Only watch and format if ng-model is present 
            if (ngModelController) {
                // So we can maintain time
                var lastModelValueMoment;

                ngModelController.$formatters.push(function (modelValue) {
                    //
                    // Date -> String
                    //

                    // Get view value (String) from model value (Date)
                    var viewValue,
                        m = moment(modelValue);
                    if (modelValue && m.isValid()) {
                        // Valid date obj in model
                        lastModelValueMoment = m.clone(); // Save date (so we can restore time later)
                        viewValue = m.format(momentFormat);
                    } else {
                        // Invalid date obj in model
                        lastModelValueMoment = undefined;
                        viewValue = undefined;
                    }

                    // Update picker
                    element.datepicker('update', viewValue);

                    // Update view
                    return viewValue;
                });

                ngModelController.$parsers.push(function (viewValue) {
                    //
                    // String -> Date
                    //

                    // Get model value (Date) from view value (String)
                    var modelValue,
                        m = moment(viewValue, momentFormat, true);
                    if (viewValue && m.isValid()) {
                        // Valid date string in view
                        if (lastModelValueMoment) { // Restore time
                            m.hour(lastModelValueMoment.hour());
                            m.minute(lastModelValueMoment.minute());
                            m.second(lastModelValueMoment.second());
                            m.millisecond(lastModelValueMoment.millisecond());
                        }
                        modelValue = m.toDate();
                    } else {
                        // Invalid date string in view
                        modelValue = undefined;
                    }

                    // Update model
                    return modelValue;
                });

                datepicker.on('changeDate', function (evt) {
                    // Only update if it's NOT an <input> (if it's an <input> the datepicker plugin trys to cast the val to a Date)
                    if (evt.target.tagName !== 'INPUT') {
                        ngModelController.$setViewValue(moment(evt.date).format(momentFormat)); // $seViewValue basically calls the $parser above so we need to pass a string date value in
                        ngModelController.$render();
                    }
                });
            }

        }
    };
});






return icecore;
       });




