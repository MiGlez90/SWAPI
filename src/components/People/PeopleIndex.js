import React from 'react';
import * as peopleAPI from "../../api/PeopleRepository";
import AddPersonContainer from "./AddPersonContainer";
import {Card} from "./Card";
import classNames from "./PeopleStyles.module.css";

class PeopleIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: []
        }
    }

    componentDidMount() {
        peopleAPI.getPeople()
            .then(people => {
                console.log(people);
                this.setState({people})
            }).catch(e => {
            console.error(e);
        })
    }

    render() {
        const {people = []} = this.state;

        let peopleCard = [];
        let row = [];
        let counter = 0;
        for (let i = 0; i < people.length; i++) {
            row.push(people[i]);
            counter++;
            if (counter === 3) {
                counter = 0;
                peopleCard.push(row);
                row = [];
            }
        }

        return (
            <React.Fragment>
                <div className="container-fluid">
                    {
                        peopleCard.map(row => (
                            <div className={`row ${classNames["row--margin-top"]}`}>
                                {
                                    row.map(person => (
                                        <div className="col-md-4">
                                            <Card
                                                title={person.name}
                                                text={person.gender}
                                                anchor={{link: person.id, label: "Detalle"}}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                <AddPersonContainer people={this.state.people}/>
            </React.Fragment>
        );
    }
}

export default PeopleIndex;