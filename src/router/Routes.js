import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "../components/Home/Home"
import AddPersonContainer from "../components/People/AddPersonContainer";
import People from "../components/People/PeopleIndex"
import PersonDetail from "../components/People/PersonDetail";

export const Routes = () => (
	<Switch>
		<Route exact path="/" component={Home}/>
		<Route path="/people/detail/:id" component={PersonDetail}/>
		<Route path="/people/edit/:id" component={AddPersonContainer}/>
		<Route path="/people/add" component={AddPersonContainer}/>
		<Route path="/people" component={People}/>
		<Route component={()=><p>404</p>}/>
	</Switch>
);