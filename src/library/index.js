import React from "react";
import Header from '../_components/header.js';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class Library extends React.Component {
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
                        <h2 className="page-header">Library</h2>
                        <div className="gridTopButtons">
                            <button type="button" className="btn btn-danger btn-circle btn-lg ng-scope" tooltip="" ng-click="vm.print()" data-original-title="" title=""><i className="fa fa-print"></i></button>
                            <div className="btn-group" dropdown="" is-open="status.isopen">
                                <button type="button" className="btn btn-success  btn-lg dropdown-toggle">
                                    <i className="fa fa-file-excel-o"></i>
                                </button>
                            </div>
                        </div>
                        <ReactTable
                            data={[]}
                            columns={columns}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default Library;