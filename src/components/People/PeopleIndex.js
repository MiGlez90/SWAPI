import React from 'react';
import {PeopleRepository} from "../../api/PeopleRepository";
import AddPersonContainer from "./AddPersonContainer";
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
        PeopleRepository.getPeople()
            .then(people => {
                console.log(people);
                this.setState({people, fetch: true})
            }).catch(e => {
            console.error(e);
        })
    }

    render() {
        const {people = [], fetch} = this.state;

        let peopleCard = Utilities.distributeDataInBsRows(people, 3);

        return (
            <React.Fragment>
                {
                    !fetch ? <Loader/> :
                        <div className="container-fluid">
                            {peopleCard.map((row, key) => (
                                <div key={key} className={`row ${classNames["row--margin-top"]}`}>
                                    {
                                        row.map((person, key) => (
                                            person &&
                                            <div key={key} className="col-md-4">
                                                <Card
                                                    title={person.name}
                                                    text={person.gender}
                                                    anchor={{link: person.id, label: "Detalle"}}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            ))}
                        </div>
                }
                <AddPersonContainer people={this.state.people}/>
            </React.Fragment>
        );
    }
}

export default PeopleIndex;