const dashboard_column = [{
    Header: 'Course Type',
    accessor: 'CPDTypeName',// String-based value accessors!
    filterMethod: (filter, row) =>
        row[filter.id].startsWith(filter.value) &&
        row[filter.id].endsWith(filter.value)
}, {
    Header: 'Completed Hours',
    accessor: 'Hours'
}, {
    Header: 'Completion Date',
    accessor: 'CompletionDate'
}, {
    Header: 'Venue',
    accessor: 'Venue'
}, {
    Header: 'Trainer',
    accessor: 'Trainer'
}, {
    Header: 'Host',
    accessor: 'HostId'
}, {
    Header: 'Start Date',
    accessor: 'StartDate'
}];

export default dashboard_column