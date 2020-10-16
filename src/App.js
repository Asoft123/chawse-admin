import React from "react";

import "./App.css";
import Header from "./components/Header/Header";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Header>
                        <Route exact path="/" component={Dashboard} />
                    </Header>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
