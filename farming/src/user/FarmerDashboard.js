import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const FarmerDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

	const FarmerLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Farmer Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/add/vegetables">
                            Add Vegetables
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/remove/vegetables">
                            Remove Vegetables
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

	const farmerInfo = () => {
        return (
            <div className="card mb-5">
				<h3 className="card-header">User Information</h3>
				<ul className="list-group">
					<li className="list-group-item"> {name} </li>
					<li className="list-group-item"> {email} </li>
					<li className="list-group-item"> {role === 1 ? "Farmer" : "Customer"} </li>
				</ul>
			</div>
        );
    };

	return (
        <Layout
            title={`Welcome ${name} !`} description="easy Farming" 
			className="container-fluid"
        >
			
			<div className="row">
                <div className="col-md-2 offset-md-0">{FarmerLinks()}</div>
                <div className="col-md-6 offset-md-1">
                    {farmerInfo()}
                </div>
            </div>

        </Layout>
	)
};


export default FarmerDashboard;
