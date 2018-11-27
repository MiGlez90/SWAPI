import React from "react";
import {Link} from "react-router-dom";

export const NavBar = () => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
		<Link to="/">
			<span className="navbar-brand">Star Wars React</span>
		</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
				aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			<div className="navbar-nav">
				<Link to="/">
					<span className="nav-item nav-link">Home </span>
				</Link>
				<Link to="/people">
					<span className="nav-item nav-link">People</span>
				</Link>
			</div>
		</div>
	</nav>
);