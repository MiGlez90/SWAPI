import React, {Component, Fragment} from "react";
import {PeopleRepository} from "../../api/PeopleRepository";
import {Loader} from "../Common/Loader/Loader";
import {SectionTitle} from "../Common/SectionTitle/SectionTitle";
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
		PeopleRepository.getPerson(id)
						.then(person => {
							console.log(person);
							this.setState({person, isFetched: true});
						})
						.catch(console.error)
	}

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
										<h5 className="card-title">{person.name}</h5>
										<div className="row">
											<div className="col-4">
												<img className="img-fluid img-thumbnail" src={person.image}
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
							<div className="col-12">
								{/* Start card */}
								<div className="card text-white bg-dark mb-3 card--margin">
									<div className="card-header">Films</div>
									<div className="card-body">
										<h5 className="card-title">He has participated in</h5>
										<ul>
											{
												person.films
												? person.films.map((film, key) => <li key={key}>{film.title}</li>)
												: <li>No films</li>
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
							<div className="col-12">
								{/* Start card */}
								<div className="card text-white bg-dark mb-3 card--margin">
									<div className="card-header">Species</div>
									<div className="card-body">
										<h5 className="card-title">He belongs to this species</h5>
										<ul>

										</ul>
									</div>
								</div>
								{/*End card*/}
							</div>
						</div>
						{/*End row card */}
						{/*Begin row card */}
						<div className="row">
							<div className="col-12">
								{/* Start card */}
								<div className="card text-white bg-dark mb-3 card--margin">
									<div className="card-header">Vehicles</div>
									<div className="card-body">
										<h5 className="card-title">He can drive</h5>
										<ul>

										</ul>
									</div>
								</div>
								{/*End card*/}
							</div>
						</div>
						{/*End row card */}
						{/*Begin row card */}
						<div className="row">
							<div className="col-12">
								{/* Start card */}
								<div className="card text-white bg-dark mb-3 card--margin">
									<div className="card-header">Starships</div>
									<div className="card-body">
										<h5 className="card-title">He can pilot</h5>
										<ul>

										</ul>
									</div>
								</div>
								{/*End card*/}
							</div>
						</div>
						{/*End row card */}
					</div>
				}
			</Fragment>
		)
	}
}


export default PersonDetail;