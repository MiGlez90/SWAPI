import React, {Component} from "react";
import {Input} from "../Common/Input/Input";
import {Loader} from "../Common/Loader/Loader";
import {SectionTitle} from "../Common/SectionTitle/SectionTitle";
import {Select} from "../Common/Select/Select";
import {PeopleRepository} from "../../api/PeopleRepository";
import {PlanetsRepository} from "../../api/PlanetsRepository";
import db from "../../api/Firestore";

class AddEditPersonForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			person: {
				name: "",
				birth_year: "",
				gender: "male",
				eye_color: "",
				hair_color: "",
				skin_color: "",
				height: 0,
				mass: 0,
				homeworld: ""
			},
			homeWorldSelected: "",
			isPersonSet: false,
			planets: []
		};
	}

	setPerson = (id) => {
		PeopleRepository
			.getRawPerson(id)
			.then(response => {
				let person = response;
				console.log(person);
				const homeWorldSelected = person.homeworld.id;
				this.setState({person, homeWorldSelected, isPersonSet: true});
			})
			.catch(error => {
				console.error(error);
			})

	};

	componentDidMount() {
		this.id = this.props.match.params.id;
		if (this.id) {
			this.setPerson(this.id);
		} else {
			this.setState({isPersonSet: true})
		}
		PlanetsRepository
			.getPlanets()
			.then(planets => {
				let person = Object.assign({}, this.state.person);
				person.homeworld = planets[0].id;
				this.setState({planets, person});
			})
			.catch(console.error)
	}

	goBackToHistory = () => {
		this.props.history.goBack()
	};

	addPerson = (person) => {
		PeopleRepository
			.addPerson(person)
			.then((person) => {
				console.log(person);
				alert("Person added");
				this.props.history.push("/people/");
			})
			.catch(error => {
				alert("Oops something was wrong");
				console.error(error);
				this.props.history.push("/people/");
			});
	};

	editPerson = (person) => {
		console.log("Editing ... ", person);
		PeopleRepository
			.updatePerson(person.id, person)
			.then((person) => {
				console.log("Edited ... ", person);
				alert("Person edited");
				this.props.history.push("/people/");
			})
			.catch(error => {
				alert("Oops something was wrong");
				console.error(error);
				this.props.history.push("/people/");
			});

	};

	onSubmit = (e) => {
		e.preventDefault();
		let person = Object.assign({},this.state.person);
		person.homeworld = db.collection("planets").doc(this.state.homeWorldSelected);
		if (this.id) {
			this.editPerson(person)
		} else {
			this.addPerson(person)
		}

	};

	onChange = (event) => {
		this.updatePerson(event.target.name, event.target.value);
	};

	onSelectPersonChange = (event) => {
		const name = event.target.dataset["selectName"];
		this.updatePerson(name, event.target.value);
	};

	onSelectChange = (event) => {
		const name = event.target.dataset["selectName"];
		const value = event.target.value;
		this.setState({[name]: value});
	};

	updatePerson = (name, value) => {
		const person = Object.assign({}, this.state.person);
		person[name] = value;
		this.setState({person});
	};

	render() {
		const {person, planets = [], isPersonSet,homeWorldSelected} = this.state;
		const planetsOptions = planets.map(planet => ({value: planet.id, label: planet.name}));
		const id = this.id;
		const sectionTitle = !id ? "Add new person" : "Edit person";
		const submitButton = !id ? "Save" : "Edit";
		const labels = {sectionTitle, submitButton};
		if (isPersonSet) {
			return (
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<SectionTitle title={labels.sectionTitle}/>
						</div>
					</div>
					<form onSubmit={this.onSubmit}>
						<div className="row">
							<div className="col-md-6">
								<Input
									label="Name *"
									type="text"
									className="form-control"
									id="name"
									name="name"
									onChange={this.onChange}
									value={person.name}
									aria-describedby={person.name}
									placeholder="eg. Jan Solo"
									required={true}
								/>
							</div>
							<div className="col-md-6">
								<Input
									label="Birth year"
									type="text"
									className="form-control"
									id="birth_year"
									name="birth_year"
									onChange={this.onChange}
									value={person["birth_year"]}
									aria-describedby="birth_year"
									placeholder="eg. 19BBY"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<Input
									label="Hair color"
									type="text"
									className="form-control"
									id="hair_color"
									name="hair_color"
									onChange={this.onChange}
									value={person["hair_color"]}
									aria-describedby="hair_color"
									placeholder="eg. Blond"
								/>
							</div>
							<div className="col-md-6">
								<Input
									label="Eye color"
									type="text"
									className="form-control"
									id="eye_color"
									name="eye_color"
									onChange={this.onChange}
									value={person["eye_color"]}
									aria-describedby="eye_color"
									placeholder="eg. Blue"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<Input
									label="Skin color"
									type="text"
									id="skin_color"
									name="skin_color"
									onChange={this.onChange}
									value={person["skin_color"]}
									aria-describedby="skin_color"
									placeholder="eg. Fair"
								/>
							</div>
							<div className="col-md-6">
								<Input
									label="Mass (kg)"
									type="number"
									className="form-control"
									id="mass"
									name="mass"
									onChange={this.onChange}
									value={person["mass"]}
									aria-describedby="mass"
									placeholder="eg. 45 (kg)"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<Input
									label="Height (cm)"
									type="number"
									className="form-control"
									id="height"
									name="height"
									onChange={this.onChange}
									value={person["height"]}
									aria-describedby="height"
									placeholder="eg. 150 (cm)"
								/>
							</div>
							<div className="col-md-6">
								<Select
									label="Gender"
									rootStyle={marginTop}
									onChange={this.onSelectPersonChange}
									value={person["gender"]}
									options={options}
									data-select-name="gender"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6"/>
							<div className="col-md-6">
								<Select
									label="Home"
									rootStyle={marginTop}
									onChange={this.onSelectChange}
									value={homeWorldSelected}
									options={planetsOptions}
									data-select-name="homeWorldSelected"
								/>
							</div>
						</div>
						<div style={marginTop} className="row row--margin-top">
							<div className="col-md-6"/>
							<div className="col-3">
								<button
									type="submit"
									className="btn btn-block btn-outline-secondary btn btn-outline-secondary text-uppercase"
									onClick={this.goBackToHistory}>
									Cancel
								</button>
							</div>
							<div className="col-3">
								<button
									type="submit"
									className="btn btn-block btn-dark btn--full-width text-uppercase">
									{labels.submitButton}
								</button>
							</div>
						</div>
					</form>
				</div>
			);
		}else {
			return ( <Loader/> );
		}
	}
}

const options = [
	{value: "male", label: "Male"},
	{value: "n/a", label: "N/A"},
	{value: "female", label: "Female"},
];

const marginTop = {
	marginTop: 30
};

export default AddEditPersonForm;