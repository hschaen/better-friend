import React from "react";
import {Link} from "react-router-dom";
function NoMatch() {
    return (
        <div>
            <h1>404 Error</h1>
            <p>This page is not the page you are looking for.</p>
            <Link to="/">View Dashboard</Link>
        </div>
    );
}
export default NoMatch;