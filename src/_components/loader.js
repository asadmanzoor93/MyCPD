import React from "react";

class Loader extends React.Component {
  render () {
    return (
		<div className="text-center" style={{ marginBottom: '10px' }}>
			<span>Loading...</span>
			<i className="fa fa-refresh fa-spin fa-3x fa-fw" style={{ verticalAlign: 'middle' }}></i>
		</div>
    );
  }
}

export default Loader;
