import React from "react";
import Navbar from "../Navbar"
class Header extends React.Component {
    state = {
        currentPage: "Dashboard"
    }
    handlePageChange = page => {
        this.setState({ currentPage: page});
    }
    render() {
        return (
            <Navbar
                currentPage={this.state.currentPage}
                handlePageChange={this.handlePageChange}
            />
        )
    }
}
export default Header;