import React from 'react';
import {PeopleRepository} from "../../api/PeopleRepository";
import {Routes} from "../../router/Routes";
import {SectionTitle} from "../Common/SectionTitle/SectionTitle";
import AddPersonContainer from "./AddPersonContainer";
import {Card} from "../Common/Card/Card";
import {Loader} from "../Common/Loader/Loader";
import {Utilities} from "../../utilities/Utilities";
import classNames from "./PeopleStyles.module.css";
import {Switch, Route} from "react-router-dom";

class PeopleIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			people: [],
			fetch: false
		}
	}

	componentDidMount() {
		PeopleRepository.getPeople()
						.then(people => {
							console.log(people);
							this.setState({people, fetch: true})
						}).catch(e => {
			console.error(e);
		})
	}

	addPerson = (person) => {
		this.setState(prevState => {
			let people = prevState.people.slice();
			people.push(person);
			return {
				people
			}
		});
	};

	render() {
		const {people = [], fetch} = this.state;

		let peopleCard = Utilities.distributeDataInBsRows(people, 3);

		return (
			<React.Fragment>
				{
					!fetch ? <Loader/> :
					<div className="container">
						<div className="row">
							<div className="col-12">
								<SectionTitle title="People"/>
							</div>
						</div>
						{peopleCard.map((row, key) => (
							<div key={key} className={`row ${classNames["row--margin-top"]}`}>
								{
									row.map((person, key) => (
										person &&
										<div key={key} className="col-md-4">
											<Card
												title={person.name}
												text={`My name is ${person.name}, I'm from ${person.homeworld.name}`}
												image={person.image}
												anchor={{link: "/people/detail/" + person.id, label: "Detail"}}
											/>
										</div>
									))
								}
							</div>
						))}
					</div>
				}
			</React.Fragment>
		);
	}
}

export default PeopleIndex;