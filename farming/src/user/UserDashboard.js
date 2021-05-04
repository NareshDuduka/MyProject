import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

const Dashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

	return (
        <Layout
            title="Customer Dashboard" description="easy Farming" 
			className="col-md-6 offset-md-3"
        >
			<div className="card mb-5">
				<h3 className="card-header">User Information</h3>
				<ul className="list-group">
					<li className="list-group-item"> {name} </li>
					<li className="list-group-item"> {email} </li>
					<li className="list-group-item"> {role === 1 ? "Farmer" : "Customer"} </li>
				</ul>
			</div>
			<div className="card">
				<h3 className="card-header">Purchase history</h3>
				<ul className="list-group">
					<li className="list-group-item"> item1 </li>
				</ul>
			</div>

        </Layout>
	)
};


export default Dashboard;