import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "black" };
    }
};

const Menu = ({ history }) => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>freshMart</Link>
            <div >
              <ul className="navbar-nav ml-auto">
				<li className="nav-item">
                  <Link className="nav-link" style={isActive(history, "/")} to={"/"}>Home</Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role===0 && (
                     <li className="nav-item">
                     <Link className="nav-link" style={isActive(history, "/user/dashboard")} to={"/user/dashboard"}>Dashboard</Link>
                   </li>
                )}
               
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/signin")} to={"/signin"}>Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/signup")} to={"/signup"}>Sign up</Link>
                        </li>
                    </Fragment>
                )}
                
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() =>
                                signout(() => {
                                    history.push("/");
                                })
                            }
                        >
                        Signout
                        </span>
                    </li>
                )}
                
              </ul>
            </div>
          </div>
        </nav>
    </div>
);

export default withRouter(Menu);
