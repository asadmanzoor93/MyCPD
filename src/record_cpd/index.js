import React from "react";
import Header from '../_components/header.js';
import DashboardList from '../dashboard/list.js';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class RecordCPD extends React.Component {
    render () {
        const columns = [{
            Header: 'course',
            accessor: 'course' // String-based value accessors!
        }, {
            Header: 'location',
            accessor: 'location'
        }, {
            Header: 'descrption',
            accessor: 'descrption'
        }];
        return (
            <div>
                <Header />
                <div className="container main-content">
                    <div className="row">
                        <h2 className="page-header">Record CPD</h2>
                    </div>
                </div>

            </div>
        );
    }
}

export default RecordCPD;