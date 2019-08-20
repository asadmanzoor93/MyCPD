define([],
    function () {
        'use strict'
        var namerecords = [
            {
                "reportid": "CPD0001",
                "reportname": "Individual User Report",
                "reportdescription": "Report per user",
                "View": ""

            },
            {
                "reportid": "CPD0002",
                "reportname": "Compliant Report",
                "reportdescription": "All declared users (<8h CPD and clicked Declare)",
                "View": ""

            },
            {
                "reportid": "CPD0003",
                "reportname": "Not Compliant User 2",
                "reportdescription": "Identify Users who have recorded some hours (but not 8)",
                "View": ""

            },
            {
                "reportid": "CPD0004",
                "reportname": "Random 10% Audit Report",
                "reportdescription": "Random Report of 10% of all Compliant users for audit purposes",
                "View": ""

            },
            {
                "reportid": "CPD0005",
                "reportname": "System Usage Report",
                "reportdescription": "Identify how many people have logged in",
                "View": ""

            },


            {
                "reportid": "CPD0006",
                "reportname": "Not Engaged Report",
                "reportdescription": "Identify Users Not Engaged ",
                "View": ""

            },

            {
                "reportid": "CPD0007",
                "reportname": "Not Compliant User 1",
                "reportdescription": "Identify Users who have recorded 0 hours ",
                "View": ""

            },

            //{
            //    "reportid": "CPD0008",
            //    "reportname": "0 hours Never Accessed System Report",
            //    "reportdescription": "All user who have never accessed the system and have 0 hours recorded",
            //    "View": ""

            //},

        ]
        return Object.freeze(namerecords);
    });
