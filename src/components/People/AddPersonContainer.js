import React, {Component} from "react";
import {Input} from "../Common/Input/Input";
import {Select} from "../Common/Select/Select";
import {PeopleRepository} from "../../api/PeopleRepository";
import {PlanetsRepository} from "../../api/PlanetsRepository";
import {FirestoreFunctions} from "../../api/FirestoreBaseAPI";
import db from "../../api/Firestore";
import {response} from "./temp";

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
        PlanetsRepository.getPlanets()
            .then(planets => {
                let person = Object.assign({},this.state.person);
                person.homeworld = planets[0].id;
                this.setState({planets, person});
            })
            .catch(console.error)
    }

    temp = () => {
        let results = response;

        const promises = [];
        for (let doc of results) {
            doc.films = doc.films.map(film => db.doc(film));
            doc.species = doc.species.map(specie => db.doc(specie));
            doc.vehicles = doc.vehicles.map(vehicle => db.doc(vehicle));
            doc.starships = doc.starships.map(starship => db.doc(starship));
            doc.homeworld = db.doc(doc.homeworld);
            promises.push(FirestoreFunctions.put("people", doc.id, doc));
        }

        Promise.all(promises).then(result => console.log(result)).catch(e => console.error(e))
    };

    onSubmit = (e) => {
        e.preventDefault();
        let person = JSON.parse(JSON.stringify(this.state.person));
        person.homeworld = this.state.planets.filter( planet => planet.id === person.homeworld)[0];
        PeopleRepository.addPerson(person)
            .then((person) => {
                console.log(person);
                this.props.addPerson(person);
            })
            .catch(error => {
                console.error(error);
            });

        // let results = [];
        //
        // const promises = [];
        // for(let doc of results){
        //     promises.push(addPerson(doc))
        // }
        //
        // Promise.all(promises).then( result => console.log(result)).catch(e => console.error(e))

        // e.preventDefault();
        // this.temp();

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
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container-fluid">
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
                    <div className="row">
                        <div className="col-md-6 col-md-offset-2">
                            <button type="submit" className="btn btn-block btn-starwars">Save</button>
                        </div>
                        <div className="col-md-4"/>
                    </div>
                </div>
            </form>
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