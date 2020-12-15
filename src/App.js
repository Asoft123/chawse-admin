import React from "react";

import "./App.css";
import Header from "./components/Header/Header";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import CssBaseline from "@material-ui/core/CssBaseline";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Rent from "./pages/Rents/Rent";
import Sale from "./pages/Sale/Sale";
import SignUp from "./pages/SignUp/SignUp";
import LandLords from "./pages/LandLords/LandLords";
import AddProperty from "./pages/AddProperty/AddProperty";
import ChawseProperties from "./pages/ChawseProperties/ChawseProperties";
import MyProfile from "./pages/MyProfile/MyProfile";
import CustomizedSnackbars from "./components/Snackbar/Snackbar";
import NewRecord from "./pages/NewRecord/NewRecord";
import AllCategories from "./pages/AllCategories/AllCategories";

function App() {
  return (
    <Router>
      <CssBaseline />
      <CustomizedSnackbars />
      <div className="App">
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Header exact>
            <Route exact path="/newrecord" component={NewRecord} />
            <Route
              exact
              path="/chawseproperties"
              component={ChawseProperties}
            />
            <Route exact path="/allcategories" component={AllCategories} />
            <Route exact path="/myprofile" component={MyProfile} />
            <Route exact path="/addproperty" component={AddProperty} />
            <Route exact path="/landlords" component={LandLords} />{" "}
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
