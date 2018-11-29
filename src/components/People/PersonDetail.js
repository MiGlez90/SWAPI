import React, {Component, Fragment} from "react";
import {PeopleRepository} from "../../api/PeopleRepository";
import {Loader} from "../Common/Loader/Loader";
import {DetailField} from "./DetailField";
import "./PersonDetailStyles.css";

class PersonDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			person: {},
			isFetched: false
		}
	}

	componentDidMount() {
		const {id} = this.props.match.params;
		PeopleRepository
			.getPerson(id)
			.then(person => {
				console.log(person);
				this.setState({person, isFetched: true});
			})
			.catch(console.error)
	}

	goToEditComponent = () => {
		const {id} = this.props.match.params;
		this.props.history.push("/people/edit/" + id)
	};

	deletePerson = () => {
		const isSure = window.confirm("Are you sure you want to delete it?");
		if (isSure) {
			const id = (this.state.person.id);
			PeopleRepository
				.removePerson(id)
				.then(response => {
					alert(response);
					this.props.history.push("/people/")
				})
				.catch(error => {
					console.error(error);
					alert("Opps something was wrong");
					this.props.history.push("/people/")
				})

		}

	};

	render() {
		const {isFetched, person} = this.state;
		return (
			<Fragment>
				{
					!isFetched
					?
					<Loader/>
					:
					<div className="container">
						{/*Begin row card */}
						<div className="row">
							<div className="col-12">
								{/* Start card */}
								<div className="card text-white bg-dark mb-3 card--margin">
									<div className="card-header">Personal Information</div>
									<div className="card-body">
										<h5 className="card-title">{person.name} from {person.homeworld.name}</h5>
										<div className="row">
											<div className="col-4">
												<img className="img-fluid img--highlighted" src={person.image}
													 alt={person.name}/>
											</div>
											<div className="col-7 offset-1">
												<div className="row">
													<div className="col-6">
														<DetailField
															title="Birth date"
															value={person["birth_year"]}
														/>
													</div>
													<div className="col-6">
														<DetailField
															title="Gender"
															value={person["gender"]}
														/>
													</div>
												</div>
												<div className="row">
													<div className="col-6">
														<DetailField
															title="Eye color"
															value={person["eye_color"]}
														/>
													</div>
													<div className="col-6">
														<DetailField
															title="Hair color"
															value={person["hair_color"]}
														/>
													</div>
												</div>
												<div className="row">
													<div className="col-6">
														<DetailField
															title="Height"
															value={person["height"] + "cm"}
														/>
													</div>
													<div className="col-6">
														<DetailField
															title="Mass"
															value={person["mass"] + " kg"}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/*End card*/}
							</div>
						</div>
						{/*End row card */}
						{/*Begin row card */}
						<div className="row">
							<div className="col-6">
								{/* Start card */}
								<div className="card text-white bg-dark mb-3 card--margin card--height">
									<div className="card-header">Films</div>
									<div className="card-body">
										<ul>
											{
												person.films.length > 0
												? person.films.map((film, key) => <li key={key}>{film.title}</li>)
												: <li>No films</li>
											}
										</ul>
									</div>
								</div>
								{/*End card*/}
							</div>
							<div className="col-6">
								{/* Start card */}
								<div className="card text-white bg-dark mb-3 card--margin card--height">
									<div className="card-header">Species</div>
									<div className="card-body">
										<ul>
											{
												person.species.length > 0
												? person.species.map((specie, key) => <li key={key}>{specie.name}</li>)
												: <li>No species</li>
											}
										</ul>
									</div>
								</div>
								{/*End card*/}
							</div>
						</div>
						{/*End row card */}
						{/*Begin row card */}
						<div className="row">
							<div className="col-6">
								{/* Start card */}
								<div className="card text-white bg-dark mb-3 card--margin card--height">
									<div className="card-header">Vehicles</div>
									<div className="card-body">
										<ul>
											{
												person.vehicles.length > 0
												? person.vehicles.map((vehicle, key) => <li
													key={key}>{vehicle.name}</li>)
												: <li>No vehicles</li>
											}
										</ul>
									</div>
								</div>
								{/*End card*/}
							</div>
							<div className="col-6">
								{/* Start card */}
								<div className="card text-white bg-dark mb-3 card--margin card--height">
									<div className="card-header">Starships</div>
									<div className="card-body">
										<ul>
											{
												person.starships.length > 0
												? person.starships.map((starship, key) => <li
													key={key}>{starship.name}</li>)
												: <li>No starships</li>
											}
										</ul>
									</div>
								</div>
								{/*End card*/}
							</div>
						</div>
						{/*End row card */}
						<div className="row">
							<div className="col-12">
								<div className="card text-white bg-dark mb-3 card--margin">
									<div className="card-header">Actions</div>
									<div className="card-body">
										<div className="row">
											<div className="col-8"/>
											<div className="col-2">
												<button
													className="btn btn-danger btn--full-width text-uppercase"
													onClick={this.deletePerson}>
													Delete
												</button>
											</div>
											<div className="col-2">
												<button
													className="btn btn-info btn--full-width text-uppercase"
													onClick={this.goToEditComponent}>
													Edit
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			</Fragment>
		)
	}
}


export default PersonDetail;