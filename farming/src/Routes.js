import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import FarmerRoute from "./auth/FarmerRoute";
import Dashboard from "./user/UserDashboard";
import FarmerDashboard from "./user/FarmerDashboard";
import AddVegetable from "./farmer/AddVegetable";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <FarmerRoute path="/farmer/dashboard" exact component={FarmerDashboard} />
                <FarmerRoute path="/add/vegetables" exact component={AddVegetable} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
