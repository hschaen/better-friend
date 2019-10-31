import React from 'react';
import {Link} from 'react-router-dom';
function Nav(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand">Better Friend</a>
            <button className="navbar-toggler" data-target="#my-nav" data-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="my-nav" className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className={props.currentPage === "Dashboard" ? "nav-link active" : "nav-link"} href="/" id="dashboardLink" onClick={() => props.handlePageChange("Dashboard")}>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" id="addFriendsLink">Add Friend</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" tabindex="-1" id="viewFriendsLink">View Friends</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" tabindex="-1" id="searchFriendsLink">Search Friends</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" id="viewProfileLink">View Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" tabindex="-1" id="signOut">Sign Out</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;