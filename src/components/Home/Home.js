import React, {Component} from "react";
import {Link} from "react-router-dom"

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className="container">
				<div style={{marginTop:"45%"}} className="jumbotron">
					<h1 className="display-4">This is the Home page</h1>
					<p className="lead">Nothing to see here.</p>
					<hr className="my-4"/>
					<p className="lead">
						<Link to="/people/" className="btn btn-dark">Go to People page</Link>
					</p>
				</div>
			</div>
		)
	}
}

export default Home;