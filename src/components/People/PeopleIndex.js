import React from 'react';
import {PeopleRepository} from "../../api/PeopleRepository";
import {SectionTitle} from "../Common/SectionTitle/SectionTitle";
import {Card} from "../Common/Card/Card";
import {Loader} from "../Common/Loader/Loader";
import {Utilities} from "../../utils/Utilities";
import classNames from "./PeopleStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class PeopleIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			people: [],
			fetch: false
		}
		this.height = 142;
	}

	componentDidMount() {
		PeopleRepository
			.getPeople()
			.then(people => {
				this.setState({people, fetch: true})
			}).catch(e => {
			console.error(e);
		})
	}

	goToAddPersonComponent = (event) => {
		event.preventDefault();
		this.props.history.push("/people/add");
	};

	render() {
		const {people = [], fetch} = this.state;
		this.numberOfRows = 4;
		let peopleCard = Utilities.distributeDataInBsRows(people, this.numberOfRows);
		const mdCol = Math.round( 12 / this.numberOfRows );
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
									className="btn btn-dark text-uppercase">
									Add New Person <FontAwesomeIcon icon="plus"/>
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
												styleImage={{height: this.height}}
												title={person.name}
												text={`My name is ${person.name} I'm from ${person.homeworld.name}`}
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