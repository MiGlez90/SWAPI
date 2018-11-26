import React, {Component} from 'react';
import PeopleIndex from "./components/People/PeopleIndex";
import './App.css';
import {NavBar} from "./components/Common/NavBar/NavBar";

class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="b-main-container">
                    <PeopleIndex/>
                </div>
            </div>
        );
    }
}

export default App;
