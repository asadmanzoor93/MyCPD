define([],
    function () {
        'use strict'
         var url = 'http://34.248.242.178/CPDCompliance/';
        var baseURL = url + 'api/';

        var atiURL = 'http://34.248.242.178/ATI_Portal_Test/Index.aspx';

        var configenum = {

            ADMIN: {

                CPDAUDIT: baseURL + 'CPDAudit',
                CPDADMIN: baseURL + 'Library',
                CPDADMINADDCOURSE: baseURL + 'Library/Add',
                CPDADMINUPDATECOURSE: baseURL + 'Library/Update',
                CPDREPORT: baseURL + 'CPDAccredited',
                CPDMEMBER: baseURL + 'member/GetMemberCPDAll',
                CPDACCREDITED: baseURL + 'approvedcpdq',
                CPDACCREDITEDAR: baseURL + 'approvedcpdq/CPDUpdate',
                CPDACCRDFDOWNLOAD: baseURL + 'approvedcpdq/file/download',
                CPDRANDCOMPLAIANCEREPORT: baseURL + 'report/ReportRandomCompliantCPD',
                CPDINDIVIDUALREPORT: baseURL + 'report/ReportIndividualMemberCPD',
                CPDCOMPLAIANCEREPORT: baseURL + 'report/ReportCompliantMembersCPD',
                REPORTDOWNLOAD: baseURL + 'report/file/download',
                INDIVIDUALUSEREXCEL: baseURL + 'report/IndividualUserExcel',
                COMPLIANTEXCEL: baseURL + 'report/CompliantExcel',
                RANDOMCOMPLIANTEXCEL: baseURL + 'report/RandomCompliantExcel',
                CPDCOMPLIANTINFO: baseURL + 'report/CPDCompliantInfo',
                REPORTUSERLOGININFO: baseURL + 'report/ReportUserLoginInfo',
                USERLOGININFOEXCEL: baseURL + 'report/UserLoginInfoExcel',
                LOG: baseURL + 'log',
                GETHOST: baseURL + 'Lookup/getCPDHost',
                UPDATEHOST: baseURL + 'Lookup/updateHost',
                NUMBEROFCPDQUEUE: baseURL + 'approvedcpdq/NumberOfCPDQueue',
                GETUSERDETAILS: baseURL + 'UserManagement/GetUserDetails',
                UPDATEEXTERNALUSER: baseURL + 'UserManagement/UpdateExternalUser',
                RECORDEDZEROHOUR: baseURL + 'report/RecordedZeroHour',
                RECORDEDZEROHOUREXCEL: baseURL + 'report/RecordedZeroHourExcel',
                UPDATELOCKEDSTATUS: baseURL + 'report/UpdateLockedStatus',
            },
            USER: {

                FACETOFACE: baseURL + 'faceToface',
                MYCPD: baseURL + 'MyCPD',
                CPDRECORD: baseURL + 'CPDURecord',
                CPDLIBRARY: baseURL + 'Library',
                CPDGO: baseURL + 'CPDgo',
                APPROVEDCPD: baseURL + 'approvedcpd',
                MEMBERCPD: baseURL + 'Member/GetMemberCPD',
                MEMBERCPDHOURS: baseURL + 'Member/MemberCPDHours',               
                DELETEMEMBERCPD: baseURL + 'Workflow/DeleteMemberCPD',
                GETMEMBERINFO: baseURL + 'account/GetMember',
                WORKFLOWADD: baseURL + 'Workflow/add',
                WORKFLOWUPDATE: baseURL + 'Workflow/Update',
                FILEUPLOAD: baseURL + 'Workflow/file/upload',
                MEMBERCOMPLETEDCPDHOURS: baseURL + 'Member/CPDCourseHours',
                SHOWDECLARE: baseURL + 'Member/ShowDeclare',
                DECLARECPD: baseURL + 'Workflow/DeclareCPD',
                FACETOEXCEL: baseURL + 'faceToface/Excel',
                APPROVEDCPDEXCEL: baseURL + 'approvedcpd/Excel',
                CPDTYPE: baseURL + 'Lookup/CPDTypesForMyCPD',
                SHOWDECLAREGRACEPERIOD: baseURL + 'Member/ShowDeclareGracePeriod',
                CPDGOLOG: baseURL + 'CPDgo/CPDGOLog',
                GETPAUSEVIDEOTIME: baseURL + 'CPDgo/GetPauseVideoTime',
                SAVEPAUSEVIDEOTIME: baseURL + 'CPDgo/SavePauseVideoTime'
            },

            EXTUSER: {

                CPDACCREDITEADD: baseURL + 'approvedcpdq/CPDAdd',
                CPDACCREDITEUPDATE: baseURL + 'approvedcpdq/CPDURecord',
                FILEUPLOAD: baseURL + 'approvedcpdq/file/upload',
            },

            COMMON: {

                HOME: baseURL + 'member/CPDHome',
                CPDTYPE: baseURL + 'Lookup/CPDTypes',
                CONTACTUS: baseURL + 'contact',
                LOCATION: baseURL + 'Lookup/CPDLocation',
                HOST: baseURL + 'Lookup/CPDHost',
                CPDTYPES: baseURL + 'Lookup/CPDTypesearch',
                GETCOURSEBYID: baseURL + 'Lookup/GetCourse',
                GETCOURSESBYCPDTYPE: baseURL + 'Lookup/GetCourses',
                CPDLIBRARYEXCEL: baseURL + 'Library/Excel',
                CPDMEMBERPDF: baseURL + 'Member/PDF',
                GETTEMPID: baseURL + 'Account/GetTempId',
                CPDFORMAT: baseURL + 'Lookup/CPDFormat',
                COURSELOCATION: baseURL + 'Lookup/Location',
                LOADHOST: baseURL + 'Lookup/LoadCPDHost',
                GETEMPLOYERLIST: baseURL + 'Lookup/GetEmployerList',
                DOWNLOADPDF: baseURL + 'Member/DownloadPDF'
            },

            AUTH: {

                LOGIN: baseURL + 'Token',
                REGISTER: baseURL + 'Account/Register',
                ACCESSTOKEN: baseURL + 'Account/ObtainLocalAccessToken',

            },
            SETTINGS: {
                CPDHOURS: 8,
                SERVICEBASE: url,
                EXTERNALURL : atiURL,

            }            
        };

        return Object.freeze(configenum);
    });