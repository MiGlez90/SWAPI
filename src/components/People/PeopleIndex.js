import React from 'react';
import {PeopleRepository} from "../../api/PeopleRepository";
import {SectionTitle} from "../Common/SectionTitle/SectionTitle";
import {Card} from "../Common/Card/Card";
import {Loader} from "../Common/Loader/Loader";
import {Utilities} from "../../utilities/Utilities";
import classNames from "./PeopleStyles.module.css";

class PeopleIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			people: [],
			fetch: false
		}
	}

	componentDidMount() {
		PeopleRepository
			.getPeople()
			.then(people => {
				console.log(people);
				this.setState({people, fetch: true})
			}).catch(e => {
			console.error(e);
		})
	}

	goToAddPersonComponent = (event) => {
		event.preventDefault();
		this.props.history.push("people/add");
	};

	render() {
		const {people = [], fetch} = this.state;
		const originalLength = people.length;
		this.numberOfRows = 2;
		let peopleCard = Utilities.distributeDataInBsRows(people, this.numberOfRows);
		const mdCol = Math.ceil(originalLength / this.numberOfRows);
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
						<div className="row">
							<div className="col-12">
								<button
									onClick={this.goToAddPersonComponent}
									className="btn btn-starwars text-uppercase">
									Add New Person
								</button>
							</div>
						</div>
						{peopleCard.map((row, key) => (
							<div key={key} className={`row ${classNames["row--margin-top"]}`}>
								{
									row.map((person, key) => (
										person &&
										<div key={key} className={"col-md-" + mdCol}>
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