import React from "react";

import "./App.css";
import Header from "./components/Header/Header";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { CssBaseline } from "@material-ui/core";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Rent from "./pages/Rents/Rent";
import Sale from "./pages/Sale/Sale";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <Router>
      <CssBaseline />
      <div className="App">
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Header exact>
            <Route exact path="/sale" component={Sale} />
            <Route exact path="/rent" component={Rent} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/" component={Dashboard} />
          </Header>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
