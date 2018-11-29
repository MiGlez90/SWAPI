import React from "react";
import {Switch, Route} from "react-router-dom";
import {Page404} from "../components/Common/404/Page404";
import Home from "../components/Home/Home"
import AddEditPersonForm from "../components/People/AddEditPersonForm";
import People from "../components/People/PeopleIndex"
import PersonDetail from "../components/People/PersonDetail";

export const Routes = () => (
	<Switch>
		<Route exact path="/" component={Home}/>
		<Route path="/people/detail/:id" component={PersonDetail}/>
		<Route path="/people/edit/:id" component={AddEditPersonForm}/>
		<Route path="/people/add" component={AddEditPersonForm}/>
		<Route path="/people" component={People}/>
		<Route component={Page404}/>
	</Switch>
);