define(['app/app',
    'app/configenum/config-enum'
], function (app, configenum) {
    'use strict';
    app.register.controller('cpdgoCtrl', ['$scope', '$modal', '$http', function ($scope, $modal, $http) {

        var vm = this;


        function loadMemberInfoData() {
            $http.get(configenum.USER.GETMEMBERINFO + '?memID=').then(successMemberInfoCallback, errorCallback);
        }

        function successMemberInfoCallback(response) {
            vm.ExternalRef = "ATI" + response.data.MemberId;
            return vm.memberInfo = response.data;
        }

        function errorCallback(error) {
            return "Call Failed " + error.status;
        }

        loadMemberInfoData();

        vm.confirm = function (provider) {
            return $http({ method: "GET", url: configenum.USER.CPDGOLOG + '?action=' + provider + "&isBrowser=true" }).then(function (response) {
                return response.data;
            });
        };

        vm.excelClub = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'app/cpdgo/templates/excelclub-model.html',
                controller: ModalPopupCtrl,
                size: size,
                windowClass: 'app-modal-window'
            });
        };


        vm.playVideo = function (size) {

            vm.confirm('ProfessionalEthics');
            var getVideoTime = GetPauseVideoTime();

            var modalInstance = $modal.open({
                templateUrl: 'app/cpdgo/templates/playvideo-model.html',
                controller: ModalVideoPopupCtrl,
                size: size,
                windowClass: 'app-modal-window-medium',
                resolve: {

                    getVideoTime: function () {
                        return getVideoTime;
                    }
                }



            });

            modalInstance.result.then(function () {
                stopVideo();
                //Get triggers when modal is closed
            }, function () {
                //gets triggers when modal is dismissed.
                stopVideo();
                modalInstance.close();
            });

            function GetPauseVideoTime() {
                return $http({ method: "GET", url: configenum.USER.GETPAUSEVIDEOTIME }).then(function (response) {
                    return response.data;
                });
            }

            function SavePauseVideoTime(pauseTime) {
                return $http({ method: "GET", url: configenum.USER.SAVEPAUSEVIDEOTIME + '?pauseTime=' + pauseTime }).then(function (response) {
                    return response.data;
                });
            }


            function stopVideo() {
                var video1 = document.getElementById("cpdvideo1");
                video1.pause();
                //alert(video1.currentTime);
                SavePauseVideoTime(video1.currentTime);
            }


        };

        vm.nelsonCroom = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'app/cpdgo/templates/nelson-model.html',
                controller: ModalPopupCtrl,
                size: size,
                windowClass: 'app-modal-window'
            });
        };

        vm.knowledgepoint = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'app/cpdgo/templates/knowledgepoint-model.html',
                controller: ModalPopupCtrl,
                size: size
            });
        };


        vm.professionalEthics = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'app/cpdgo/templates/professionalEthicsInfo-model.html',
                controller: ModalPopupCtrl,
                size: size
            });
        };



        var ModalPopupCtrl = function ($scope, $modalInstance) {

            $scope.cancel = function () {
                if ($modalInstance)
                    $modalInstance.close();
            };

        }


        var ModalVideoPopupCtrl = function ($scope, $modalInstance, getVideoTime) {

            $scope.cancel = function () {
                if ($modalInstance)
                    $modalInstance.close();
            };



            $scope.getData = function () {

                var videoTime = getVideoTime// GetPauseVideoTime();
                var vid = document.getElementById("cpdvideo1");


                vid.onplay = function () {
                    var pauseTime = 0;
                    if (videoTime) {

                        pauseTime = videoTime.PauseTime;
                    }

                    vid.currentTime = pauseTime;
                };
            }


        };

    }]);
});