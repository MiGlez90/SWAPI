import React, {Component, Fragment} from "react";
import {Input} from "../Common/Input/Input";
import {SectionTitle} from "../Common/SectionTitle/SectionTitle";
import {Select} from "../Common/Select/Select";
import {PeopleRepository} from "../../api/PeopleRepository";
import {PlanetsRepository} from "../../api/PlanetsRepository";
import {FirestoreFunctions} from "../../api/FirestoreBaseAPI";
import db from "../../api/Firestore";

class AddPersonContainer extends Component {
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
			planets: []
		};
	}

	componentDidMount() {
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

	onSubmit = (e) => {
		e.preventDefault();
		// @TODO Guardar referencia y no objeto de homeworld
		let person = JSON.parse(JSON.stringify(this.state.person));
		person.homeworld = this.state.planets.filter(planet => planet.id === person.homeworld)[0];
		console.log(person);
		PeopleRepository
			.addPerson(person)
			.then((person) => {
				console.log(person);
				this.props.addPerson(person);
			})
			.catch(error => {
				console.error(error);
			});
	};

	onChange = (event) => {
		this.updatePerson(event.target.name, event.target.value);
	};

	onSelectChange = (event) => {
		const name = event.target.dataset["selectName"];
		this.updatePerson(name, event.target.value);
	};

	updatePerson = (name, value) => {
		const person = Object.assign({}, this.state.person);
		person[name] = value;
		this.setState({person});
	};

	render() {
		const {person, planets = []} = this.state;
		const planetsOptions = planets.map(planet => ({value: planet.id, label: planet.name}));
		const {id} = this.props.match.params;
		const sectionTitle = !id ? "Add new person" : "Edit person";
		const submitButton = !id ? "Save" : "Edit";
		const labels = {sectionTitle, submitButton};
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
								placeholder="Jan Solo"
								required={true}
							/>
						</div>
						<div className="col-md-6">
							<Input
								label="BOD"
								type="date"
								className="form-control"
								id="birth_year"
								name="birth_year"
								onChange={this.onChange}
								value={person["birth_year"]}
								aria-describedby="birth_year"
								placeholder="19BBY"
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
								placeholder="Blond"
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
								placeholder="Blue"
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
								placeholder="Fair"
							/>
						</div>
						<div className="col-md-6">
							<Input
								label="Mass"
								type="number"
								className="form-control"
								id="mass"
								name="mass"
								onChange={this.onChange}
								value={person["mass"]}
								aria-describedby="mass"
								placeholder="45 kg"
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<Input
								label="Height"
								type="number"
								className="form-control"
								id="height"
								name="height"
								onChange={this.onChange}
								value={person["height"]}
								aria-describedby="height"
								placeholder="150 (cm)"
							/>
						</div>
						<div className="col-md-6">
							<Select
								label="Gender"
								rootStyle={selectStyle}
								onChange={this.onSelectChange}
								value={person["gender"]}
								options={options}
								data-select-name="gender"
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<Select
								label="Home"
								rootStyle={selectStyle}
								onChange={this.onSelectChange}
								value={person["homeworld"]}
								options={planetsOptions}
								data-select-name="homeworld"
							/>
						</div>
					</div>
					<div className="row row--margin-top">
						<div className="col-md-6"/>
						<div className="col-3">
							<button
								type="submit"
								className="btn btn-block btn-starwars text-uppercase"
								onClick={this.goBackToHistory}>
								Cancel
							</button>
						</div>
						<div className="col-3">
							<button
								type="submit"
								className="btn btn-block btn-starwars text-uppercase">
								{labels.submitButton}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const options = [
	{value: "male", label: "Male"},
	{value: "n/a", label: "N/A"},
	{value: "female", label: "Female"},
];

const selectStyle = {
	marginTop: 30
};

export default AddPersonContainer;