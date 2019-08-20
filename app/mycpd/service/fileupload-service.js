define(['app/app',
    'loadash',
    'app/configenum/config-enum',
], function (app, _,configenum) {
    'use strict';

    app.register.service('fileuploadsvc', ['$http', 'toastr', function ($http, toastr) {

            var _membercpd = {};
            var _file;
            var _fileUploaded = false;

            this.setmembercpd = function (membercpd) {
                membercpd = membercpd;
            }

            this.getmembercpd = function () {
                return _membercpd;
            }

            this.uploadFileToUrl = function (file, uploadUrl, workflowreqid, CPDQueueId) {
                var fd = new FormData();
                fd.append('file', file);
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined, 'workflowreqid': workflowreqid, 'CPDQueueId': CPDQueueId }
                }).then(successCallback, errorCallback);
            }

            function successCallback(response) {
                _fileUploaded = true;
                //toastr.success('File Uploaded successfully', 'Success');
            }
            function errorCallback(error) {
                toastr.error('An error occurred while uploading the file', 'Error');
            }

            this.savefile = function (file) {
                _file = file;
            }

            this.getfile = function () {
                return _file;
            }

            this.fileUploaded = function () {
                return _fileUploaded;
            }

            


        }]);

   
});