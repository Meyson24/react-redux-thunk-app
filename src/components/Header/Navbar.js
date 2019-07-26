import React from 'react';
import { Navbar, NavItem, NavDropdown, Brand, Nav } from 'react-bootstrap';
import {Redirect, withRouter} from "react-router-dom";
import AllPost from "../Posts/AllPost";

class NavbarHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    logout = () => {
        console.log('logout')
        localStorage.removeItem('token');
        // this.props.history.push("/login");

    }

    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/">HOME</Navbar.Brand>
                    <Navbar aria-controls="basic-navbar-nav" />
                    <Navbar id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/post">Create post</Nav.Link>
                            <Nav onClick={this.logout} >Logout</Nav>
                        </Nav>
                    </Navbar>
                </Navbar>
            </>
        );
    }
}

export default NavbarHeader;