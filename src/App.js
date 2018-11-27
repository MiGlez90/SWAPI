import React, {Component} from 'react';
import {Routes} from "./router/Routes";
import './App.css';
import {NavBar} from "./components/Common/NavBar/NavBar";

class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="b-main-container">
                    <Routes/>
                </div>
            </div>
        );
    }
}

export default App;
